const { ActivityTypes } = require('botbuilder');
const { StatePersistence } = require('./StatePersistence');

class SlashCommandInterceptorMiddleware {


    constructor(conversationState, messageService, tracer) {
        this._conversationState = conversationState;
        this._messageService = messageService;
        this._tracer = tracer;
        this._enableDebugTraceProperty =
            conversationState.properties.get(StatePersistence.ENABLE_DEBUG_TRACE_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.ENABLE_DEBUG_TRACE_PROPERTY_NAME);
    }

    async onTurn(turnContext, next) {

        //if not a message, no point in proceeding to process input
        if (turnContext.activity.type != ActivityTypes.Message) {
            await next();
            return;
        };

        await this._tracer.trace(turnContext, "Checking for slash-command prefix in: '" + turnContext.activity.text + "'");

        let isSlashCommand = turnContext.activity.text.startsWith("/");

        if (!isSlashCommand) {
            await this._tracer.trace(turnContext, "slash-command prefix not found in: '" + turnContext.activity.text + "'");

            //if not a slash-command input, call next NOW to move processing to next step in pipeline
            await next();
        }
        else {
            //extract the command minus the leading "/" converted to lowercase
            let command = turnContext.activity.text.substr(1).toLowerCase();

            await this._tracer.trace(turnContext, "Command " + command + " found.");

            if (command == "enabletrace") {
                await turnContext.sendActivity("DEBUG tracing output ENABLED.");
                await this._enableDebugTraceProperty.set(turnContext, true);
                await this._conversationState.saveChanges(turnContext);
                return;
            };

            if (command == "disabletrace") {
                await turnContext.sendActivity("DEBUG tracing output DISABLED.");
                await this._enableDebugTraceProperty.set(turnContext, false);
                await this._conversationState.saveChanges(turnContext);
                return;
            };

            await turnContext.sendActivity(await this._messageService.getMessage("commandNotRecognized"));
        };
    };
}

module.exports.SlashCommandInterceptorMiddleware = SlashCommandInterceptorMiddleware;