const assert = require('assert');

module.exports = {
    name: "smtp_ssl登录邮箱，应该成功",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_verify",
            timeout: 100000,
            prepareRequest: function(dataset) {
                return {
                    protocol: GB.Common.Constant.Protocol.STMP,
                    username: "mail_tester@126.com",
                    password: "qwe123poi",
                    address: "smtp.126.com",
                    port: 994,
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