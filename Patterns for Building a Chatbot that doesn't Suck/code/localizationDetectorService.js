const request = require('request');
const requestPromise = require('request-promise-native');
const config = require('./configuration.js');

const urlTemplate = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/languages';


class LocalizationDetector {

    _readLanguage(results) {

        var language = "unknown";

        var result = results.documents.find(d => d.id === "1");

        if (result) {
            var languageEntry = result.detectedLanguages.sort((a, b) => { b.score - a.score })[0];
        }

        if (languageEntry) {
            language = languageEntry.iso6391Name;
        };

        return language;
    };

    async detect(input) {

        var postData = {
            "documents": [
                {
                    "id": "1",
                    "text": input
                },
            ]
        };

        var options = {
            url: urlTemplate,
            headers: {
                "Ocp-Apim-Subscription-Key": config.textAnalyticsServiceApiKey,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "post",
            body: JSON.stringify(postData)
        };

        let response = await requestPromise(options);
        var results = JSON.parse(response);
        let language = this._readLanguage(results);
        return language;
    };
}

module.exports.LocalizationDetector = LocalizationDetector;