const assert = require('assert');

module.exports = {
    name: "本地通过主题搜索,应该有结果",
    prerequisites: [
    ],
    steps: [
        {
            name: "mail_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    pageIndex: 0,
                    pageSize: 10,
                    mailboxId: "11332d7e68a34bd680678a9bb93b89fd",
                    classify: GB.Common.Constant.Mail.Classify.INBOX,
                    query: {
                        subject: "test"
                    }
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.length == 4, "list failed");
            }
        }
    ]
}