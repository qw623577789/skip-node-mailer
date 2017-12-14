const assert = require('assert');

module.exports = {
    name: "成功添加邮箱",
    prerequisites: [],
    steps: [
        {
            name: "mailbox_add",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    username: "mail_tester@163.com",
                    password: "14yhl9d",
                    receiveState: 1,
                    receiveProtocol: 1,
                    receiveUseSSL: 1,
                    receiveServerAddress: "imap.163.com",
                    receiveServerPort: 993,
                    postState: 1,
                    postUseSSL: 1,
                    postServerAddress: "smtp.163.com",
                    postServerPort: 994
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response == 0, "add failed");
            }
        }
    ]
}