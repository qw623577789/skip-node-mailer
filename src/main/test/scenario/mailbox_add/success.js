const assert = require('assert');

module.exports = {
    name: "添加邮箱，应该成功",
    prerequisites: [],
    steps: [
        {
            name: "mailbox_add",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    username: "mail_tester@126.com",
                    password: "14yhl9d",
                    receiveState: 1,
                    receiveProtocol: 1,
                    receiveUseSSL: 1,
                    receiveServerAddress: "imap.126.com",
                    receiveServerPort: 993,
                    postState: 1,
                    postUseSSL: 1,
                    postServerAddress: "smtp.126.com",
                    postServerPort: 994
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response == 0, "add failed");
            }
        }
    ]
}