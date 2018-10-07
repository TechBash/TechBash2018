const request = require('request');
const requestPromise = require('request-promise-native');
const config = require('./configuration.js');

const urlTemplate = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';

class SentimentScoringService {

    _readScore(results) {

        //score is a value betw 0 (neg) and 1 (pos) so 0.5 = neutral as a default
        let score = 0.5;

        let result = results.documents.find(d => d.id === "1");

        if (result) {
            score = result.score;
        }

        return score;
    };


    async getScore(input, language) {

        let postData = {
            "documents": [
                {
                    "id": "1",
                    "language": language,
                    "text": input
                },
            ]
        };

        let options = {
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

        let results = JSON.parse(response);
        let score = this._readScore(results);
        return score;
    };
};

module.exports.SentimentScoringService = SentimentScoringService;