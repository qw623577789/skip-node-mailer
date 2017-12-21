const assert = require('assert');

module.exports = {
    name: "pop3登录邮箱，应该成功",
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
                    username: "qw623577789@126.com",
                    password: "5201314aS56",
                    address: "pop.126.com",
                    port: 110,
                    useSSL: 0
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 0, "login failed");
            }
        }
    ]
}