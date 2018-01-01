const assert = require('assert');

module.exports = {
    name: "imap_ssl同步邮件列表，应该新邮件数应该返回非0",
    prerequisites: [
        require('../mailbox_add/imap_smtp_success')
    ],
    steps: [
        {
            name: "mail_list_sync",
            timeout: 100000,
            prepareRequest: function(dataset) {
                return {
                    box: GB.Common.Constant.Mail.Classify.INBOX,
                    mailboxId: dataset.step(-1).response.mailboxId
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response != 0, "sync failed");
            }
        }
    ]
}