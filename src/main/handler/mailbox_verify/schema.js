const constant = {
    State: {
        SUCCESS: 0,
        FAILED: 1
    }
}

const request = {
    type: "object",
    properties: {
        username: GB.Common.Schema.common.email.id,
        password: {
            type: "string",
            pattern: "^(.+)$"
        },
        protocol: GB.Common.Schema.common.mailbox.protocol,
        useSSL: GB.Common.Schema.common.mailbox.useSSL,
        host: GB.Common.Schema.common.mailbox.host,
        port: GB.Common.Schema.common.mailbox.port
    },
    additionalProperties: false,
    required: ["username", "password", "protocol", "useSSL", "host", "port"],

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