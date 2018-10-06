const { ActivityTypes } = require('botbuilder');
const { Dialog } = require('botbuilder-dialogs');

class NegativeSentimentResponseDialog extends Dialog {
    constructor(dialogId, messageService) {
        super(dialogId);
        this._messageService = messageService;
    };

    async beginDialog(dc, options) {
        if (dc.context.activity.type !== ActivityTypes.Message) {
            return Dialog.EndOfTurn;
        };

        await dc.context.sendActivity(await this._messageService.getMessage('negativeExperienceApology'));
        await dc.context.sendActivity(await this._messageService.getMessage('hints'));
        await dc.context.sendActivity(await this._messageService.getMessage('escapeHatch'));
    };

    async continueDialog(dc) {
        // Skip non-message activities.
        if (dc.context.activity.type !== ActivityTypes.Message) {
            return Dialog.EndOfTurn;
        }
    };

    async resumeDialog(dc, reason, result) {
        return Dialog.EndOfTurn;
    };
};

module.exports.NegativeSentimentResponseDialog = NegativeSentimentResponseDialog;