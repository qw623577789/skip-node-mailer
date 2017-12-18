const assert = require('assert');

module.exports = {
    name: "系统无存在邮箱，应该返回空数组",
    prerequisites: [
    ],
    steps: [
        {
            name: "mailbox_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {};
            },
            handleResponse: function({error, response}, dataset) {
                assert( response instanceof Array && response.length == 0,  "list failed");
            }
        }
    ]
}