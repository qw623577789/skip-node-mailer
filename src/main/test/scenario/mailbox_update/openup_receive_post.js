const assert = require('assert');

module.exports = {
    name: "开启一个邮箱收发信功能，应该成功",
    prerequisites: [
        require('../mailbox_list/imap_smtp_success')
    ],
    steps: [
        {
            name: "mailbox_update",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    id: dataset.step(-1).response[0].id,
                    mailbox: {
                        username: dataset.step(-1).response[0].mailbox.username,
                        password: dataset.step(-1).response[0].mailbox.password,
                        receive: {
                            state: 1,
                            protocol: 2,
                            useSSL: 1,
                            serverHost: "imap.sina.com",
                            serverPort: 993,
                        },
                        post: {
                            state: 1,
                            useSSL: 1,
                            serverHost: "smtp.sina.com",
                            serverPort: 465
                        }
                    }
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined, "update error");
            }
        },
        {
            name: "mailbox_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {};
            },
            handleResponse: function({error, response}, dataset) {
                assert(response[0].mailbox.receive.serverHost == "imap.sina.com" && response[0].mailbox.post.serverHost == "smtp.sina.com",  "update failed");
            }
        }
    ]
}