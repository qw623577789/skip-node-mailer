const nodeMailer = require('nodemailer');

module.exports = class {
    constructor({
        user,
        password,
        host,
        port,
        secure = true //使用安全传输协议
    }) {
        this._nodeMailer = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass: password
            }
        });
    }

    async send(){
        return 
        this._nodeMailer.verify(function(error, success) {
            if (error) {
                 console.log(error);
            } else {
                 console.log('Server is ready to take our messages');
            }
         });
    }
}