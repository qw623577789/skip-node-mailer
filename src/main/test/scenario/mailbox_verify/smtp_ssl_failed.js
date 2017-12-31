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
                    username: "mail_tester@126.com",
                    password: "qwe123po1i",
                    address: "smtp.126.com",
                    port: 994,
                    useSSL: 1
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 1, "failed");
            }
        }
    ]
}