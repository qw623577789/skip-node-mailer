const nodeMailer = require('nodemailer');
const EventEmitter = require('events').EventEmitter;

module.exports = class Smtp extends EventEmitter{
    constructor(smtp) {
        super();
        this._smtp = smtp;
    }

    static async getinstance({
        user,
        password,
        host,
        port,
        secure = true, //使用安全传输协议
        debug = false
    }) {
        let smtp = nodeMailer.createTransport({
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
        return new Smtp(smtp);
    }

    async isOnline() {
        try {
            await this.verify();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    async verify(){
        return new Promise((resolve, reject)=>{
            this._smtp.verify(function(err, success) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
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
                'X-Priority' : priority
            },
            subject,
            text: html == undefined ? "" : html.replace(/<[^>]+>/g,""),
            html: html == undefined ? "" : html,
            inReplyTo : replyTo != undefined ?`${replyTo}` : "", //邮件回复字段
            references: replyTo != undefined ?`${replyTo}` : "",//邮件回复字段
            attachments : attachments != undefined ? attachments.map((item) => {
                return {
                    filename : item.filename,
                    path: item.path,
                    cid : item.cid
                }
            }) : undefined
        };

        //是否需要回执给某人
        if (notificationTo != undefined) {
            message.headers['Disposition-Notification-To'] =  `"${notificationTo.name}" <${notificationTo.address}>`;
        }

        return new Promise((resolve, reject)=>{
            this._smtp.sendMail(message, (err, data)=>{
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