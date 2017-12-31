const assert = require('assert');

module.exports = {
    name: "imap首次读取邮件，从远程拉取，应该成功",
    prerequisites: [
        require("../mail_list_sync/imap_ssl_success")
    ],
    steps: [
        {
            name: "mail_get",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    id: dataset.step(-1).response[0].username,
                    protocol: GB.Common.Constant.ReceiveProtocol.IMAP,
                    username: "mail_tester@126.com",
                    password: "qwe123poi",
                    address: "imap.126.com",
                    port: 993,
                    useSSL: 1
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response == 0, "add failed");
            }
        }
    ]
}