const assert = require('assert');

module.exports = {
    name: "imap_ssl同步邮件列表，应该成功",
    prerequisites: [
    ],
    steps: [
        {
            name: "mail_list_sync",
            timeout: 100000,
            prepareRequest: function(dataset) {
                return {
                    box: GB.Common.Constant.Mail.Classify.INBOX,
                    protocol: GB.Common.Constant.ReceiveProtocol.IMAP,
                    username: "mail_tester@126.com",
                    password: "qwe123poi",
                    address: "imap.126.com",
                    port: 993,
                    useSSL: 1
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response.state == 0, "login failed");
            }
        }
    ]
}