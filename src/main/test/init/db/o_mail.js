module.exports = [
    {
        id: "9a332d7e68a34bd680678a9bb93b89fd",
        classify: GB.Common.Constant.Mail.Classify.INBOX,
        seen: 0, 
        uniqueIdentifier: JSON.stringify({
            common: "9a332d7e68a34bd680678a9bb93b89fd@test.com",
            pop3: "9a332d7e68a34bd680678a9bb93b89fd"
        }),
        from: JSON.stringify([{
            name: "test_sender",
            address: "test_sender@test.com"
        }]),
        to: JSON.stringify([{
            name: "test_reciver",
            address: "test_reciver@test.com"
        }]),
        subject: "test_demo",
        priority: GB.Common.Constant.Mail.Priority.NORMAL,
        sendTime: 1514651510,
        attachments: JSON.stringify({
            has: false
        })       
    },
    {
        id: "9a332d7e68a34bd680678a9bb93b89fe",
        classify: GB.Common.Constant.Mail.Classify.INBOX,
        seen: 0, 
        uniqueIdentifier: JSON.stringify({
            common: "9a332d7e68a34bd680678a9bb93b89fe@test.com",
            pop3: "9a332d7e68a34bd680678a9bb93b89fe"
        }),
        from: JSON.stringify([{
            name: "test_sender",
            address: "test_sender@test.com"
        }]),
        to: JSON.stringify([{
            name: "test_reciver",
            address: "test_reciver@test.com"
        }]),
        bc: JSON.stringify([{
            name: "test_bc",
            address: "test_bc@test.com"
        }]),
        cc: JSON.stringify([{
            name: "test_cc",
            address: "test_cc@test.com"
        }]),
        subject: "test_demo2",
        priority: GB.Common.Constant.Mail.Priority.NORMAL,
        sendTime: 1514661510,
        attachments: JSON.stringify({
            has: false
        })       
    },
    {
        id: "9a332d7e68a34bd680678a9bb93b89ff",
        classify: GB.Common.Constant.Mail.Classify.INBOX,
        seen: 1, 
        uniqueIdentifier: JSON.stringify({
            common: "9a332d7e68a34bd680678a9bb93b89ff@test.com",
            pop3: "9a332d7e68a34bd680678a9bb93b89ff"
        }),
        from: JSON.stringify([{
            name: "test_sender",
            address: "test_sender@test.com"
        }]),
        to: JSON.stringify([{
            name: "test_reciver",
            address: "test_reciver@test.com"
        }]),
        bc: JSON.stringify([{
            name: "test_bc",
            address: "test_bc@test.com"
        }]),
        cc: JSON.stringify([{
            name: "test_cc",
            address: "test_cc@test.com"
        }]),
        subject: "test_demo3",
        priority: GB.Common.Constant.Mail.Priority.HIGH,
        sendTime: 1514781510,
        content: JSON.stringify({
            html: "<p>test_content</p>",
            text: "test_content"
        }),
        attachments: JSON.stringify({
            has: false
        })       
    },
    {
        id: "9a332d7e68a34bd680678a9bb93b890f",
        classify: GB.Common.Constant.Mail.Classify.INBOX,
        seen: 1, 
        uniqueIdentifier: JSON.stringify({
            common: "9a332d7e68a34bd680678a9bb93b890f@test.com",
            pop3: "9a332d7e68a34bd680678a9bb93b890f"
        }),
        from: JSON.stringify([{
            name: "test_sender",
            address: "test_sender@test.com"
        }]),
        to: JSON.stringify([{
            name: "test_reciver",
            address: "test_reciver@test.com"
        }]),
        bc: JSON.stringify([{
            name: "test_bc",
            address: "test_bc@test.com"
        }]),
        cc: JSON.stringify([{
            name: "test_cc",
            address: "test_cc@test.com"
        }]),
        subject: "test_demo4",
        priority: GB.Common.Constant.Mail.Priority.HIGH,
        sendTime: 1514791510,
        content: JSON.stringify({
            html: "<p>test2_content</p>",
            text: "test2_content"
        }),
        attachments: JSON.stringify({
            has: true,
            items: [
                {
                    contentType: "image/jpeg",
                    filename: "test_attachment1",
                    md5: "9a332d7e68a34bd680678a9bb93b890f",
                    size: 12580,
                    cacheName: "9a332d7e68a34bd680678a9bb93b890f"
                }
            ]
        })       
    },
    {
        id: "9a332d7e68a34bd680678a9bb93b8900",
        classify: GB.Common.Constant.Mail.Classify.OUTBOX,
        seen: 0, 
        uniqueIdentifier: JSON.stringify({
            common: "9a332d7e68a34bd680678a9bb93b89fe@test.com",
            pop3: "9a332d7e68a34bd680678a9bb93b89fe"
        }),
        from: JSON.stringify([{
            name: "test_sender",
            address: "test_sender@test.com"
        }]),
        to: JSON.stringify([{
            name: "test_reciver",
            address: "test_reciver@test.com"
        }]),
        bc: JSON.stringify([{
            name: "test_bc",
            address: "test_bc@test.com"
        }]),
        cc: JSON.stringify([{
            name: "test_cc",
            address: "test_cc@test.com"
        }]),
        subject: "test_demo2",
        priority: GB.Common.Constant.Mail.Priority.NORMAL,
        sendTime: 1514661510,
        attachments: JSON.stringify({
            has: false
        })       
    }
]