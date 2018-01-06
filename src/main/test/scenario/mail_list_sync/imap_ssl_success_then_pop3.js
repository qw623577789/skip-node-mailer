const assert = require('assert');

module.exports = {
    name: "imap_ssl同步邮件列表,再用pop3同步，应该返回新邮件数为0",
    prerequisites: [
        require('../mailbox_add/126_imap_smtp_success')
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
                    mailbox: {
                        username: dataset.step(-2).request.username,
                        password: dataset.step(-2).request.password,
                        receive: {
                            state: 1,
                            protocol: 1,
                            useSSL: 1,
                            serverHost: "pop.126.com",
                            serverPort: 995,
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