const { ActivityTypes } = require('botbuilder');
const {StatePersistence} = require('./StatePersistence');


class InteractionCounterResponseMiddleware {

    constructor(userState, messageService, tracer) {
        this._userState = userState;
        this._messageService = messageService;
        this._tracer = tracer;

        this._interactionCountProperty =
            userState.properties.get(StatePersistence.INTERACTION_COUNT_PROPERTY_NAME) ||
            userState.createProperty(StatePersistence.INTERACTION_COUNT_PROPERTY_NAME);
    }


    async onTurn(turnContext, next) {

        //if not a message, no point in proceeding to process input
        if (turnContext.activity.type != ActivityTypes.Message) {
            await next();
            return;
        };

        if (await this._interactionCountProperty.get(turnContext) % 5 == 0) {
            await this._tracer.trace(turnContext, "Valued User detected.");
            await turnContext.sendActivity(await this._messageService.getMessage("valuedUser"));
        }

        await next();
    };
};

module.exports.InteractionCounterResponseMiddleware = InteractionCounterResponseMiddleware;