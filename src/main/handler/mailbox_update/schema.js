const request = {
    type: "object",
    properties: {
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
            enum: Object.values(GB.Common.Constant.ReceiveProtocol)
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
        "username"
    ]
}

const response = {}

module.exports = {request, response}