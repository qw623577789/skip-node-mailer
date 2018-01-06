const assert = require('assert');

module.exports = {
    name: "更新不存在邮箱，应该抛错",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_update",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    id: "11952a1a92364931a010fd135075a892",
                    mailbox: {
                        username: "1@1.com",
                        password: "21111",
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
                assert( error !== undefined,  "failed");
            }
        }
    ]
}