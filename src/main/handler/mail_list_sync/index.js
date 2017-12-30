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

    //step1. 远程比对同步
    switch (request.protocol) {
        case GB.Common.Constant.ReceiveProtocol.POP3:
            newMailList = (await require('./case/pop3')(request, progressNotify))
            .map(item => pop3Parser(request.box, item));
            break;
        case GB.Common.Constant.ReceiveProtocol.IMAP:
            newMailList = (await require('./case/imap')(request, progressNotify))
            .map(item => imapParser(request.box, item));
            break;
    }

    //step2. 新邮件存储
    for (let mail of newMailList) {
        await GB.Model.insert('mail').data(mail).run();
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