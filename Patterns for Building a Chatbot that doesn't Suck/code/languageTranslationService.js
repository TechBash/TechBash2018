const request = require('request');
const requestPromise = require('request-promise-native');
const config = require('./configuration.js');
const xpath = require('xpath');
const xmlDom = require('xmldom').DOMParser


const urlTemplate = 'https://api.microsofttranslator.com/V2/Http.svc/Translate?text={text}&to={toLanguage}';

class LanguageTranslator {

    _extractResult(xmlString) {
        var doc = new xmlDom().parseFromString(xmlString);
        return doc.childNodes[0].firstChild.data;
    };

    async translate(message, language) {

        var url = urlTemplate.replace('{text}', message).replace('{toLanguage}', language);

        var options = {
            url: url,
            headers: {
                'Ocp-Apim-Subscription-Key': config.textTranslationServiceApiKey,
            },
        };

        let response = await requestPromise(options);
        let result = this._extractResult(response);
        return result;
    };
};

module.exports.LanguageTranslator = LanguageTranslator;