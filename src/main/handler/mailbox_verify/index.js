module.exports = async ({request}) => {
    if (request.method == GB.Common.Constant.Method.POST) {
        let smtp = new GB.Module.Smtp({
            user: request.username,
            password: request.password,
            host: request.address,
            port: request.port,
            secure: request.useSSL == 1 ? true:false
        });
        let {state, message} = await smtp.verify();
        return {state, message};
    }
    else if (request.method == GB.Common.Constant.Method.RECEIVE && request.protocol == GB.Common.Constant.ReceiveProtocol.IMAP) {
        let imap = new GB.Module.Imap({
            user: request.username,
            password: request.password,
            host: request.address,
            port: request.port,
            secure: request.useSSL == 1 ? true:false
        });
        let {state, message} = await imap.verify();
        return {state, message};
    }
    else if (request.method == GB.Common.Constant.Method.RECEIVE && request.protocol == GB.Common.Constant.ReceiveProtocol.POP3) {

        let pop3 = new GB.Module.Pop3({
            user: request.username,
            password: request.password,
            host: request.address,
            port: request.port,
            secure: request.useSSL == 1 ? true:false
        });
        let {state, message} = await pop3.verify();
        return {state, message};
    }
}