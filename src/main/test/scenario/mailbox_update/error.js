const assert = require('assert');

module.exports = {
    name: "更新不存在邮箱，应该抛错",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_update",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    id: "11952a1a92364931a010fd135075a892",
                    username: "1@1.com"
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert( error !== undefined,  "failed");
            }
        }
    ]
}