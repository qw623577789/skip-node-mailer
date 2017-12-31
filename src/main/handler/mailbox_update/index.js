module.exports = async ({request, constant}) => {
    let {id: mailboxId} = request;

    let isExist = await GB.Model.count("o_mailbox").where(GB.Model.Logic.statement("id", "=", mailboxId)).run();
    if (isExist == 0) {
        throw new Error(`email:${mailboxId} is not exist`);
    }

    delete request.id;
    await GB.Model.update("o_mailbox").data(request).where(GB.Model.Logic.statement("id", "=", mailboxId)).run();
}
