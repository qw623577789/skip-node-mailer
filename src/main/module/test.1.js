const IMAP = require("./imap");

Promise.resolve().then(async() => {
    let imap = await IMAP.getinstance({
        user: "mail_tester@126.com",
        password: "qwe123poi",
        host: "imap.126.com",
        port: 993,
        secure: true
    });
    // console.log(await pop3.index())
    console.log(await imap.getDetail('INBOX', 1514045466))
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
