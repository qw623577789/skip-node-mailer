module.exports = async ({request, constant}) => {
    let isExist = await GB.Model.count("o_mailbox").where(GB.Model.Logic.statement("username", "=", request.username)).run()
    if (isExist != 0) {
        return {
            state: constant.ResponseState.HAD_EXISTED
        }
    }

    let mailbox = {
        id: GB.Common.Toolbox.uuid(),
        username: request.username,
        password: request.password
    }

    mailbox.postState = request.post.state;
    mailbox.receiveState = request.receive.state;

    if (request.post.state == 1) {
        mailbox.postUseSSL = request.post.useSSL;
        mailbox.postServerHost = request.post.serverHost;
        mailbox.postServerPort = request.post.serverPort;
    }

    if (request.receive.state == 1) {
        mailbox.receiveUseSSL = request.receive.useSSL;
        mailbox.receiveProtocol = request.receive.protocol;
        mailbox.receiveServerHost = request.receive.serverHost;
        mailbox.receiveServerPort = request.receive.serverPort;
    }

    await GB.Model.insert("o_mailbox").data(mailbox).run();
    return {
        state: constant.ResponseState.SUCCESS,
        mailboxId: mailbox.id
    }
}
