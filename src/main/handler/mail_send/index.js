const path = require("path");

module.exports = async ({request}) => {
    let [{o_mailbox: mailbox}] = await GB.Model.select('o_mailbox').where(
        GB.Model.Logic.statement('id', '=', request.mailboxId)
    );

    let instance = await GB.Logic.Incubator.get(request.mailboxId, GB.Common.Constant.Protocol.STMP);

    let email = {
        from: {
            name: request.from.name,
            address: request.from.address
        },
        to: request.to.map((item) => {
            return {
                name: item.name,
                address: item.address
            }
        }),
        bc: request.bc == undefined ? undefined : request.bc.map((item) => {
            return {
                name: item.name,
                address: item.address
            }
        }),
        cc: request.cc == undefined ? undefined : request.cc.map((item) => {
            return {
                name: item.name,
                address: item.address
            }
        }),
        priority: toRemotePriority(request.priority),
        notificationTo: request.needReply == true ? {
            name: request.from.name,
            address: request.from.address
        } : undefined,
        subject: request.subject,
        html: request.html,
        attachments: request.attachments == undefined ? undefined : request.attachments.map((item) => {
            return {
                filename: path.basename(item.path),
                path: item.path,
                cid: GB.Common.Toolbox.uuid()
            }
        })
    }

    console.log(email)
}

function toRemotePriority(priority) {
    switch (priority) {
        case GB.Common.Constant.Mail.Priority.NORMAL:
            return GB.Module.Smtp.Priority.NORMAL;
        case GB.Common.Constant.Mail.Priority.LOW:
            return GB.Module.Smtp.Priority.LOW;
        case GB.Common.Constant.Mail.Priority.HIGH:
            return GB.Module.Smtp.Priority.HIGH;
    }
}