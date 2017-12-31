// const IMAP = require("./imap");
const POP3 = require("./pop3");

Promise.resolve().then(async() => {
    let pop3 = await POP3.getinstance({
        user: "mail_tester@126.com",
        password: "qwe123poi",
        host: "pop.126.com",
        port: 995,
        secure: true
    });
    console.log(await pop3.index())
    console.log(await pop3.getDetail(1))
    // let a = await imap.getDetail('INBOX', '1514045461');
    // console.log(a.attachments[0].headers)
})

// Promise.resolve().then(async() => {
//     let imap = await IMAP.getinstance({
//         user: "mail_tester@126.com",
//         password: "qwe123poi",
//         host: "imap.126.com",
//         port: 993,
//         secure: true
//     });
//     console.log(await imap.index('INBOX', ['ALL']))
//     //console.log(await imap.list(['1514045459']))
//     let a = await imap.getDetail('INBOX', '1514045461');
//     console.log(a.attachments[0].headers)
// })
