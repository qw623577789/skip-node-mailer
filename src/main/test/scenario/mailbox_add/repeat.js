const assert = require('assert');

module.exports = {
    name: "重复添加邮箱,应该阻止",
    prerequisites: [
        require('./126_imap_smtp_success')
    ],
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
                        protocol: 1,
                        useSSL: 1,
                        serverHost: "pop.126.com",
                        serverPort: 995,
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
                assert(response !== undefined && response.state == 1,  "failed");
            }
        }
    ]
}