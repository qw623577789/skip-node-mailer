const assert = require('assert');

module.exports = {
    name: "pop3首次读取邮件，从远程拉取，应该成功",
    prerequisites: [
        require("../mail_list_sync/pop3_ssl_success")
    ],
    steps: [
        {
            name: "mail_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    pageIndex: 0,
                    pageSize: 1,
                    mailboxId: dataset.step(-2).response.mailboxId,
                    classify: GB.Common.Constant.Mail.Classify.INBOX,
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.length == 1, "local list failed");
            }
        },
        {
            name: "mail_get",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return dataset.step(-1).response[0].id;
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.fromCache == false, "get failed");
            }
        }
    ]
}