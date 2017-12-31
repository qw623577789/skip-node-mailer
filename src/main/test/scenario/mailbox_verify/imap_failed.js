const assert = require('assert');

module.exports = {
    name: "imap错误密码登录邮箱，应该登录失败",
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
                    password: "qwe123po1i",
                    address: "imap.126.com",
                    port: 143,
                    useSSL: 0
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 1, "failed");
            }
        }
    ]
}