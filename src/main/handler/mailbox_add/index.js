module.exports = async ({request, constant}) => {
    let isExist = await GB.Model.count("o_mailbox").where(GB.Model.Logic.statement("username", "=", request.username)).run()
    if (isExist != 0) {
        return {
            state: constant.ResponseState.HAD_EXISTED
        }
    }

    request.id = GB.Common.Toolbox.uuid();
    await GB.Model.insert("o_mailbox").data(request).run();
    return {
        state: constant.ResponseState.SUCCESS,
        mailboxId: request.id
    }
}
