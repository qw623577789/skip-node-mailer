const assert = require('assert');

module.exports = {
    name: "关闭一个邮箱收发信功能，应该成功",
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
                        password: dataset.step(-1).response[0].mailbox.password,
                        receive: {
                            state: 0
                        },
                        post: {
                            state: 0
                        }
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
                assert(
                    response[0].mailbox.receive.state == 0 && 
                    response[0].mailbox.receive.serverHost == undefined && 
                    response[0].mailbox.post.state == 0 &&
                    response[0].mailbox.post.serverHost == undefined,  "update failed");
            }
        }
    ]
}