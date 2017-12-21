const request = {
    type: "object",
    switch: [
        {
            if: {
                properties: {
                    method: {
                        type: "integer",
                        enum: [GB.Common.Constant.Method.POST]
                    }
                }
            },
            then: {
                properties: {
                    method: {
                        type: "integer",
                        enum: [GB.Common.Constant.Method.POST]
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
                        enum: Object.values(GB.Common.Constant.PostProtocol)
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
                required: ["method", "username", "password", "protocol", "useSSL", "address", "port"],
            }
        },
        {
            if: {
                properties: {
                    method: {
                        type: "integer",
                        enum: [GB.Common.Constant.Method.RECEIVE]
                    }
                }
            },
            then: {
                properties: {
                    method: {
                        type: "integer",
                        enum: [GB.Common.Constant.Method.RECEIVE]
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
                        enum: Object.values(GB.Common.Constant.ReceiveProtocol)
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
                required: ["method", "username", "password", "protocol", "useSSL", "address", "port"],
            }
        }
    ]
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

module.exports = {request, response}