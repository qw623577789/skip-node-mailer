const Pop3 = require('./lib/pop3.js');
const Imap = require('./lib/imap.js');
const Smtp = require('./lib/smtp.js');
let pop = new Pop3({
    user :  'qw623577789@163.com',
    password : 'Aoxiang',
    host : 'pop.163.com',
    port : 995,
    debug : false
})

// let reciver = new Reciver({
//     user : 'qw623577789@gmail.com',
//     password : '5201314as56',
//     host : '173.194.67.108',
//     port : 993,
// })

// let imap = new Imap({
//     user : 'qw623577789@163.com',
//     password : 'Aoxiang',
//     host : 'imap.163.com',
//     port : 143,
//     debug : true,
//     secure :false
// })

let imap = new Imap({
    user : '623577789@qq.com',
    password : 'qqgzjjbwoofmbbgc',
    host : 'imap.qq.com',
    port : 993,
    debug : true,
    secure :true
})

let stmp = new Smtp({
    user : '623577789@qq.com',
    password : 'qqgzjjbwoofmbbgc',
    host : 'smtp.qq.com',
    port : 465,
    debug : false,
    secure :true
})

Promise.resolve().then(async ()=>{
    //let email = await pop.list();

    // let email = await pop.get([emails[245]], (err, uid) => {
    //     console.log(uid);
    // });
    
    //let email = await pop.getDetail(emails[245]);

    //let email = await pop.verify();
    //let email = await imap.verify();

    // let email = await imap.list('INBOX',['ALL', ['SINCE', 'AUGUST 27, 2017']], (err, uid) => {
    //     console.log(uid);
    // });

    //let email = await imap.getDetail('INBOX', '1705');
    //let email = await stmp.verify();

    let email = await stmp.send({
        from : {
            name : "xs-qq",
            address : "623577789@qq.com"
        },
        to : [
            {
                name : "xs-163",
                address : "qw623577789@163.com"
            },
            {
                name : "xs-126",
                address : "qw623577789@126.com"
            }
        ],
        subject : "this is a test",
        html : `<p>11111</p><img src="cid:22222222222222222222222"/>`, 
        priority : Smtp.Priority.HIGH,
        notificationTo : {
            name : "xs-qq",
            address : "623577789@qq.com"
        },
        replyTo : '<2ac68128.3e8a.15e4219ed4e.Coremail.qw623577789@163.com>',
        attachments : [
            {
                filename : "pic1.jpg",
                path: "/home/xs/Pictures/a8d4b31c8701a18b10317426962f07082938fe85.jpg",
                cid : "22222222222222222222222"
            }
        ]
    }
)

let emails = await pop.list();
let email1 = await pop.getDetail(emails.length);
    //console.log(JSON.stringify(email1));
    console.log(email);
}).catch((err)=>{
    console.log(err.message)
})


// Promise.resolve().then(async ()=>{
//     let emails = await reciver.async('INBOX',['ALL', ['SINCE', 'May 20, 2017']]);
    
//     console.log(JSON.stringify(emails));
// }).catch((err)=>{
//     console.log(err.stack)
// })

// Promise.resolve().then(async ()=>{
//     let boxes = await reciver.getBox();
    
//     console.log(JSON.stringify(boxes));
// }).catch((err)=>{
//     console.log(err.stack)
// })



// Promise.resolve().then(async ()=>{
//     let result = await reciver.downloadAttachment('INBOX', 1705, {
//         'a8d4b31c8701a18b10317426962f07082938fe85.jpg' : '/tmp/test.jpg'
//     });
    
//     console.log(JSON.stringify(result));
// }).catch((err)=>{
//     console.log(err.stack)
// })
