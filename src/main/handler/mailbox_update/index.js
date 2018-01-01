module.exports = async ({request, constant}) => {
    let {id: mailboxId} = request;

    let [row] = await GB.Model.select("o_mailbox").where(GB.Model.Logic.statement("id", "=", mailboxId)).run();
    if (row == undefined) {
        throw new Error(`email:${mailboxId} is not exist`);
    }
    let {o_mailbox: mailbox} = row;

    delete request.id;
    await GB.Model.update("o_mailbox").data(request).where(GB.Model.Logic.statement("id", "=", mailboxId)).run();

    if (GB.Logic.Incubator.isExisted(mailboxId, mailbox.receiveProtocol)) {
        GB.Logic.Incubator.remove(mailbox.receiveProtocol);
    }

    if (GB.Logic.Incubator.isExisted(mailboxId, GB.Common.Constant.Protocol.STMP)) {
        GB.Logic.Incubator.remove(mailboxId, GB.Common.Constant.Protocol.STMP);
    }
}
