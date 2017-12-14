const constant = {
    ResponseState: {
        SUCCESS: 0,
        HAD_EXISTED: 1
    }
}

const request = {
    type: "object",
    properties: {
        username: {
            type: "string",
            pattern: "^(.+)@(.+)$",
            maxLength : 32
        },
        password: {
            type: "string",
            pattern: "^(.+)$",
            maxLength : 32
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
            pattern: "^(.+)$",
            maxLength : 32
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
            pattern: "^(.+)$",
            maxLength : 32
        },
        postServerPort: {
            type: "integer",
            default: 0
        }
    },
    additionalProperties: false,
    required: [
        "username", "password", "receiveState", "receiveProtocol", "receiveUseSSL",
        "receiveServerAddress", "receiveServerPort", "postState", "postUseSSL",
        "postServerAddress", "postServerPort"
    ]
}

const response = {
    type: "integer",
    enum: Object.values(constant.ResponseState)
}

module.exports = {constant, request, response}