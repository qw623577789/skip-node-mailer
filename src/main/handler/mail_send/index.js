const path = require("path");

module.exports = async ({constant, request}) => {
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
        html: request.content,
        'reply-to':,
        inReplyTo:
        references: 
        attachments: request.attachments == undefined ? undefined : request.attachments.map((filePath) => {
            return {
                filename: path.basename(filePath),
                path: filePath,
                cid: GB.Common.Toolbox.uuid()
            }
        })
    }

    console.log(email)

    let sendResult = null;
    try {
        sendResult = await instance.send(email);
    }
    catch (error) {
        console.log(error)
        return {
            state: constant.SendState.FAILED,
            message: error.message
        }
    }
    
    console.log(sendResult)
    //存入已发送箱

    return {
        state: constant.SendState.SUCCESS
    }
    
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

function saveToLocal(serverMessageId, box, from, to, cc, bc, subject, content, priority, attachments) {
    return {
        id: GB.Common.Toolbox.uuid(),
        classify: box,
        seen: 1, 
        uniqueIdentifier: JSON.stringify({
            common: serverMessageId
        }),
        from: JSON.stringify([from]),
        to: JSON.stringify(data.to),
        cc: data.cc == undefined ? "" : JSON.stringify(cc),
        bc: data.bc == undefined ? "" : JSON.stringify(bc),
        subject: subject,
        priority: priority,
        sendTime: GB.Common.Toolbox.timeNow(),
        attachments: JSON.stringify({
            has: attachments != undefined
        })
    }
}