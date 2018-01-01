const assert = require('assert');

module.exports = {
    name: "imap_ssl同步邮件列表,再用pop3同步，应该返回新邮件数为0",
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
                assert(error == undefined && response != 0, "test failed");
            }
        },
        {
            name: "mailbox_update",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    id: dataset.step(-2).response.mailboxId,
                    receiveState: 1,
                    receiveProtocol: 1,
                    receiveUseSSL: 1,
                    receiveServerAddress: "pop.126.com",
                    receiveServerPort: 995,
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined, "update error");
            }
        },
        {
            name: "mail_list_sync",
            timeout: 100000,
            prepareRequest: function(dataset) {
                return {
                    box: GB.Common.Constant.Mail.Classify.INBOX,
                    mailboxId: dataset.step(-3).response.mailboxId
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response == 0, "test failed");
            }
        }
    ]
}