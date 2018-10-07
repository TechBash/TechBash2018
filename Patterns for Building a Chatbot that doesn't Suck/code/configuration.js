let config = {
    spellcheckServiceApiKey: process.env.WEATHERBOT_SPELLCHECK_KEY,
    textAnalyticsServiceApiKey: process.env.WEATHERBOT_TEXTANALYTICS_KEY,
    textTranslationServiceApiKey: process.env.WEATHERBOT_TEXTTRANSLATION_KEY,
};

let optionalConfigValues = [
    //TODO: enumerate any options config property names here; they will be excluded from the call to validateConfig)
];

function validateConfig(config) {

    let errors = [];

    for (let propertyName in config) {
        if (!config[propertyName] && optionalConfigValues.indexOf(propertyName) < 0) {
            errors.push(new Error("You must set a value for " + propertyName + " in configuration.js"));
        }
    }

    if (errors.length > 0) {
        let error = new Error("One more required configuration values has not been set.  See .errors property of this Error object for details.");
        error.errors = errors;
        throw error;
    }
};


validateConfig(config);

module.exports = config;