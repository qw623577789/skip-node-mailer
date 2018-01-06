const assert = require('assert');

module.exports = {
    name: "发送邮件(单个收件人+空主题+空正文＋紧急 + 需要回执)，应该成功",
    prerequisites: [
        require('../mailbox_add/126_imap_smtp_success'),
        require('../mailbox_add/sina_imap_smtp_success')
    ],
    steps: [
        {
            name: "mail_send",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    mailboxId: dataset.step(-1).response.mailboxId,
                    from: {
                        name: "skip_sina",
                        address: dataset.step(-1).request.username
                    },
                    to: [
                        {
                            name: "skip_126",
                            address: dataset.step(-2).request.username
                        }
                    ],
                    priority: GB.Common.Constant.Mail.Priority.HIGH,
                    needReply: true
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.state == 0, "add failed");
            }
        }
    ]
}