const assert = require('assert');

module.exports = {
    name: "发送邮件(单个收件人+网页正文+两个附件)，应该成功",
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
                    priority: GB.Common.Constant.Mail.Priority.NORMAL,
                    subject: "test from skip_sina base_html_content_attachments",
                    content: `<div><b><font size="6">字要大</font></b>，<font color="#ff0000"><u><i>颜色要鲜艳</i></u></font></div>`,
                    attachments: [
                        `${__dirname}/../../init/file/attachment1.jpg`,
                        `${__dirname}/../../init/file/attachment2.png`,
                    ]
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(response !== undefined && response.state == 0, "add failed");
            }
        }
    ]
}