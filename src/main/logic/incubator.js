let container = new Map();

module.exports = class {

    async get(mailboxId, protocal) {
        let obj = container.get(`${mailboxId}_${protocal}`);
        if (obj == undefined) {
            return await this._incubate(mailboxId, protocal);
        }
        else {
            if (await obj.isOnline == false) {
                container.delete(`${mailboxId}_${protocal}`);
                return await this._incubate(mailboxId, protocal);
            }
            else {
                return obj;
            }
        }
    }

    async _incubate(mailboxId, protocal) {
        let mailboxConfig = await GB.Model.select('o_mailbox').where(GB.Model.Logic.statement('id', '=', mailboxId)).run();
        let obj = null;
        switch (protocal) {
            case GB.Common.Constant.Protocol.IMAP:
                obj = await GB.Module.Imap.getinstance({
                    user: mailboxConfig.username,
                    password: mailboxConfig.password,
                    host: mailboxConfig.receiveServerAddress,
                    port: mailboxConfig.receiveServerPort,
                    secure: mailboxConfig.receiveUseSSL == 1 ? true:false
                });

                obj.on('close', (hadError) => {
                    GB.Logger.Runtime.debug(`${mailboxId}_${protocal}:close,hadError: ${hadError}`)
                    container.delete(`${mailboxId}_${protocal}`)
                });
                obj.on('error', (error) => {
                    GB.Logger.Runtime.debug(`${mailboxId}_${protocal}:error,${error}`)
                })
                break;
            case GB.Common.Constant.Protocol.POP3:
                obj = await GB.Module.Pop3.getinstance({
                    user: mailboxConfig.username,
                    password: mailboxConfig.password,
                    host: mailboxConfig.receiveServerAddress,
                    port: mailboxConfig.receiveServerPort,
                    secure: mailboxConfig.receiveUseSSL == 1 ? true:false
                });
                obj.on('disconnect', () => {
                    GB.Logger.Runtime.debug(`${mailboxId}_${protocal}:disconnect`)
                    container.delete(`${mailboxId}_${protocal}`)
                })
                break;
            case GB.Common.Constant.Protocol.STMP:
                obj = await GB.Module.Smtp.getinstance({
                    user: mailboxConfig.username,
                    password: mailboxConfig.password,
                    host: mailboxConfig.postServerAddress,
                    port: mailboxConfig.postServerPort,
                    secure: mailboxConfig.postUseSSL == 1 ? true:false
                });
                await smtp.verify();

                setInterval(async () => {
                    try {
                        await smtp.verify();
                    }
                    catch (error) {
                        GB.Logger.Runtime.debug(`${mailboxId}_${protocal}:disconnect`)
                        container.delete(`${mailboxId}_${protocal}`)
                    }
                }, 60000)
                break;
        }


        container.set(mailboxId, obj);
        return obj;
    }

    remove(mailboxId, protocal) {
        let obj = container.get(`${mailboxId}_${protocal}`);
        if (obj != undefined) {
            container.delete(`${mailboxId}_${protocal}`);
            switch (protocal) {
                case GB.Common.Constant.Protocol.IMAP:
                    obj.close();
                    break;
                case GB.Common.Constant.Protocol.POP3:
                    obj.close();
                    break;
                case GB.Common.Constant.Protocol.STMP:
                    break;
            }
        }
    }
}