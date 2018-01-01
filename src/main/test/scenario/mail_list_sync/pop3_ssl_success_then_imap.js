const assert = require('assert');

module.exports = {
    name: "pop3_ssl同步邮件列表,再用imap同步，应该返回新邮件数为0",
    prerequisites: [
        require('../mailbox_add/pop3_smtp_success')
    ],
    steps: [
        {
            name: "mail_list_sync",
            timeout: 2000000,
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
                    receiveProtocol: 2,
                    receiveUseSSL: 1,
                    receiveServerAddress: "imap.126.com",
                    receiveServerPort: 993,
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined, "update error");
            }
        },
        {
            name: "mail_list_sync",
            timeout: 2000000,
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