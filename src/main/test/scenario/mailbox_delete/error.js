const assert = require('assert');

module.exports = {
    name: "删除不存在邮箱，应该抛错",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_delete",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return "11952a1a92364931a010fd135075a892";
            },
            handleResponse: function({error, response}, dataset) {
                assert( error !== undefined,  "failed");
            }
        }
    ]
}