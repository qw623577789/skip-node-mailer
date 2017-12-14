module.exports = async ({request, constant}) => {
    let isExist = await GB.Model.count("mailbox").where(GB.Model.Logic.statement("username", "=", request.username))
    if (isExist) {
        return ResponseState.HAD_EXISTED;
    }

    await GB.Model.insert("mailbox").data(request);
    return constant.ResponseState.SUCCESS;
}
