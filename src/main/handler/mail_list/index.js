module.exports = async ({request}) => {
    let condition = [
        GB.Model.Logic.statement('r_mailbox_mail.mailbox_id', '=', request.mailboxId),
        GB.Model.Logic.statement('o_mail.classify', '=', request.classify)
    ]

    if (request.query != undefined &&  request.query.timeRange != undefined) {
        condition.push(GB.Model.Logic.and([
            GB.Model.Logic.statement('o_mail.sendTime', '>=', request.query.timeRange.start),
            GB.Model.Logic.statement('o_mail.sendTime', '<=', request.query.timeRange.end)
        ]))
    }
    else if (request.query != undefined &&  request.query.subject != undefined) {
        condition.push(GB.Model.Logic.statement('o_mail.subject', 'like', `%${request.query.subject}%`))
    }
    else if (request.query != undefined &&  request.query.from != undefined) {
        condition.push(GB.Model.Logic.or([
            GB.Model.Logic.statement('o_mail.from', 'like', `%"name":"%${request.query.from}%","address":"%`),
            GB.Model.Logic.statement('o_mail.from', 'like', `%"name":"%","address":"%${request.query.from}%"%`)
        ]))
    }
    else if (request.query != undefined &&  request.query.attachmentName != undefined) {
        condition.push(GB.Model.Logic.statement('o_mail.attachments', 'like', `%"filename":"%${request.query.attachmentName}%","md5":"%"%`))
    }
    else if (request.query != undefined &&  request.query.content != undefined) {
        condition.push(GB.Model.Logic.statement('o_mail.content', 'like', `%"html":"%","text":"%${request.query.content}%"%`))
    }

    let mails = await GB.Model.select("r_mailbox_mail").join('o_mail', 'left', 'r_mailbox_mail.mail_id', 'o_mail.id').where(
        GB.Model.Logic.and(condition)
    )
    .range(request.pageIndex *  request.pageSize, request.pageSize)
    .sort('sendTime', 'DESC')
    .run();

    return mails.map(({o_mail: mail}) => {
        let attachment = JSON.parse(mail.attachments);
        return {
            id: mail.id,
            intro: {
                from: JSON.parse(mail.from),
                seen: mail.seen,
                priority: mail.priority,
                subject: mail.subject,
                hasAttachment: attachment.has,
                sendTime: mail.sendTime,
                content: mail.content
            }
        }
    });
}
