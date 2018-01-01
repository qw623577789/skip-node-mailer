const moment = require('moment');

module.exports = async ({request}) => {
    let progressNotify = (error, index, total) => {
        if (error != null) {
            GB.Logger.Runtime.error(error);
        }

        if (GB.IsElectron == true) {
            GB.Module.IpcSender.send('mail_list_progress', {
                index, total, errorMessage: error != undefined ? error.message : undefined
            })
        }
    }

    let newMailList = [];

    let [row] = await GB.Model.select('o_mailbox').where(GB.Model.Logic.statement('id', '=', request.mailboxId)).run();
    if (row == undefined) {
        throw new Error(`mailbox:${request.mailboxId} is not existed`)
    }
    let {o_mailbox: mailbox} = row;

    //step1. 获取实例
    let instance = await GB.Logic.Incubator.get(request.mailboxId, mailbox.receiveProtocol);

    //step2. 远程比对同步
    switch (mailbox.receiveProtocol) {
        case GB.Common.Constant.Protocol.POP3:
            newMailList = (await require('./case/pop3')(instance, progressNotify))
            .map(item => pop3Parser(request.box, item));
            break;
        case GB.Common.Constant.Protocol.IMAP:
            newMailList = (await require('./case/imap')(instance, request.box, progressNotify))
            .map(item => imapParser(request.box, item));
            break;
    }

    //step2. 新邮件存储
    for (let mail of newMailList) {
        await GB.Model.insert('o_mail').data(mail).run();
        await GB.Model.insert('r_mailbox_mail').data({
            mailbox_id: request.mailboxId,
            mail_id: mail.id
        }).run();
    }

    //step3. 通知前端刷新界面
    return newMailList.length;

}

function imapParser(box, {imapUid, data}) {
    return {
        id: GB.Common.Toolbox.uuid(),
        classify: box,
        seen: data.flags.indexOf(GB.Module.Imap.SIGN.Seen) != -1 ? 1 : 0, 
        uniqueIdentifier: JSON.stringify({
            common: data.messageId,
            imap: imapUid
        }),
        from: JSON.stringify(addressesTranslater(data.from.value)),
        to: JSON.stringify(addressesTranslater(data.to.value)),
        cc: data.cc == undefined ? "" : JSON.stringify(addressesTranslater(data.cc.value)),
        bc: data.bc == undefined ? "" : JSON.stringify(addressesTranslater(data.bc.value)),
        subject: data.subject,
        priority: priorityTranslater(data.headers.get('priority')),
        sendTime: moment(data.date).format('X'),
        attachments: JSON.stringify({
            has: data.headers.get('content-type').value.indexOf('multipart/mixed') != -1
        })
    }
}

function pop3Parser(box, {pop3Uid, data}) {
    return {
        id: GB.Common.Toolbox.uuid(),
        classify: box,
        seen: 0, 
        uniqueIdentifier: JSON.stringify({
            common: data.messageId,
            pop3: pop3Uid
        }),
        from: JSON.stringify(addressesTranslater(data.from)),
        to: JSON.stringify(addressesTranslater(data.to)),
        cc: data.cc == undefined ? "" : JSON.stringify(addressesTranslater(data.cc)),
        bc: data.bc == undefined ? "" : JSON.stringify(addressesTranslater(data.bc)),
        subject: data.subject,
        priority: priorityTranslater(data.priority),
        sendTime: moment(data.date).format('X'),
        attachments: JSON.stringify({
            has: data.headers['content-type'].indexOf('multipart/mixed') != -1
        })
    }
}

function addressesTranslater(addresses) {
    return addresses.map((address) => {
        return {
            name: address.name,
            address: address.address
        }
    })   
}

function priorityTranslater(priority) {
    switch (priority) {
        case 'low':
            return GB.Common.Constant.Mail.Priority.LOW;
        case 'normal':
            return GB.Common.Constant.Mail.Priority.NORMAL;
        case 'high':
            return GB.Common.Constant.Mail.Priority.HIGH;
        default:
            return GB.Common.Constant.Mail.Priority.LOW;
    }
}