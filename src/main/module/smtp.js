const nodeMailer = require('nodemailer');

module.exports = class {
    constructor({
        user,
        password,
        host,
        port,
        secure = true, //使用安全传输协议
        debug = false
    }) {
        this._stmp = nodeMailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass: password
            },
            debug,
            logger : debug
        });
    }

    async verify(){
        return new Promise((resolve, reject)=>{
            this._stmp.verify(function(err, success) {
                if (err) {
                    return resolve({
                        state : 1,
                        message : err.message
                    });
                } else {
                    return resolve({
                        state : 0
                    });
                }
            });
        })
    }

    
    async send({from, to, subject, html, cc = undefined, bcc = undefined, priority = 'normal', notificationTo = undefined, replyTo = undefined, attachments = undefined}){
        let message = {
            from: {
                name: from.name,
                address: from.address
            },
            to: to.map((item) =>{
                return {
                    name : item.name,
                    address : item.address
                }
            }),
            cc: cc !== undefined ? cc.map((item) => {
                return {
                    name : item.name,
                    address : item.address
                }
            }) : undefined,
            bcc: bcc !== undefined ? bcc.map((item) => {
                return {
                    name : item.name,
                    address : item.address
                }
            }) : undefined,
            headers : {
                'X-Priority' : priority,
                'Disposition-Notification-To' :     `"${notificationTo.name}" <${notificationTo.address}>`//是否需要回执给某人
            },
            subject,
            text: html.replace(/<[^>]+>/g,""),
            html: html,
            inReplyTo : replyTo,
            attachments : attachments != undefined ? attachments.map((item) => {
                return {
                    filename : item.filename,
                    path: item.path,
                    cid : item.cid
                }
            }) : undefined
        };

        return new Promise((resolve, reject)=>{
            this._stmp.sendMail(message, (err, data)=>{
                if(err != undefined) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            })
        })
    }

    static get Priority(){
        return {
            LOW : '5',
            NORMAL : '',
            HIGH : '1'   
        }
    }
}