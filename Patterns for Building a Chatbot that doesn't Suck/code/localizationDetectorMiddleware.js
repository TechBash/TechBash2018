const { ActivityTypes } = require('botbuilder');
const { StatePersistence } = require('./StatePersistence');

class LocalizationDetectorMiddleware {

    constructor(conversationState, detectorService, messageService, tracer) {
        this._conversationState = conversationState;
        this._detectorService = detectorService;
        this._messageService = messageService;
        this._tracer = tracer;
        this._detectedLanguageProperty =
            conversationState.properties.get(StatePersistence.DETECTED_LANGUAGE_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.DETECTED_LANGUAGE_PROPERTY_NAME);
    }

    async onTurn(turnContext, next) {

        //if not a message, no point in proceeding to process input
        if (turnContext.activity.type != ActivityTypes.Message) {
            await next();
            return;
        };

        await this._tracer.trace(turnContext, "Detecting language in: '" + turnContext.activity.text + "'");

        let language = await this._detectorService.detect(turnContext.activity.text);

        //only supported language
        if (language === "en") {
            await this._tracer.trace(turnContext, "ENGLISH language detected.");

            //persist in case needed elsewhere
            await this._detectedLanguageProperty.set(turnContext, language);
            await this._conversationState.saveChanges(turnContext);
            await next();
        }
        else {
            if (language == "(Unknown)") {
                await this._tracer.trace(turnContext, "UNKNOWN language detected.");

                await turnContext.sendActivity(this._messageService.getMessage("unsupportedLanguage"));
            } else {
                await this._tracer.trace(turnContext, "'" + language + "'" + " language detected.");

                let translatedMessage = await this._messageService.getMessage("unsupportedLanguage", language);
                await turnContext.sendActivity(translatedMessage);
            }

            //await next(); <-- important: we are NOT calling next b/c the objective is to ABORT further processing
        };
    };
}

module.exports.LocalizationDetectorMiddleware = LocalizationDetectorMiddleware;