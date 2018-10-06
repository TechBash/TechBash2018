const { ActivityTypes } = require('botbuilder');
const { LuisRecognizer } = require('botbuilder-ai');
const { DialogSet } = require('botbuilder-dialogs');
const { NegativeSentimentResponseDialog } = require('./negativeSentimentResponseDialog');
const { WeatherDialog } = require('./weatherDialog');
const { StatePersistence } = require('./StatePersistence');
const WEATHER_DIALOG_NAME = 'weatherDialog';
const NEGATIVE_SENTIMENT_DIALOG_NAME = 'negativeSentimentDialog';

class WeatherBot {
    /**
     * The LuisBot constructor requires one argument (`application`) which is used to create an instance of `LuisRecognizer`.
     * @param {LuisApplication} luisApplication The basic configuration needed to call LUIS. In this sample the configuration is retrieved from the .bot file.
     * @param {LuisPredictionOptions} luisPredictionOptions (Optional) Contains additional settings for configuring calls to LUIS.
     * @param {ConversationState} conversationState bot state provider implementation
     */
    constructor(application, luisPredictionOptions, conversationState, messageService, weatherService, tracer) {
        this._luisRecognizer = new LuisRecognizer(application, luisPredictionOptions, true);
        this._conversationState = conversationState;
        this._messageService = messageService;
        this._weatherService = weatherService;
        this._tracer = tracer;

        this._dialogStateProperty =
            conversationState.properties.get(StatePersistence.DIALOG_STATE_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.DIALOG_STATE_PROPERTY_NAME);

        this._negativeSentimentDetectedProperty =
            conversationState.properties.get(StatePersistence.NEGATIVE_SENTIMENT_DETECTED_FLAG_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.NEGATIVE_SENTIMENT_DETECTED_FLAG_PROPERTY_NAME);

        this._dialogSet = new DialogSet(this._dialogStateProperty);
        this._dialogSet.add(new NegativeSentimentResponseDialog(NEGATIVE_SENTIMENT_DIALOG_NAME, messageService));
        this._dialogSet.add(new WeatherDialog(WEATHER_DIALOG_NAME, conversationState, messageService, weatherService, tracer));
    };
    
    async onTurn(turnContext) {
        // By checking the incoming Activity type, the bot only calls LUIS in appropriate cases.
        if (turnContext.activity.type === ActivityTypes.Message) {

            const dialogContext = await this._dialogSet.createContext(turnContext);

            let negativeSentimentDetected = await this._negativeSentimentDetectedProperty.get(turnContext);

            if (negativeSentimentDetected) {
                await this._negativeSentimentDetectedProperty.set(turnContext, false);
                await this._conversationState.saveChanges(turnContext);
                await dialogContext.beginDialog(NEGATIVE_SENTIMENT_DIALOG_NAME);
            };

            const results = await this._luisRecognizer.recognize(turnContext);
            const topIntent = results.luisResult.topScoringIntent;

            await this._tracer.trace(turnContext, `LUIS Top Scoring Intent: ${topIntent.intent}, Score: ${topIntent.score}`);


            if (topIntent.intent === 'getForecast' && topIntent.score >= 0.40) {
                await dialogContext.beginDialog(WEATHER_DIALOG_NAME, results.luisResult);

            } else { // if NONE or no matching intent (default fall-through case)...
                await turnContext.sendActivity(await this._messageService.getMessage('hints'));

            };

        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate &&
            turnContext.activity.recipient.id !== turnContext.activity.membersAdded[0].id) {
            // If the Activity is a ConversationUpdate, send a greeting message to the user.
            await turnContext.sendActivity(await this._messageService.getMessage('welcome'));
            await turnContext.sendActivity(await this._messageService.getMessage('hints'));
        } else if (turnContext.activity.type !== ActivityTypes.ConversationUpdate) {
            // Respond to all other Activity types.
            await turnContext.sendActivity(`[${turnContext.activity.type}]-type activity detected.`);
        };
    };
};

module.exports.WeatherBot = WeatherBot;