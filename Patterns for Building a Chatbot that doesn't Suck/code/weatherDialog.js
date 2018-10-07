const { ActivityTypes, CardFactory } = require('botbuilder');
const { Dialog } = require('botbuilder-dialogs');
const richWeatherCardSample = require('./richWeatherCardSample.js');
const { StatePersistence } = require('./StatePersistence');

class WeatherDialog extends Dialog {
    constructor(dialogId, conversationState, messageService, weatherService, tracer) {
        super(dialogId);
        this._conversationState = conversationState;
        this._messageService = messageService;
        this._weatherService = weatherService;
        this._tracer = tracer;

        this._ambientContextProperty =
            conversationState.properties.get(StatePersistence.AMBIENT_CONVERSATION_CONTEXT_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.AMBIENT_CONVERSATION_CONTEXT_PROPERTY_NAME);

        this._synonymSubstitutionsProperty =
            conversationState.properties.get(StatePersistence.SYNONYM_SUBSTITUTIONS_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.SYNONYM_SUBSTITUTIONS_PROPERTY_NAME);

    };

    async beginDialog(dc, args) {
        if (dc.context.activity.type !== ActivityTypes.Message) {
            return Dialog.EndOfTurn;
        };

        let turnContext = dc.context;

        let forecastLocation = await this._getForecastLocation(turnContext, args);
        await this._tracer.trace(turnContext, "Forecast Location Determined: " + JSON.stringify(forecastLocation));

        let forecastDateRange = await this._getForecastDateRange(turnContext, args);
        await this._tracer.trace(turnContext, "Forecast DateRange Determined: " + JSON.stringify(forecastDateRange));

        if (!forecastLocation) {
            await this._tracer.trace(turnContext, "No builtin.geography entity detected from LUIS.")
            await turnContext.sendActivity(await this._messageService.getMessage("cantDetermineLocation"));
            await turnContext.sendActivity(await this._messageService.getMessage("hints"));
            return await dc.endDialog();

        } else {
            await this._tracer.trace(turnContext, "LUIS builtin.geography entity found: " + JSON.stringify(forecastLocation));
            let locationWeather = this._weatherService.getWeather(forecastLocation);

            if (!locationWeather) {
                await this._tracer.trace(turnContext, "No weather data entry found for location: " + forecastLocation);
                await turnContext.sendActivity(await this._messageService.getMessage("noWeatherForLocation"));
                dc.endDialog();
            }
            else {
                await this._tracer.trace(turnContext, "Weather data retrieved for location '" + forecastLocation + "': " + JSON.stringify(locationWeather));

                let matchingForecasts = locationWeather.weather.filter(forecast => forecastDateRange.startDate <= forecast.date && forecast.date <= forecastDateRange.endDate);

                if (!matchingForecasts || !matchingForecasts.length > 0) {
                    await this._tracer.trace(turnContext, "No weather entry for dates " + forecastDateRange.startDate.toISOString() + "-" + forecastDateRange.endDate.toISOString());
                    await turnContext.sendActivity(await this._messageService.getMessage("noWeatherForDate"));
                    dc.endDialog();
                }
                else {

                    if (matchingForecasts.length == 1) {
                        let weather = matchingForecasts[0];

                        await this._tracer.trace(turnContext, "Weather entry found for dates " + forecastDateRange.startDate.toISOString() + "-" + forecastDateRange.endDate.toISOString() + ": " + JSON.stringify(weather));
                        let hasPrecip = weather.precipChance > 0;

                        await this._tracer.trace(turnContext, "Weather has precipitation chance: " + hasPrecip);
                        let messageTemplate = await this._getWeatherReportMessageTemplate(hasPrecip);

                        await this._tracer.trace(turnContext, "Preparing forecast response using template: " + messageTemplate);
                        let messageWithData = this._populateWeatherReportMessageTemplate(messageTemplate, locationWeather.location, weather, hasPrecip);

                        await this._tracer.trace(turnContext, "Reverting Synonyms for output: '" + messageWithData + "'");
                        let message = this._revertSynonymReplacement(messageWithData, await this._synonymSubstitutionsProperty.get(turnContext));

                        await this._tracer.trace(turnContext, "Sending response message: " + message);
                        await turnContext.sendActivity(message);
                        dc.endDialog();

                    } else {

                        for (let i = 0; i < matchingForecasts.length; i++) {
                            //TODO: build rich card from each matching forecast
                        };

                        await turnContext.sendActivity({
                            text: 'Here is your forecast!',
                            attachments: [CardFactory.adaptiveCard(richWeatherCardSample)]
                        });

                        return await dc.endDialog();
                    }
                }
            }
        }
    };

    async continueDialog(dc) {
        // Skip non-message activities.
        if (dc.context.activity.type !== ActivityTypes.Message) {
            return Dialog.EndOfTurn;
        }
    };

    async resumeDialog(dc, reason, result) {
        return Dialog.EndOfTurn;
    };

    async _getWeatherReportMessageTemplate(hasPrecip) {
        if (!hasPrecip) {
            return await this._messageService.getMessage("weatherReportWithoutPrecipType");
        }
        else {
            return await this._messageService.getMessage("weatherReportWithPrecipType");
        }
    };

    async _getAmbientDateRange(turnContext) {

        let ambientContext = await this._ambientContextProperty.get(turnContext);

        if (ambientContext && ambientContext.startDate && ambientContext.endDate) {
            return {
                startDate: new Date(ambientContext.startDate),
                endDate: new Date(ambientContext.endDate)
            };
        }
        else {
            return undefined;
        }
    };

    _revertSynonymReplacement(input, synonymSubstitutions) {
        return input; //for now, just return INPUT directly

        //TODO: review this approach since it will result in echoing back EXACTLY what the user entered instead of the 'prettified' synonym value
        return synonymResolver.revert(input, synonymSubstitutions);
    };

    _buildPrettyDateString(date) {
        return (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
    };

    _buildPrettyPrecipChanceString(percentAsDecimal) {
        return (percentAsDecimal * 100) + "%";
    };

    _buildPrettyDayOfWeekString(date) {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[date.getUTCDay()];
    };

    _populateWeatherReportMessageTemplate(template, forecastLocation, weather, hasPrecip) {
        var message = template.replace("${dayOfWeek}", this._buildPrettyDayOfWeekString(weather.date))
            .replace("${date}", this._buildPrettyDateString(weather.date))
            .replace("${location}", forecastLocation)
            .replace("${high}", weather.high)
            .replace("${low}", weather.low)
            .replace("${precipChance}", this._buildPrettyPrecipChanceString(weather.precipChance))
            .replace("${sky}", weather.sky)
            .replace("${windDirection}", weather.windDirection)
            .replace("${windSpeed}", weather.windSpeed);

        if (hasPrecip) {
            message = message.replace("${precipType}", weather.precipType);
        }

        return message;
    }

    _findEntityLocationWithHighestScore(entityResults, entityType) {

        let entityValue;
        let highScore = 0;

        entityResults.forEach(entity => {
            if (entity.type === entityType) {
                if (entity.score > highScore) {
                    highScore = entity.score;
                    entityValue = entity.entity;
                };
            };
        });

        return entityValue;
    };

    _findEntityDate(entityResults, entityType) {

        let entityValue;

        entityResults.forEach(entity => {
            if (entity.type === entityType) {
                entityValue = entity;
            };
        });

        return entityValue;
    };

    async _getForecastLocation(turnContext, args) {

        var parsedLocation = this._findEntityLocationWithHighestScore(args.entities, "builtin.geography.city");
        if (parsedLocation) {
            await this._storeAmbientLocation(turnContext, parsedLocation);
        }

        return await this._getAmbientLocation(turnContext);
    };

    async _storeAmbientLocation(turnContext, location) {

        let ambientContext = await this._ambientContextProperty.get(turnContext);

        if (!ambientContext) {
            ambientContext = { location: location };
        } else {
            ambientContext.location = location;
        }

        await this._ambientContextProperty.set(turnContext, ambientContext);
        await this._conversationState.saveChanges(turnContext);
    }


    async _getAmbientLocation(turnContext) {
        let ambientContext = await this._ambientContextProperty.get(turnContext);

        if (ambientContext) {
            return ambientContext.location;
        } else {
            return undefined;
        }
    };

    async _getForecastDateRange(turnContext, args) {

        let dateRange = this._findEntityDate(args.entities, "builtin.datetimeV2.daterange");
        let datetimeRange = this._findEntityDate(args.entities, "builtin.datetimeV2.datetimerange");
        let date = this._findEntityDate(args.entities, "builtin.datetimeV2.date");

        //get either of the non-null range types (must be either 0 or 1 of them)
        let range = dateRange || datetimeRange;

        if (range) {
            var start = new Date(range.resolution.values[0].start);
            start.setUTCHours(0);
            start.setUTCMinutes(0);
            start.setUTCSeconds(0);
            start.setUTCMilliseconds(0);

            var end = new Date(range.resolution.values[0].end);
            end.setUTCHours(0);
            end.setUTCMinutes(0);
            end.setUTCSeconds(0);
            end.setUTCMilliseconds(0);

            var result = {
                startDate: new Date(start),
                endDate: new Date(end)
            };

            await this._storeAmbientDateRange(turnContext, result);
        };

        if (date) {
            var extractedDate = this._extractDateInFutureFrom(date);

            if (extractedDate) {
                extractedDate.setUTCHours(0);
                extractedDate.setUTCMinutes(0);
                extractedDate.setUTCSeconds(0);
                extractedDate.setUTCMilliseconds(0);

                var result = {
                    startDate: extractedDate,
                    endDate: extractedDate
                };

                this._storeAmbientDateRange(turnContext, result);
            }
        };

        var result = await this._getAmbientDateRange(turnContext);

        if (!result) {

            var today = new Date();
            today.setUTCHours(0);
            today.setUTCMinutes(0);
            today.setUTCSeconds(0);
            today.setUTCMilliseconds(0);

            var result = {
                startDate: today,
                endDate: today
            };

            await this._storeAmbientDateRange(turnContext, result);
        };

        return await this._getAmbientDateRange(turnContext);
    };

    //LUIS will return nearest both *past* and *future* date(s) for resolving e.g., "Monday",
    //  so have to ensure we pick the one that's in the future
    _extractDateInFutureFrom(date) {

        var today = new Date();
        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        today.setUTCMilliseconds(0);

        for (var i = 0; i < date.resolution.values.length; i++) {

            var candidate = new Date(date.resolution.values[i].value);

            if (candidate >= today) {
                return candidate;
            }
        }
    };

    async _storeAmbientDateRange(turnContext, dateRange) {

        let ambientContext = await this._ambientContextProperty.get(turnContext);

        let start = dateRange.startDate.toISOString();
        let end = dateRange.endDate.toISOString();

        if (!ambientContext) {
            ambientContext = {
                startDate: start,
                endDate: end
            };
        } else {
            ambientContext.startDate = start;
            ambientContext.endDate = end;
        }

        await this._ambientContextProperty.set(turnContext, ambientContext);
        await this._conversationState.saveChanges(turnContext);
    };

};

module.exports.WeatherDialog = WeatherDialog;




































