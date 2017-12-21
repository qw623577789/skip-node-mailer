module.exports = {
    Method: {
        POST: 1,
        RECEIVE: 2
    },
    ReceiveProtocol: {
        POP3: 1,
        IMAP: 2
    },
    PostProtocol: {
        STMP: 1
    },
    IpcMethod: require("../../../share/ipc_method.json")
}