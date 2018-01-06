

const fs = require('fs');

module.exports = async ({request: mailId}) => {
    let fromCache = true;
    //本地缓存查找
    let [{o_mail: mail}] = await GB.Model.select("o_mail").where(
        GB.Model.Logic.statement('id', '=', mailId)
    ).run();

    //若需要，从远程拉取
    if (mail.content == "") {
        fromCache = false;
        let rawMail = null;
        let localMail = null;
        let [{r_mailbox_mail: {mailbox_id: mailboxId}}] = await GB.Model.select('r_mailbox_mail').where(
            GB.Model.Logic.statement('mail_id', '=', mailId)
        ).run();

        let [{o_mailbox: mailbox}] = await  GB.Model.select('o_mailbox').where(GB.Model.Logic.statement('id', '=', mailboxId)).run();

        let mailboxInstance = await GB.Logic.Incubator.get(mailboxId, mailbox.receiveProtocol);
        switch (mailbox.receiveProtocol) {
            case GB.Common.Constant.Protocol.POP3:
                let {pop3: popUid} = JSON.parse(mail.uniqueIdentifier);
                let lastestPopUidInfo = (await mailboxInstance.index())
                .find((item) => {
                    let [index, lastestPopUid] = item.split(' ');
                    return lastestPopUid == popUid;
                })

                rawMail = await mailboxInstance.getDetail(lastestPopUidInfo.split(' ')[0]);
                localMail = pop3Parser(rawMail);
                break;
            case GB.Common.Constant.Protocol.IMAP:
                let {imap: imapUid} = JSON.parse(mail.uniqueIdentifier);
                rawMail = await mailboxInstance.getDetail(mail.classify, imapUid);
                localMail = imapParser(rawMail);
                break;
        }
        
        await GB.Model.update('o_mail').data({
            content: localMail.content,
            attachments: JSON.stringify(localMail.attachments),
        }).where(
            GB.Model.Logic.statement('id', '=', mailId)
        ).run();

        mail.content = localMail.content;
        mail.attachments =  localMail.attachments;
    }

    //mail对象反序列化
    mail.from = JSON.parse(mail.from);
    mail.to = JSON.parse(mail.to);
    mail.uniqueIdentifier = JSON.parse(mail.uniqueIdentifier);
    mail.headers = JSON.parse(mail.headers);
    if (mail.bc == '') {
        delete mail.bc;
    }
    else {
        mail.bc = JSON.parse(mail.bc)
    }

    if (mail.cc == '') {
        delete mail.cc;
    }
    else {
        mail.cc = JSON.parse(mail.cc)
    }

    mail.attachments = mail.attachments instanceof Object ? mail.attachments : JSON.parse(mail.attachments);
    delete mail.id;

    return {id: mailId, mail, fromCache};
}

function imapParser(data) {
    let parseData =  {
        content: data.html,
        attachments: {
            has: data.headers.get('content-type').value.indexOf('multipart/mixed') != -1
        }
    }

    if (data.attachments.length != 0 ) {
        parseData.attachments.items = data.attachments.map((attachment) => {
            let cacheName = GB.Common.Toolbox.uuid();
            fs.writeFileSync(GB.Path.Data + "/attachments/" + cacheName, attachment.content);
            return {
                contentType: attachment.contentType,
                filename: attachment.filename,
                md5: attachment.checksum,
                size: attachment.size,
                cacheName: cacheName
            }
        })
    }
    
    return parseData;
}

function pop3Parser(data) {
    let parseData =  {
        content: data.html,
        attachments: {
            has: data.headers['content-type'].indexOf('multipart/mixed') != -1
        }
    }

    if (data.attachments != undefined) {
        parseData.attachments.items = data.attachments.map((attachment) => {
            let cacheName = GB.Common.Toolbox.uuid();
            fs.writeFileSync(GB.Path.Data + "/attachments/" + cacheName, attachment.content);
            return {
                contentType: attachment.contentType,
                filename: attachment.fileName,
                md5: attachment.checksum,
                size: attachment.length,
                cacheName: cacheName
            }
        })
    }
    return parseData;
}