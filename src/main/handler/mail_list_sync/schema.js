const request = {
    type: "object",
    switch: [
        {
            if: {
                protocol: {
                    type: "integer",
                    enum: [GB.Common.Constant.ReceiveProtocol.IMAP]
                }
            },
            then: {
                properties: {
                    box: {
                        type: "string",
                        enum: Object.values(GB.Common.Constant.Mail.Classify)
                    },
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
                        enum: [GB.Common.Constant.ReceiveProtocol.IMAP]
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
                required: ["box", "username", "password", "protocol", "useSSL", "address", "port"]
            }
        },
        {
            if: {
                protocol: {
                    type: "integer",
                    enum: [GB.Common.Constant.ReceiveProtocol.POP3]
                }
            },
            then: {
                properties: {
                    box: {
                        type: "string",
                        enum: [GB.Common.Constant.Mail.Classify.INBOX]
                    },
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
                        enum: [GB.Common.Constant.ReceiveProtocol.POP3]
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
                required: ["box", "username", "password", "protocol", "useSSL", "address", "port"]
            }
        }
    ]

}

const response = {
}

module.exports = {request, response}