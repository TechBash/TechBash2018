const { ActivityTypes } = require('botbuilder');
const { StatePersistence } = require('./StatePersistence');

class InteractionCounterMiddleware {

    constructor(userState, conversationState, tracer) {
        this._userState = userState;
        this._conversationState = conversationState;
        this._tracer = tracer;

        this._userInteractionCountProperty =
            userState.properties.get(StatePersistence.INTERACTION_COUNT_PROPERTY_NAME) ||
            userState.createProperty(StatePersistence.INTERACTION_COUNT_PROPERTY_NAME);

        this._conversationInteractionCountProperty =
            conversationState.properties.get(StatePersistence.INTERACTION_COUNT_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.INTERACTION_COUNT_PROPERTY_NAME);
    }

    async _isValueSetOn(interactionCountProperty, turnContext) {
        return await interactionCountProperty.get(turnContext);
    };

    async _incrementPropertyValue(interactionCountProperty, turnContext) {
        let initialCount = await interactionCountProperty.get(turnContext);
        let newCount = await this._isValueSetOn(interactionCountProperty, turnContext) ? ++initialCount : 1;
        await interactionCountProperty.set(turnContext, newCount);
        return newCount;
    };

    async onTurn(turnContext, next) {

        //if not a message, no point in proceeding to process input
        if (turnContext.activity.type != ActivityTypes.Message) {
            await next();
            return;
        };

        let userCount = await this._incrementPropertyValue(this._userInteractionCountProperty, turnContext);
        await this._tracer.trace(turnContext, "USER interaction count increased to " + userCount);

        let conversationCount = await this._incrementPropertyValue(this._conversationInteractionCountProperty, turnContext);
        await this._tracer.trace(turnContext, "CONVERSATION interaction count increased to " + conversationCount);

        await this._userState.saveChanges(turnContext);
        await this._conversationState.saveChanges(turnContext);

        await next();
    };
};

module.exports.InteractionCounterMiddleware = InteractionCounterMiddleware;