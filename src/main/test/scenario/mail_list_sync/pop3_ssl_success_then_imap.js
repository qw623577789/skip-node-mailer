const assert = require('assert');

module.exports = {
    name: "pop3_ssl同步邮件列表,再用imap同步，应该返回新邮件数为0",
    prerequisites: [
        require('../mailbox_add/126_pop3_smtp_success')
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
                    mailbox: {
                        username: dataset.step(-2).request.username,
                        password: dataset.step(-2).request.password,
                        receive: {
                            state: 1,
                            protocol: 2,
                            useSSL: 1,
                            serverHost: "imap.126.com",
                            serverPort: 993,
                        },
                        post: dataset.step(-2).request.post,
                    }
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