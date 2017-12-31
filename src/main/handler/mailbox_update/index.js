module.exports = async ({request, constant}) => {
    let {username} = request;

    let isExist = await GB.Model.count("o_mailbox").where(GB.Model.Logic.statement("username", "=", username)).run();
    if (isExist == 0) {
        throw new Error(`email:${username} is not exist`);
    }

    delete request.username;
    await GB.Model.update("o_mailbox").data(request).where(GB.Model.Logic.statement("username", "=", username)).run();
}
