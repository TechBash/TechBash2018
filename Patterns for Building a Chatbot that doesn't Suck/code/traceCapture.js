const { TurnContext } = require('botbuilder');
const { StatePersistence } = require("./StatePersistence");

class Tracer {

    constructor(conversationState) {
        this.conversationState = conversationState;
        this.enableDebugTraceProperty =
            conversationState.properties.get(StatePersistence.ENABLE_DEBUG_TRACE_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.ENABLE_DEBUG_TRACE_PROPERTY_NAME);
    }

    async trace(turnContext, input) {
        if (await this.enableDebugTraceProperty.get(turnContext) == true) {
            await turnContext.sendActivity("TRACE | " + new Date().toISOString() + " | " + input);
        }
    };
}

module.exports.Tracer = Tracer;