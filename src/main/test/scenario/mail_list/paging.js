const assert = require('assert');

module.exports = {
    name: "本地列出邮件列表,分页模式,应该有两页",
    prerequisites: [
    ],
    steps: [
        {
            name: "mail_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    pageIndex: 0,
                    pageSize: 2,
                    mailboxId: "11332d7e68a34bd680678a9bb93b89fd",
                    classify: GB.Common.Constant.Mail.Classify.INBOX,
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.length == 2, "list failed");
            }
        },
        {
            name: "mail_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    pageIndex: 1,
                    pageSize: 2,
                    mailboxId: "11332d7e68a34bd680678a9bb93b89fd",
                    classify: GB.Common.Constant.Mail.Classify.INBOX,
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.length == 2, "paging failed");
            }
        },
        {
            name: "mail_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    pageIndex: 2,
                    pageSize: 2,
                    mailboxId: "11332d7e68a34bd680678a9bb93b89fd",
                    classify: GB.Common.Constant.Mail.Classify.INBOX,
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.length == 0, "paging failed");
            }
        }
    ]
}