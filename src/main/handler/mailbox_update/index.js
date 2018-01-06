module.exports = async ({request, constant}) => {

    let [row] = await GB.Model.select("o_mailbox").where(GB.Model.Logic.statement("id", "=", request.id)).run();
    if (row == undefined) {
        throw new Error(`email:${request.id} is not exist`);
    }
    let {o_mailbox: mailbox} = row;

    for (let key in request.mailbox) {
        if (key == 'receive') {
            mailbox.receiveState = request.mailbox.receive.state;
            if (request.mailbox.receive.state == 1) {
                mailbox.receiveUseSSL = request.mailbox.receive.useSSL;
                mailbox.receiveProtocol = request.mailbox.receive.protocol;
                mailbox.receiveServerHost = request.mailbox.receive.serverHost;
                mailbox.receiveServerPort = request.mailbox.receive.serverPort;
            }
            else {
                mailbox.receiveUseSSL = 0;
                mailbox.receiveProtocol = 0;
                mailbox.receiveServerHost = "";
                mailbox.receiveServerPort = 0;
            }
        }
        else if (key == 'post') {
            mailbox.postState = request.mailbox.receive.state;
            if (request.mailbox.post.state == 1) {
                mailbox.postUseSSL = request.mailbox.post.useSSL;
                mailbox.postServerHost = request.mailbox.post.serverHost;
                mailbox.postServerPort = request.mailbox.post.serverPort;
            }
            else {
                mailbox.postUseSSL = 0;
                mailbox.postServerHost = "";
                mailbox.postServerPort = 0;
            }
        }
        else {
            mailbox[key] = request.mailbox[key];
        }
    }

    await GB.Model.update("o_mailbox").data(mailbox).where(GB.Model.Logic.statement("id", "=", request.id)).run();

    if (GB.Logic.Incubator.isExisted(request.id, mailbox.receiveProtocol)) {
        GB.Logic.Incubator.remove(mailbox.receiveProtocol);
    }

    if (GB.Logic.Incubator.isExisted(request.id, GB.Common.Constant.Protocol.STMP)) {
        GB.Logic.Incubator.remove(request.id, GB.Common.Constant.Protocol.STMP);
    }
}
