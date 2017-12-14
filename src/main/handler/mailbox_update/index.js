export default async ({request, constant}) => {
    let {username} = request;

    let isExist = await GB.Model.count("mailbox").where(GB.Model.Logic.statement("username", "=", username))
    if (isExist) {
        return ResponseState.HAD_EXISTED;
    }

    delete request.username;
    await GB.Model.update("mail_box").data(request).where(GB.Model.Logic.statement("username", "=", username));
    return constant.ResponseState.SUCCESS;
}
