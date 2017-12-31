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
    required: ["id", "username", "password", "protocol", "useSSL", "address", "port"]
}

const response = {
    type: "object",
    properties: {
        id: {
            type: "string",
            length: 32
        },
        classify: {
            type: "string",
            length: 20
        },
        seen: {
            type: "integer",
            enum: [0 ,1]
        },
        uniqueIdentifier: {
            type: "string"
        },
        from: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ["name", "address"]
            }
        },
        to: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ["name", "address"]
            }
        },
        bc: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ["name", "address"]
            }
        },
        cc: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ["name", "address"]
            }
        },
        subject: {
            type: "string"
        },
        content: {
            type: "string"
        },
        attachments: {
            type: "obejct",
            properties: {
                has: {
                    type: "boolean"
                },
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            contentType: {
                                type: "string"
                            },
                            filename: {
                                type: "string"
                            },
                            md5: {
                                type: "string",
                                length: 32
                            },
                            size: {
                                type: "integer"
                            },
                            cacheName: {
                                type: "string"
                            }
                        },
                        additionalProperties: false,
                        required: ["contentType", "filename", "md5", "size", "cacheName"]
                    }
                }
            },
            additionalProperties: false,
            required: ['has']
        },
        priority: {
            type: "integer"
        },
        sendTime: {
            type: "integer"
        }
    },
    additionalProperties: false,
    required: ['id', 'classify', 'seen', 'uniqueIdentifier', 'from', 'to', 'subject', 'content', 'attachments', 'priority', 'sendTime']
}

module.exports = {request, response}