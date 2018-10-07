const path = require('path');
const restify = require('restify');

// Read botFilePath and botFileSecret from .env file.
// Note: Ensure you have a .env file and include botFilePath and botFileSecret.
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

const { BotFrameworkAdapter, ConversationState, UserState, MemoryStorage } = require('botbuilder');
const { BotConfiguration } = require('botframework-config');
const { WeatherBot } = require('./bot');
const { LoggingMiddleware } = require('./loggingMiddleware');
const { SlashCommandInterceptorMiddleware } = require('./slashCommandInterceptorMiddleware');
const { Tracer } = require('./traceCapture');
const { LocalizationDetectorMiddleware } = require('./localizationDetectorMiddleware');
const { LocalizationDetector } = require('./localizationDetectorService');
const { MessageService } = require('./messages');
const { LanguageTranslator } = require('./languageTranslationService');
const { SpellCheckService } = require('./spellCheckService');
const { SpellCheckMiddleware } = require('./spellCheckMiddleware');
const { SentimentScoringService } = require('./sentimentScoringService');
const { SentimentScoringMiddleware } = require('./sentimentScoringMiddleware');
const { InteractionCounterMiddleware } = require('./interactionCounterMiddleware');
const { InteractionCounterResponseMiddleware } = require('./interactionCounterResponseMiddleware');
const { SynonymResolverService } = require('./synonymResolverService');
const { SynonymResolverMiddleware } = require('./synonymResolverMiddleware');
const { WeatherService } = require('./weatherService');

const BOT_FILE = path.join(__dirname, (process.env.botFilePath || ''));
let botConfig;
try {
    botConfig = BotConfiguration.loadSync(BOT_FILE, process.env.botFileSecret);
} catch (err) {
    console.error(`\nError reading bot file. Please ensure you have valid botFilePath and botFileSecret set for your environment.`);
    console.error(`\n - The botFileSecret is available under appsettings for your Azure Bot Service bot.`);
    console.error(`\n - If you are running this bot locally, consider adding a .env file with botFilePath and botFileSecret.\n\n`);
    process.exit();
}

// For local development configuration as defined in .bot file.
const DEV_ENVIRONMENT = 'development';

// Bot name as defined in .bot file or from runtime.
// See https://aka.ms/about-bot-file to learn more about .bot files.
const BOT_CONFIGURATION = (process.env.NODE_ENV || DEV_ENVIRONMENT);

// Language Understanding (LUIS) service name as defined in the .bot file.
const LUIS_CONFIGURATION = '';

// Get endpoint and LUIS configurations by service name.
const endpointConfig = botConfig.findServiceByNameOrId(BOT_CONFIGURATION);
const luisConfig = botConfig.findServiceByNameOrId(LUIS_CONFIGURATION);

// Map the contents to the required format for `LuisRecognizer`.
const luisApplication = {
    applicationId: luisConfig.appId,
    endpointKey: luisConfig.subscriptionKey || luisConfig.authoringKey,
    azureRegion: luisConfig.region
};

// Create configuration for LuisRecognizer's runtime behavior.
const luisPredictionOptions = {
    includeAllIntents: true,
    log: true,
    staging: false
};

// Create adapter. See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new BotFrameworkAdapter({
    appId: endpointConfig.appId || process.env.MicrosoftAppId,
    appPassword: endpointConfig.appPassword || process.env.MicrosoftAppPassword
});

// Catch-all for errors.
adapter.onTurnError = async (turnContext, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await turnContext.sendActivity(`Oops. Something went wrong!`);
};

// For local development, in-memory storage is used.
// CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
// is restarted, anything stored in memory will be gone.
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// create dependency instances
const tracer = new Tracer(conversationState);
const localizationDetector = new LocalizationDetector();
const languageTranslator = new LanguageTranslator();
const messageService = new MessageService(languageTranslator, tracer);
const spellCheckService = new SpellCheckService();
const sentimentScoringService = new SentimentScoringService();
const synonymResolverService = new SynonymResolverService()
const weatherService = new WeatherService();

// register middleware processing pipeline participants
adapter.use(new LoggingMiddleware());
adapter.use(new SlashCommandInterceptorMiddleware(conversationState, messageService, tracer));
adapter.use(new LocalizationDetectorMiddleware(conversationState, localizationDetector, messageService, tracer));
adapter.use(new SpellCheckMiddleware(spellCheckService, tracer));
adapter.use(new SentimentScoringMiddleware(sentimentScoringService, conversationState, userState, tracer));
adapter.use(new SynonymResolverMiddleware(synonymResolverService, conversationState, tracer));
adapter.use(new InteractionCounterMiddleware(userState, conversationState, tracer));
adapter.use(new InteractionCounterResponseMiddleware(userState, messageService, tracer));


// Create the LuisBot.
let bot;
try {
    bot = new WeatherBot(luisApplication, luisPredictionOptions, conversationState, messageService, weatherService, tracer);
} catch (err) {
    console.error(`[botInitializationError]: ${err}`);
    process.exit();
}

// Create HTTP server.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}.`);
    console.log(`Get Bot Framework Emulator: https://aka.ms/botframework-emulator.`);
    console.log(`To talk to your bot, open Weatherbot.bot file in the emulator.`);
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (turnContext) => {
        await bot.onTurn(turnContext);
    });
});