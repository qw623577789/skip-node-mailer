const assert = require('assert');

module.exports = {
    name: "imap_ssl登录邮箱，应该成功",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_verify",
            timeout: 10000,
            prepareRequest: function(dataset) {
                return {
                    protocol: GB.Common.Constant.Protocol.IMAP,
                    username: "mail_tester@126.com",
                    password: "qwe123poi",
                    host: "imap.126.com",
                    port: 993,
                    useSSL: 1
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 0, "login failed");
            }
        }
    ]
}