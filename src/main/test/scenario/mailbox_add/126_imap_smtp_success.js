const assert = require('assert');

module.exports = {
    name: "添加126邮箱(imap+smtp)，应该成功",
    prerequisites: [],
    steps: [
        {
            name: "mailbox_add",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    username: "mail_tester@126.com",
                    password: "qwe123poi",
                    receive: {
                        state: 1,
                        protocol: 2,
                        useSSL: 1,
                        serverHost: "imap.126.com",
                        serverPort: 993,
                    },
                    post: {
                        state: 1,
                        useSSL: 1,
                        serverHost: "smtp.126.com",
                        serverPort: 994
                    }
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.state == 0, "add failed");
            }
        }
    ]
}