const { ActivityTypes } = require('botbuilder');
const { StatePersistence } = require('./StatePersistence');

class SentimentScoringMiddleware {

    constructor(sentimentScoringService, conversationState, userState, tracer) {
        this._sentimentScoringService = sentimentScoringService;
        this._conversationState = conversationState;
        this._userState = userState;
        this._tracer = tracer;

        this._sentimentHistoryProperty =
            userState.properties.get(StatePersistence.SENTIMENT_HISTORY_PROPERTY_NAME) ||
            userState.createProperty(StatePersistence.SENTIMENT_HISTORY_PROPERTY_NAME);

        this._sentimentDeltasProperty =
            userState.properties.get(StatePersistence.SENTIMENT_DELTAS_PROPERTY_NAME) ||
            userState.createProperty(StatePersistence.SENTIMENT_DELTAS_PROPERTY_NAME);

        this._sentimentProperty =
            userState.properties.get(StatePersistence.SENTIMENT_PROPERTY_NAME) ||
            userState.createProperty(StatePersistence.SENTIMENT_PROPERTY_NAME);

        this._detectedLanguageProperty =
            userState.properties.get(StatePersistence.DETECTED_LANGUAGE_PROPERTY_NAME) ||
            userState.createProperty(StatePersistence.DETECTED_LANGUAGE_PROPERTY_NAME);

        this._negativeSentimentDetectedProperty =
            conversationState.properties.get(StatePersistence.NEGATIVE_SENTIMENT_DETECTED_FLAG_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.NEGATIVE_SENTIMENT_DETECTED_FLAG_PROPERTY_NAME);
    };

    async onTurn(turnContext, next) {

        //if not a message, no point in proceeding to process input
        if (turnContext.activity.type != ActivityTypes.Message) {
            await next();
            return;
        };

        await this._tracer.trace(turnContext, "Calculating sentiment for input: '" + turnContext.activity.text + "'");

        await this._updateConversationSentiment(turnContext);

        if (await this._checkSentimentOK(turnContext)) {
            await this._tracer.trace(turnContext, "Sentiment evaluated as within tolerance.");
            await next();
        }
        else {
            await this._tracer.trace(turnContext, "Sentiment evaluated as beyond tolerance.");
            await this._negativeSentimentDetectedProperty.set(turnContext, true);
            await this._conversationState.saveChanges(turnContext);
            await next();
        };

    };

    async _checkSentimentOK(turnContext) {
        let singleScoreAlertThreshold = 0.2;
        let history = await this._sentimentHistoryProperty.get(turnContext);

        let lastScore = history[history.length - 1];

        if (lastScore < singleScoreAlertThreshold) {
            return false;
        };

        return this._analyzeDeltas(await this._sentimentDeltasProperty.get(turnContext));
    }

    _analyzeDeltas(deltas) {

        //if there aren't at least 2 entries, no point in proceeding w analysis
        if (deltas.length < 2) {
            return true;
        }

        let workbackCounter = deltas.length < 3 ? deltas.length : 3;

        let toAnalyze = [];

        for (let i = 1; i <= workbackCounter; i++) {
            toAnalyze.push(deltas[deltas.length - i]);
        };

        let negativeSentimentInAnalysisSet = toAnalyze.filter(entry => entry < 0);

        return negativeSentimentInAnalysisSet.length != toAnalyze.length;
    }

    async _updateConversationSentiment(turnContext) {

        let score = await this._sentimentScoringService.getScore(turnContext.activity.text, await this._detectedLanguageProperty.get(turnContext));

        await this._tracer.trace(turnContext, "Sentiment Score returned: " + score);

        let sentimentTracking = await this._sentimentProperty.get(turnContext) || {};
        let history = await this._sentimentHistoryProperty.get(turnContext) || [];
        let deltas = await this._sentimentDeltasProperty.get(turnContext) || [];

        history.push(score);
        if (history.length > 1) {
            deltas.push(parseFloat(history[history.length - 1].toFixed(20)) - parseFloat(history[history.length - 2].toFixed(20)));
        }

        await this._sentimentHistoryProperty.set(turnContext, history);
        await this._sentimentDeltasProperty.set(turnContext, deltas);
        await this._sentimentProperty.set(turnContext, sentimentTracking);

        await this._userState.saveChanges(turnContext);

    };
};

module.exports.SentimentScoringMiddleware = SentimentScoringMiddleware;