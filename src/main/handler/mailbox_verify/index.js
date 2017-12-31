module.exports = async ({request,constant}) => {
    try {
        switch (request.protocol) {
            case GB.Common.Constant.Protocol.STMP:
                let smtp = await GB.Module.Smtp.getinstance({
                    user: request.username,
                    password: request.password,
                    host: request.address,
                    port: request.port,
                    secure: request.useSSL == 1 ? true:false
                });
                await smtp.verify();
                break;
            case GB.Common.Constant.Protocol.IMAP:
                let imap = await GB.Module.Imap.getinstance({
                    user: request.username,
                    password: request.password,
                    host: request.address,
                    port: request.port,
                    secure: request.useSSL == 1 ? true:false
                });
                imap.close();
                break;
            case GB.Common.Constant.Protocol.POP3:
                let pop3 = await GB.Module.Pop3.getinstance({
                    user: request.username,
                    password: request.password,
                    host: request.address,
                    port: request.port,
                    secure: request.useSSL == 1 ? true:false
                });
                pop3.close();
                break;
        }
        return {state: constant.State.SUCCESS};
    }
    catch (error) {
        return {state: constant.State.FAILED, message: error.message};
    }
}