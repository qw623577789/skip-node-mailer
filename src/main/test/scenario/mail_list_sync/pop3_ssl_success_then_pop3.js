const assert = require('assert');

module.exports = {
    name: "pop3_ssl同步邮件列表,再用pop3同步，应该返回新邮件数为0",
    prerequisites: [
        require('./pop3_ssl_success')
    ],
    steps: [
        {
            name: "mail_list_sync",
            timeout: 100000,
            prepareRequest: function(dataset) {
                return {
                    box: GB.Common.Constant.Mail.Classify.INBOX,
                    mailboxId: dataset.step(-2).response.mailboxId
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined && response == 0, "test failed");
            }
        }
    ]
}