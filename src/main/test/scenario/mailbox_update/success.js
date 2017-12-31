const assert = require('assert');

module.exports = {
    name: "更新一个邮箱信息，应该成功",
    prerequisites: [
        require('../mailbox_list/success')
    ],
    steps: [
        {
            name: "mailbox_update",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    id: dataset.step(-1).response[0].id,
                    password: "12345"
                }
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined, "update error");
            }
        },
        {
            name: "mailbox_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {};
            },
            handleResponse: function({error, response}, dataset) {
                assert(response[0].password == "12345",  "update failed");
            }
        }
    ]
}