const assert = require('assert');

module.exports = {
    name: "smtp_ssl错误密码登录邮箱，应该登录失败",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_verify",
            timeout: 10000,
            prepareRequest: function(dataset) {
                return {
                    protocol: GB.Common.Constant.Protocol.STMP,
                    username: "mail_tester2@sina.com",
                    password: "14yhl9di",
                    host: "smtp.sina.com",
                    port: 465,
                    useSSL: 1
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 1, "failed");
            }
        }
    ]
}