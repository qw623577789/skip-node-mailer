const assert = require('assert');

module.exports = {
    name: "imap登录邮箱，应该成功",
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
                    password: "qwe123poi",
                    address: "imap.163.com",
                    port: 143,
                    useSSL: 0
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 0, "login failed");
            }
        }
    ]
}