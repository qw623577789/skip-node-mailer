const Pop3 = require('./lib/pop3.js');
let pop = new Pop3({
    user :  'qw623577789@163.com',
    password : 'Aoxiang',
    host : 'pop.163.com',
    port : 995
})

// let reciver = new Reciver({
//     user : 'qw623577789@gmail.com',
//     password : '5201314as56',
//     host : '173.194.67.108',
//     port : 993,
// })

// let reciver = new Reciver({
//     user : 'qw623577789@163.com',
//     password : 'Aoxiang',
//     host : 'imap.163.com',
//     port : 143,
//     tls : false
// })

// let reciver = new Reciver({
//     user : '623577789@qq.com',
//     password : 'qqgzjjbwoofmbbgc',
//     host : 'imap.qq.com',
//     port : 993
// })

Promise.resolve().then(async ()=>{
    let emails = await pop.list();

    let email = await pop.get([emails[0],emails[1]], (err, uid) => {
        console.log(uid);
    });
    
    let email1s = await pop.getDetail(emails[0]);
    console.log(JSON.stringify(email));
}).catch((err)=>{
    console.log(err.stack)
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
