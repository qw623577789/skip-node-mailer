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
    Mail: {
        Classify: {
            INBOX: 'INBOX',
            OUTBOX: 'OUTBOX',
            DRAFT_BOX: 2,
            DELETED_BOX: 3
        },
        Priority: {
            LOW: 0,
            NORMAL: 1,
            HIGH: 2
        }
    },

    IpcMethod: require("../../../share/ipc_method.json")
}