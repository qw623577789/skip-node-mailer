const assert = require('assert');

module.exports = {
    name: "更新一个邮箱密码信息，应该成功",
    prerequisites: [
        require('../mailbox_list/imap_smtp_success')
    ],
    steps: [
        {
            name: "mailbox_update",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    id: dataset.step(-1).response[0].id,
                    mailbox: {
                        username: dataset.step(-1).response[0].mailbox.username,
                        password: "12345",
                        receive: dataset.step(-1).response[0].mailbox.receive,
                        post: dataset.step(-1).response[0].mailbox.post
                    }
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
                assert(response[0].mailbox.password == "12345",  "update failed");
            }
        }
    ]
}