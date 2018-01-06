let container = new Map();

module.exports = class {

    async get(mailboxId, protocal) {
        let obj = container.get(`${mailboxId}_${protocal}`);
        if (obj == undefined) {
            GB.Logger.Runtime.debug(`incubator: ${mailboxId}_${protocal} to incubate`)
            return await this._incubate(mailboxId, protocal);
        }
        else {
            let isOnline = await obj.isOnline();
            if (isOnline == false) {
                GB.Logger.Runtime.debug(`incubator: ${mailboxId}_${protocal} is offline ,to incubate`)
                container.delete(`${mailboxId}_${protocal}`);
                return await this._incubate(mailboxId, protocal);
            }
            else {
                GB.Logger.Runtime.debug(`incubator: ${mailboxId}_${protocal} is online ,give back from cache`)
                return obj;
            }
        }
    }

    async _incubate(mailboxId, protocal) {
        let [{o_mailbox: mailboxConfig}] = await GB.Model.select('o_mailbox').where(GB.Model.Logic.statement('id', '=', mailboxId)).run();
        let obj = null;
        let timer = null;

        switch (protocal) {
            case GB.Common.Constant.Protocol.IMAP:
                obj = await GB.Module.Imap.getinstance({
                    user: mailboxConfig.username,
                    password: mailboxConfig.password,
                    host: mailboxConfig.receiveServerHost,
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
                    host: mailboxConfig.receiveServerHost,
                    port: mailboxConfig.receiveServerPort,
                    secure: mailboxConfig.receiveUseSSL == 1 ? true:false
                });
                
                timer = setInterval( () => {
                    if (pop.connected == false) {
                        GB.Logger.Runtime.debug(`${mailboxId}_${protocal}:disconnect`)
                        container.delete(`${mailboxId}_${protocal}`)
                        clearInterval(timer)
                    }
                }, 60000)
                break;
            case GB.Common.Constant.Protocol.STMP:
                obj = await GB.Module.Smtp.getinstance({
                    user: mailboxConfig.username,
                    password: mailboxConfig.password,
                    host: mailboxConfig.postServerHost,
                    port: mailboxConfig.postServerPort,
                    secure: mailboxConfig.postUseSSL == 1 ? true:false
                });
                await obj.verify();

                timer = setInterval(async () => {
                    try {
                        await obj.verify();
                    }
                    catch (error) {
                        GB.Logger.Runtime.debug(`${mailboxId}_${protocal}:disconnect`)
                        container.delete(`${mailboxId}_${protocal}`)
                        clearInterval(timer)
                    }
                }, 60000)
                break;
        }


        container.set(mailboxId, obj);
        return obj;
    }

    isExisted(mailboxId, protocal) {
        return container.has(`${mailboxId}_${protocal}`);
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