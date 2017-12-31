module.exports = async ({request,constant}) => {
    try {
        if (request.method == GB.Common.Constant.Method.POST) {
            let smtp = await GB.Module.Smtp.getinstance({
                user: request.username,
                password: request.password,
                host: request.address,
                port: request.port,
                secure: request.useSSL == 1 ? true:false
            });
            await smtp.verify();
            
        }
        else if (request.method == GB.Common.Constant.Method.RECEIVE && request.protocol == GB.Common.Constant.ReceiveProtocol.IMAP) {
            let imap = await GB.Module.Imap.getinstance({
                user: request.username,
                password: request.password,
                host: request.address,
                port: request.port,
                secure: request.useSSL == 1 ? true:false
            });
            imap.close();
        }
        else if (request.method == GB.Common.Constant.Method.RECEIVE && request.protocol == GB.Common.Constant.ReceiveProtocol.POP3) {
            let pop3 = await GB.Module.Pop3.getinstance({
                user: request.username,
                password: request.password,
                host: request.address,
                port: request.port,
                secure: request.useSSL == 1 ? true:false
            });
            pop3.close()
        }
        return {state: constant.State.SUCCESS};
    }
    catch (error) {
        return {state: constant.State.FAILED, message: error.message};
    }
}