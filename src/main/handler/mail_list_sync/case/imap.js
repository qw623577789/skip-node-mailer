module.exports = async (request, notifyCallback) => {
    let imap = await GB.Module.Imap.getinstance({
        user: request.username,
        password: request.password,
        host: request.address,
        port: request.port,
        secure: request.useSSL == 1 ? true:false
    });

    //step1. 获取uid列表
    let mailIndexList = await imap.index(request.box, [GB.Module.Imap.EMAIL_TYPE.ALL]);

    //step2. 缓存比较过滤
    let filter = await Promise.all(
        mailIndexList.map((uid) => {
            return GB.Model.count("mail").where(GB.Model.Logic.statement('uniqueIdentifier', GB.Model.Ops.LIKE, `%"imap":${uid}%`)).run()
        })
    );
    mailIndexList = mailIndexList.filter((item, index)  => {
        return filter[index] == 0;
    })

    let processCallback = (error, uid) => {
        notifyCallback(error, mailIndexList.indexOf(uid), mailIndexList.length)
    }

    //step3. 邮件简要列表获取
    let mailList =  (await imap.list(mailIndexList, processCallback))
    .filter(item => item.state == true)
    .map((item) => {
        item.data.messageId = item.data.messageId.substr(1, item.data.messageId.length - 2);
        return item;
    });

    filter = await Promise.all(
        mailList.map((item) => {
            return GB.Model.count("mail").where(GB.Model.Logic.statement('uniqueIdentifier', GB.Model.Ops.LIKE, `%"common":"${item.data.messageId}"%`)).run()
        })
    );

    //step4. 缓存比较过滤&&结果格式化
    mailList = mailList.filter((item, index)  => {
        return filter[index] == 0;
    }).map((item) => {
        return {
            imapUid: item.uid,
            data: item.data
        }
    });

    imap.close();
    return mailList;
}
