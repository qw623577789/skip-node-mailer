const assert = require('assert');

module.exports = {
    name: "pop3_ssl错误密码登录邮箱，应该登录失败",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_verify",
            timeout: 10000,
            prepareRequest: function(dataset) {
                return {
                    method: GB.Common.Constant.Method.RECEIVE,
                    protocol: GB.Common.Constant.ReceiveProtocol.POP3,
                    username: "mail_tester@163.com",
                    password: "qwe123po1i",
                    address: "pop.163.com",
                    port: 995,
                    useSSL: 1
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 1, "failed");
            }
        }
    ]
}