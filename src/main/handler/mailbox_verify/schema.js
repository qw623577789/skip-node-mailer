const constant = {
    State: {
        SUCCESS: 0,
        FAILED: 1
    }
}

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
        protocol: {
            type: "integer",
            enum: Object.values(GB.Common.Constant.Protocol)
        },
        useSSL: {
            type: "integer",
            enum: [0, 1]
        },
        address: {
            type: "string",
            pattern: "^(.+)$"
        },
        port: {
            type: "integer",
            default: 0
        }
    },
    additionalProperties: false,
    required: ["username", "password", "protocol", "useSSL", "address", "port"],

}

const response = {
    type: "object",
    properties: {
        state: {
            type: "integer",
            enum: [0, 1]
        },
        message: {
            type: "string",
            pattern: "[\s\S]*"
        }
    },
    additionalProperties: false,
    required: ["state"]

}

module.exports = {constant, request, response}