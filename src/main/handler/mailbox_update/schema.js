const request = {
    type: "object",
    properties: {
        id: {
            type: "string",
            length: 32
        },
        username: {
            type: "string",
            pattern: "^(.+)@(.+)$"
        },
        password: {
            type: "string",
            pattern: "^(.+)$"
        },
        receiveState: {
            type: "integer",
            enum: [0, 1]
        },
        receiveProtocol: {
            type: "integer",
            description: "收信协议",
            enum: [GB.Common.Constant.Protocol.IMAP, GB.Common.Constant.Protocol.POP3]
        },
        receiveUseSSL: {
            type: "integer",
            enum: [0, 1]
        },
        receiveServerAddress: {
            type: "string",
            pattern: "^(.+)$"
        },
        receiveServerPort: {
            type: "integer",
            default: 0
        },
        postState: {
            type: "integer",
            enum: [0, 1]
        },
        postUseSSL: {
            type: "integer",
            enum: [0, 1]
        },
        postServerAddress: {
            type: "string",
            pattern: "^(.+)$"
        },
        postServerPort: {
            type: "integer",
            default: 0
        }
    },
    additionalProperties: false,
    required: [
        "id"
    ]
}

const response = {}

module.exports = {request, response}