const synonyms = require('./synonyms.js');

String.prototype.replaceAllIgnoreCase = function (strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    let esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};


class SynonymResolverService {

    resolve(input) {

        var results = {
            substitutions: []
        };

        var matches = this._findAllMatchingSynonyms(input);

        for (let i = 0; i < matches.length; i++) {
            results.substitutions.push({
                originalValue: matches[i].matchedOnInput,
                replacementValue: matches[i].synonym.value
            });
        }

        results.resolvedText = this._applySubstitutions(input, results.substitutions);
        return results;
    };

    revert (input, substitutions) {

        for (let i = 0; i < substitutions.length; i++) {
            input = input.replace(substitutions[i].replacementValue, substitutions[i].originalValue);
        }
    
        return input;
    };

    _applySubstitutions(input, substitutions) {

        for (let i = 0; i < substitutions.length; i++) {
            input = input.replaceAllIgnoreCase(substitutions[i].originalValue, substitutions[i].replacementValue);
        }
    
        return input;
    };

    _findAllMatchingSynonyms(input) {
        var matches = [];
    
        for (let i = 0; i < synonyms.length; i++) {
            var candidate = synonyms[i];
    
            for (let j = 0; j < candidate.matches.length; j++) {
                if (input.toLowerCase().indexOf(candidate.matches[j].toLowerCase()) != -1) {
                    matches.push({ synonym: candidate, matchedOnInput: candidate.matches[j] });
                }
            }
        }
    
        return matches;
    };
};

module.exports.SynonymResolverService = SynonymResolverService;