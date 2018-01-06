module.exports = async ({request}) => {
    let mailboxs = await GB.Model.select("o_mailbox").run();
    if (mailboxs == undefined) mailboxs = [];
    return mailboxs.map(({o_mailbox: item})=>{
        let mailbox = {
            username: item.username,
            password: item.password
        }

        if (item.receiveState == 1) {
            mailbox.receive = {
                state: item.receiveState,
                useSSL: item.receiveUseSSL,
                protocol: item.receiveProtocol,
                serverHost: item.receiveServerHost,
                serverPort: item.receiveServerPort
            }
        }
        else {
            mailbox.receive = {
                state: item.receiveState
            }
        }

        if (item.postState == 1) {
            mailbox.post = {
                state: item.postState,
                useSSL: item.postUseSSL,
                serverHost: item.postServerHost,
                serverPort: item.postServerPort
            }
        }
        else {
            mailbox.post = {
                state: item.postState
            }
        }
        
        return {
            id: item.id,
            mailbox: mailbox
        }
    })
}
