const assert = require('assert');

module.exports = {
    name: "删除一个邮箱，应该成功",
    prerequisites: [
        require('../mailbox_list/success')
    ],
    steps: [
        {
            name: "mailbox_delete",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return dataset.step(-1).response[0].username;
            },
            handleResponse: function({error, response}, dataset) {
                assert(error == undefined, "delete error");
            }
        },
        {
            name: "mailbox_list",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {};
            },
            handleResponse: function({error, response}, dataset) {
                assert( response instanceof Array &&  response.findIndex((item) => item.username == dataset.step(-1).response[0].username) == -1,  "delete failed");
            }
        }
    ]
}