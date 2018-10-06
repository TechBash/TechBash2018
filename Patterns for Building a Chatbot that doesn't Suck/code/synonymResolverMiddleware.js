const { ActivityTypes } = require('botbuilder');
const { StatePersistence } = require('./StatePersistence');

class SynonymResolverMiddleware {
    constructor(synonymResolverService, conversationState, tracer) {
        this._synonymResolverService = synonymResolverService;
        this._conversationState = conversationState;
        this._tracer = tracer;

        this._synonymSubstitutionsProperty =
            conversationState.properties.get(StatePersistence.SYNONYM_SUBSTITUTIONS_PROPERTY_NAME) ||
            conversationState.createProperty(StatePersistence.SYNONYM_SUBSTITUTIONS_PROPERTY_NAME);
    }

    async onTurn(turnContext, next) {

        //if not a message, no point in proceeding to process input
        if (turnContext.activity.type != ActivityTypes.Message) {
            await next();
            return;
        };

        await this._tracer.trace(turnContext, "Resolving Synonyms in: '" + turnContext.activity.text + "'");

        let results = this._synonymResolverService.resolve(turnContext.activity.text);
        await this._synonymSubstitutionsProperty.set(turnContext, results.substitutions);

        await this._tracer.trace(turnContext, "Synonyms Resolved: " + JSON.stringify(results));

        turnContext.activity.text = results.resolvedText;

        await this._conversationState.saveChanges(turnContext);
        await next();
    };
};

module.exports.SynonymResolverMiddleware = SynonymResolverMiddleware;