const assert = require('assert');

module.exports = {
    name: "imap非首次读取邮件，从缓存拉取，应该成功",
    prerequisites: [
        require("./imap_success_from_remote")
    ],
    steps: [
        {
            name: "mail_get",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return dataset.step(-1).response.id;
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.fromCache == true, "get failed");
            }
        }
    ]
}