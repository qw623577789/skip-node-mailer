const assert = require('assert');

module.exports = {
    name: "列出邮箱列表(pop3_imap)，应该成功",
    prerequisites: [
        require('../mailbox_add/126_imap_smtp_success')
    ],
    steps: [
        {
            name: "mailbox_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {};
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.length == 1, "list failed");
            }
        }
    ]
}