module.exports = async ({request, constant}) => {
    let isExist = await GB.Model.count("mailbox").where(GB.Model.Logic.statement("username", "=", request.username)).run()
    if (isExist != 0) {
        return constant.ResponseState.HAD_EXISTED;
    }

    await GB.Model.insert("mailbox").data(request).run();
    return constant.ResponseState.SUCCESS;
}
