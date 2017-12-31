module.exports = async (request, notifyCallback) => {
    let pop3 = await GB.Module.Pop3.getinstance({
        user: request.username,
        password: request.password,
        host: request.address,
        port: request.port,
        secure: request.useSSL == 1 ? true:false
    });

    //step1. 获取uid列表
    let mailIndexList = await pop3.index();

    //step2. 缓存比较过滤
    let filter = await Promise.all(
        mailIndexList.map((uid) => {
            let [index, pop3Uid] = uid.split(' ');
            return GB.Model.count("o_mail").where(GB.Model.Logic.statement('uniqueIdentifier', GB.Model.Ops.LIKE, `%"pop3":${pop3Uid}%`)).run()
        })
    );
    mailIndexList = mailIndexList.filter((item, index)  => {
        return filter[index] == 0;
    })

    if (mailIndexList.length == 0) {
        pop3.close();
        return [];
    }

    let processCallback = (error, uid) => {
        notifyCallback(error, mailIndexList.indexOf(uid), mailIndexList.length)
    }

    //step3. 邮件简要列表获取
    let mailList = (await pop3.list(mailIndexList, processCallback))
    .filter(item => item.state == true);

    filter = await Promise.all(
        mailList.map((item) => {
            return GB.Model.count("o_mail").where(GB.Model.Logic.statement('uniqueIdentifier', GB.Model.Ops.LIKE, `%"common":"${item.data.messageId}"%`)).run()
        })
    );

    //step4. 缓存比较过滤&&结果格式化
    mailList = mailList.filter((item, index)  => {
        return filter[index] == 0;
    }).map((item) => {
        let [index, pop3Uid] = item.uid.split(' ');
        return {
            pop3Uid: pop3Uid,
            data: item.data
        }
    });

    pop3.close();
    return mailList;
}