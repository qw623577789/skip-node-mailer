const POP3 = require("./pop3");
let pop3 = new POP3({
    user : "mail_tester@163.com",
    password: "qwe123poi",
    host: "pop.163.com",
    port: 995
})

Promise.resolve().then(async() => {
    console.log(await pop3.list())
})
