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
                    protocol: GB.Common.Constant.Protocol.STMP,
                    username: "mail_tester2@sina.com",
                    password: "14yhl9d",
                    host: "smtp.sina.com",
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