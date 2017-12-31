const assert = require('assert');

module.exports = {
    name: "smtp登录邮箱，应该成功",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_verify",
            timeout: 100000,
            prepareRequest: function(dataset) {
                return {
                    method: GB.Common.Constant.Method.POST,
                    protocol: GB.Common.Constant.PostProtocol.STMP,
                    username: "mail_tester@126.com",
                    password: "qwe123poi",
                    address: "smtp.126.com",
                    port: 25,
                    useSSL: 0
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 0, "login failed");
            }
        }
    ]
}