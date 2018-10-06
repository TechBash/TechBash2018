const request = require('request');
const requestPromise = require('request-promise-native');
const config = require('./configuration.js');


const urlTemplate = 'https://api.cognitive.microsoft.com/bing/v5.0/spellcheck?text={text}';

class SpellCheckService {

    _applyResults(input, results) {
        for (let i = 0; i < results.flaggedTokens.length; i++) {
            let flaggedToken = results.flaggedTokens[i];
            let sortedSuggestions = flaggedToken.suggestions.sort((a, b) => { b.score - a.score });
            if (sortedSuggestions[0].score > .80) {
                input = input.replace(flaggedToken.token, sortedSuggestions[0].suggestion);
            };
        }

        return input;
    };

    async check(input) {

        let options = {
            url: urlTemplate,
            headers: {
                "Ocp-Apim-Subscription-Key": config.spellcheckServiceApiKey
            }
        };

        options.url = urlTemplate.replace("{text}", input);

        let response = await requestPromise(options);

        let results = JSON.parse(response);
        input = this._applyResults(input, results);
        return input;
    };
};

module.exports.SpellCheckService = SpellCheckService;