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
                    method: GB.Common.Constant.Method.RECEIVE,
                    protocol: GB.Common.Constant.ReceiveProtocol.IMAP,
                    username: "mail_tester@163.com",
                    password: "qwe123po1i",
                    address: "imap.163.com",
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