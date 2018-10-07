const { Logger } = require('./loggingService.js');
const { ActivityTypes } = require('botbuilder');
const logger = new Logger();

class LoggingMiddleware {
    async onTurn(turnContext, next) {
        if (turnContext.activity.type === ActivityTypes.Message) {
            await logger.log(turnContext.activity.text);
        };
        await next();
    }
}

module.exports.LoggingMiddleware = LoggingMiddleware;