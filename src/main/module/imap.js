const BaseImap = require('imap')
const MailParser = require("mailparser").MailParser
const EventEmitter = require('events').EventEmitter;
const fs = require("fs")

module.exports = class Imap extends EventEmitter {
    constructor(imap){
        super();
        this._imap = imap;
        this._imap.on('close', (hadError) => {this.emit('close', hadError)});
        this._imap.on('error', (error) => {this.emit('error', error)});
    }
    
    static async getinstance({
        user,
        password,
        host,
        port,
        secure = true, //使用安全传输协议,
        debug = false
    }) {
        let imap = new BaseImap({
            user,
            password,
            host,
            port,
            tls : secure,
            tlsOptions: { rejectUnauthorized : false } ,//禁用对证书有效性的检查
            debug : (info) => {
                if(debug) {
                    console.log(info);
                }
            }
        });

        await this._connect(imap);
        return new Imap(imap);
    }

    close() {
        this._imap.end();
    }

    isOnline() {
        return this._imap.state == 'connected'
    }

    async index(box, filter) {
        let that = this;
        await new Promise((resolve, reject) => {
            that._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        return await new Promise((resolve, reject) => {
            that._imap.search(filter, function(err, results) {
                if(err != undefined) return reject(err);
                return resolve(results);
            });
        });
    }

    async list(uidList, callback){
        let that = this;
        return await new Promise((resolve, reject) => {
            let incomming = that._imap.fetch(uidList, { bodies: ['HEADER'] });
            let outgoing = [];
            incomming.on('message', function(msg, seqno) {
                let emailObj = {};
                msg.on('body', async (stream, info) => {
                    let parser = require('mailparser').simpleParser;
                    await parser(stream).then(mail=>{
                        emailObj = Object.assign(emailObj, mail);
                        outgoing.push({
                            uid : emailObj.uid,
                            state : true,
                            data : emailObj
                        });

                        if (callback != undefined) callback(null, emailObj.uid);
                        if(outgoing.length == uidList.length){
                            return resolve(outgoing);
                        }
                    }).catch(err => {
                        outgoing.push({
                            uid : emailObj.uid,
                            state : false
                        });
                        if (callback != undefined) callback(err, emailObj.uid);
                    })
                });

                msg.once('end', function() {
                });

                msg.once('attributes', function(attrs) {
                    emailObj.uid = attrs.uid; //邮件id
                    emailObj.flags = attrs.flags; //邮件标记
                });
            });

            incomming.once('error', function(err) {
                return reject(err);
            });

            incomming.once('end', function(imap) {
                // that._imap.end();
            });
        });
    }

    async  getDetail(box, uid) {
        let that = this;
        await new Promise((resolve, reject) => {
            that._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        return await new Promise((resolve, reject) => {
            let incomming = that._imap.fetch([uid], { bodies: '' });
            let outgoing = [];
            incomming.on('message', function(msg, seqno) {
                let emailObj = {};
                msg.on('body', async(stream, info) => {
                    let parser = require('mailparser').simpleParser;
                    await parser(stream).then(mail=>{
                        emailObj = Object.assign(emailObj, mail);
                        return resolve(emailObj);
                    }).catch(err=>{
                        return reject(err);
                    })
                });

                msg.once('attributes', function(attrs) {
                    emailObj.uid = attrs.uid; //邮件id
                    emailObj.flags = attrs.flags; //邮件标记
                });

                msg.once('end', function() {
                });
            });

            incomming.once('error', function(err) {
                return reject(err);
            });

            incomming.once('end', function(imap) {
                // that._imap.end();
            });
        }); 
    }

    async getBox(){
        let that = this;
        return await new Promise((resolve, reject) => {
            that._imap.getBoxes((err, boxes) => {
                if(err != undefined) return reject(err);
                return resolve(boxes);
            });
        }).then((boxes) => {
            // this._imap.end();
            return boxes;
        });
    }

    async addSign(box, uid, sign){
        let that = this;
        await new Promise((resolve, reject) => {
            that._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        await new Promise((resolve, reject) => {
            that._imap.addFlags([uid], [], (err) => {
                if(err != undefined) {
                    return reject(err);
                }
                else {
                    return resolve() ;
                }

            });
        });

        // that._imap.end();
        return ;
    }

    async delSign(box, uid, sign){
        let that = this;
        await new Promise((resolve, reject) => {
            that._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        await new Promise((resolve, reject) => {
            that._imap.delFlags([uid], [], (err) => {
                if(err != undefined) {
                    return reject(err);
                }
                else {
                    return resolve() ;
                }

            });
        });

        // that._imap.end();
        return ;
    }

    static async _connect(imap){
        return new Promise((resolve, reject) => {
            imap.on('ready', function() {
                return resolve();
            });
    
            imap.on('error', function(err) {
              return reject(err);
            });

            imap.connect();
        })
    }

    async _search(box, filter){
        let that = this;
        await new Promise((resolve, reject) => {
            that._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        return await new Promise((resolve, reject) => {
            that._imap.search(filter, function(err, results) {
                if(err != undefined) return reject(err);
                return resolve(results);
            });
        });
    }

    static get EMAIL_TYPE() {
        return {
            'ALL'  : 'ALL', //- All messages.
            'ANSWERED'  : 'ANSWERED', // - Messages with the Answered flag set.
            'DELETED' : 'DELETED', // - Messages with the Deleted flag set.
            'DRAFT' : 'DRAFT', //- Messages with the Draft flag set.
            'FLAGGED'  : 'FLAGGED', //- Messages with the Flagged flag set.
            'NEW'  : 'NEW', // - Messages that have the Recent flag set but not the Seen flag.
            'SEEN'  : 'SEEN', // - Messages that have the Seen flag set.
            'RECENT'  : 'RECENT', // - Messages that have the Recent flag set.
            'OLD'  : 'OLD', // - Messages that do not have the Recent flag set. This is functionally equivalent to "!RECENT" (as opposed to "!NEW").
            'UNANSWERED'  : 'UNANSWERED', // - Messages that do not have the Answered flag set.
            'UNDELETED'  : 'UNDELETED', // - Messages that do not have the Deleted flag set.
            'UNDRAFT'  : 'UNDRAFT', // - Messages that do not have the Draft flag set.
            'UNFLAGGED'  : 'UNFLAGGED', // - Messages that do not have the Flagged flag set.
            'UNSEEN'  : 'UNSEEN', // - Messages that do not have the Seen flag set.
        }
    }

    static get OPERATOR(){
        return {
            'BEFORE' : 'BEFORE',// - Messages whose internal date (disregarding time and timezone) is earlier than the specified date.
            'ON' : 'ON',//  - Messages whose internal date (disregarding time and timezone) is within the specified date.
            'SINCE' : 'SINCE',//  - Messages whose internal date (disregarding time and timezone) is within or later than the specified date.
            'SENTBEFORE' : 'SENTBEFORE',//  - Messages whose Date header (disregarding time and timezone) is earlier than the specified date.
            'SENTON' : 'SENTON',//  - Messages whose Date header (disregarding time and timezone) is within the specified date.
            'SENTSINCE' : 'SENTSINCE',//  - Messages whose Date header (disregarding time and timezone) is within or later than the specified date.
        }
    }

    static get SIGN(){
        return {
            Seen : '\\Seen',
            Answered : '\\Answered',
            Flagged : '\\Flagged',
            Deleted : '\\Deleted',
            Draft : '\\Draft',
        }
    }
}

