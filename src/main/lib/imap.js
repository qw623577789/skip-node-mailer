const Imap = require('imap')
const MailParser = require("mailparser").MailParser
const fs = require("fs")

module.exports = class {
    constructor({
        user,
        password,
        host,
        port,
        secure = true //使用安全传输协议
    }){
        this._imap = new Imap({
            user,
            password,
            host,
            port,
            secure,
            tlsOptions: { rejectUnauthorized : false } ,//禁用对证书有效性的检查
            // debug      : function (x) {console.log(x);}
          });
    }

    /**
     * 
     * @param {fitter} like  ['UNSEEN', ['SINCE', 'May 20, 2017']]
     */
    async  async(box, filter) {
        let emailList = await this._search(box, filter);

        return await new Promise((resolve, reject) => {
            let that = this;
            let incomming = this._imap.fetch(emailList, { bodies: '' });
            let outgoing = [];
            incomming.on('message', function(msg, seqno) {
                let mailparser = new MailParser();
                let emailObj = {};
                msg.on('body', function(stream, info) {
                    stream.pipe(mailparser);

                    mailparser.on("headers", function(headers) {
                        emailObj.headers = {
                            subject :  headers.get('subject'),
                            from : headers.get('from').text,
                            to : headers.get('to').text,
                            messageId : headers.get('message-id'),
                            date : headers.get('date').getTime(),
                            cc : headers.get('cc'),
                            bcc : headers.get('bcc')
                            // replyTo : headers.get('reply_to').text,
                            // deliveredTo : headers.get('delivered_to').text,
                            // returnPath : headers.get('return_path').text,
                        }
                    });


                    mailparser.on("data", function(data) {
                        switch(data.type){
                            case 'text':
                                emailObj.content = data.html;
                                break;
                            case 'attachment':
                                if(!(emailObj.attachment instanceof Array)){
                                    emailObj.attachment = [];
                                }
                                emailObj.attachment.push({
                                    contentType : data.contentType,
                                    name : data.filename
                                })
                                data.release();
                                break;
                        }
                    });

                    mailparser.on("end", function() {
                        outgoing.push(emailObj);
                        if(outgoing.length == emailList.length){
                            return resolve(outgoing);
                        }
                    });

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
                that._imap.end();
            });
        });
    }


    async getBox(){
        await this._connect(this._imap);
        return await new Promise((resolve, reject) => {
            this._imap.getBoxes((err, boxes) => {
                if(err != undefined) return reject(err);
                return resolve(boxes);
            });
        }).then((boxes) => {
            this._imap.end();
            return boxes;
        });
    }

    //一定要注意附件的文件名要存在,否则函数永远无法返回,todo优化
    async downloadAttachment(box, uid, saveFileInfo){
        await this._connect(this._imap);
        await new Promise((resolve, reject) => {
            this._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        return await new Promise((resolve, reject) => {
            let that = this;
            let incomming = this._imap.fetch([uid], { bodies: '' });
            let outgoing = [];
            incomming.on('message', function(msg, seqno) {
                let mailparser = new MailParser();
                let downloadResult = {};
                msg.on('body', function(stream, info) {
                    stream.pipe(mailparser);
        
                    mailparser.on("data", function(data) {
                        switch(data.type){
                            case 'attachment':
                                if(Object.keys(saveFileInfo).indexOf(data.filename) != -1) {
                                    downloadResult.filename = data.filename;
                                    downloadResult.status = 1; 
                                    data.content.pipe(fs.createWriteStream(saveFileInfo[data.filename]));
                                }
                                data.release();
                                break;
                        }
                    });

                    mailparser.on("end", function() {
                        outgoing.push(downloadResult);
                        if(outgoing.length == Object.keys(saveFileInfo).length){
                            return resolve(outgoing);
                        }
                    });

                    mailparser.on("error", function(err) {
                        downloadResult.status = 0; //download failed
                        downloadResult.error = err;
                    });

                });

                msg.once('end', function() {
                });
            });

            incomming.once('error', function(err) {
                return reject(err);
            });

            incomming.once('end', function(imap) {
                that._imap.end();
            });
        });
    }

    async addSign(box, uid, sign){
        await this._connect(this._imap);
        await new Promise((resolve, reject) => {
            this._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        await new Promise((resolve, reject) => {
            let that = this;
            this._imap.addFlags([uid], [], (err) => {
                if(err != undefined) {
                    return reject(err);
                }
                else {
                    return resolve() ;
                }

            });
        });

        that._imap.end();
        return ;
    }

    async delSign(box, uid, sign){
        await this._connect(this._imap);
        await new Promise((resolve, reject) => {
            this._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        await new Promise((resolve, reject) => {
            let that = this;
            this._imap.delFlags([uid], [], (err) => {
                if(err != undefined) {
                    return reject(err);
                }
                else {
                    return resolve() ;
                }

            });
        });

        that._imap.end();
        return ;
    }

    async _connect(imap){
        return new Promise((resolve, reject) => {
            imap.once('ready', function() {
                return resolve();
            });
    
            imap.once('error', function(err) {
              return reject(err);
            });
            
            imap.once('end', function() {

            });

            imap.connect();
        })
    }

    async _search(box, filter){
        await this._connect(this._imap);
        await new Promise((resolve, reject) => {
            this._imap.openBox(box, true, (err, data) => {
                if(err != undefined) return reject(err);
                return resolve(data);
            });
        });

        return await new Promise((resolve, reject) => {
            this._imap.search(filter, function(err, results) {
                if(err != undefined) return reject(err);
                return resolve(results);
            });
        });
    }

    get EMAIL_TYPE() {
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

    get OPERATOR(){
        return {
            'BEFORE' : 'BEFORE',// - Messages whose internal date (disregarding time and timezone) is earlier than the specified date.
            'ON' : 'ON',//  - Messages whose internal date (disregarding time and timezone) is within the specified date.
            'SINCE' : 'SINCE',//  - Messages whose internal date (disregarding time and timezone) is within or later than the specified date.
            'SENTBEFORE' : 'SENTBEFORE',//  - Messages whose Date header (disregarding time and timezone) is earlier than the specified date.
            'SENTON' : 'SENTON',//  - Messages whose Date header (disregarding time and timezone) is within the specified date.
            'SENTSINCE' : 'SENTSINCE',//  - Messages whose Date header (disregarding time and timezone) is within or later than the specified date.
        }
    }

    get SIGN(){
        return {
            Seen : '\\Seen',
            Answered : '\\Answered',
            Flagged : '\\Flagged',
            Deleted : '\\Deleted',
            Draft : '\\Draft',
        }
    }
}

