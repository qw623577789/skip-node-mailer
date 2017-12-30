const assert = require('assert');

module.exports = {
    name: "pop3_ssl同步邮件列表,再用pop3同步，应该返回新邮件数为0",
    prerequisites: [
        require('../mail_list_sync/pop3_ssl_success')
    ],
    steps: [
        {
            name: "mail_list_sync",
            timeout: 100000,
            prepareRequest: function(dataset) {
                return {
                    box: GB.Common.Constant.Mail.Classify.INBOX,
                    protocol: GB.Common.Constant.ReceiveProtocol.POP3,
                    username: "mail_tester@126.com",
                    password: "qwe123poi",
                    address: "pop.126.com",
                    port: 995,
                    useSSL: 1
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response == 0, "test failed");
            }
        }
    ]
}