

const fs = require('fs');

module.exports = async ({request}) => {
    //本地缓存查找
    let [{mail}] = await GB.Model.select("o_mail").where(
        GB.Model.Logic.statement('id', '=', request.id)
    ).run();

    //若需要，从远程拉取
    if (mail.content == "") {
        let rawMail = null;
        let localMail = null;
        switch (request.protocol) {
            case GB.Common.Constant.ReceiveProtocol.POP3:
                let pop3 = await GB.Module.Pop3.getinstance({
                    user: request.username,
                    password: request.password,
                    host: request.address,
                    port: request.port,
                    secure: request.useSSL == 1 ? true:false
                });
                let {popUid} = JSON.parse(mail.uniqueIdentifier);
                let lastestPopUidInfo = (await pop3.index())
                .find((item) => {
                    let [index, lastestPopUid] = item.split(' ');
                    return lastestPopUid == popUid;
                })
                rawMail = await pop3.getDetail(mail.classify, lastestPopUidInfo.split(' ')[0]);
                localMail = pop3Parser(rawMail);
                break;
            case GB.Common.Constant.ReceiveProtocol.IMAP:
                let imap = await GB.Module.Imap.getinstance({
                    user: request.username,
                    password: request.password,
                    host: request.address,
                    port: request.port,
                    secure: request.useSSL == 1 ? true:false
                });
                let {imapUid} = JSON.parse(mail.uniqueIdentifier);
                rawMail = await imap.getDetail(mail.classify, imapUid);
                localMail = imapParser(rawMail);
                break;
        }
        
        await GB.Model.update('o_mail').data({
            content: localMail.content,
            attachments: JSON.stringify(localMail.attachments),
        }).where(
            GB.Model.Logic.statement('id', '=', request.id)
        ).run();

        mail.content = localMail.content;
        mail.attachments =  localMail.attachments;
    }

    //mail对象反序列化
    mail.from = JSON.parse(mail.from);
    mail.to = JSON.parse(mail.to);
    if (mail.bc == undefined) {
        delete mail.bc;
    }
    else {
        mail.bc = JSON.parse(mail.bc)
    }

    if (mail.cc == undefined) {
        delete mail.cc;
    }
    else {
        mail.cc = JSON.parse(mail.cc)
    }

    mail.attachments = mail.attachments instanceof Object ? mail.attachments : JSON.parse(mail.attachments);
    return mail;
}

function imapParser(data) {
    return {
        content: data.html,
        attachments: {
            has: data.headers.get('content-type').value.indexOf('multipart/mixed') != -1,
            items: data.attachments.length == 0 ? undefined : data.attachments.map((attachment) => {
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
    }
}

function pop3Parser(data) {
    return {
        content: data.html,
        attachments: {
            has: data.headers.get('content-type').value.indexOf('multipart/mixed') != -1,
            items: data.attachments.length == 0 ? undefined : data.attachments.map((attachment) => {
                let cacheName = GB.Common.Toolbox.uuid();
                fs.writeFileSync(GB.Path.Data + "/attachments/" + cacheName, attachment.content);
                return {
                    contentType: attachment.contentType,
                    filename: attachment.filename,
                    md5: attachment.checksum,
                    size: attachment.length,
                    cacheName: cacheName
                }
            })
        }
    }
}