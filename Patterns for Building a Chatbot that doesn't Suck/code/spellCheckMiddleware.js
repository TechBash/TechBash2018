const { ActivityTypes } = require('botbuilder');

class SpellCheckMiddleware {

    constructor(spellCheckService, tracer) {
        this._spellCheckService = spellCheckService;
        this._tracer = tracer;
    };

    async onTurn(turnContext, next) {

        //if not a message, no point in proceeding to process input
        if (turnContext.activity.type != ActivityTypes.Message) {
            await next();
            return;
        };

        await this._tracer.trace(turnContext, "Spellchecking input: '" + turnContext.activity.text + "'");

        let text = await this._spellCheckService.check(turnContext.activity.text);
        turnContext.activity.text = text;
        await this._tracer.trace(turnContext, "Spellchecking output: '" + turnContext.activity.text + "'");
        await next();
    };
};

module.exports.SpellCheckMiddleware = SpellCheckMiddleware;