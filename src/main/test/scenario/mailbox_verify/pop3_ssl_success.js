const assert = require('assert');

module.exports = {
    name: "pop3_ssl登录邮箱，应该成功",
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
                    password: "qwe123poi",
                    address: "pop.163.com",
                    port: 995,
                    useSSL: 1
                }
            },
            handleResponse: function({error, response}, dataset) {
                console.log(response)
                assert(error == undefined && response.state == 0, "login failed");
            }
        }
    ]
}