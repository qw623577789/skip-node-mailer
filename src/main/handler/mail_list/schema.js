const request = {
    type: "object",
    properties: {
        pageIndex: {
            type: "integer"
        },
        pageSize: {
            type: "integer"
        },
        mailboxId: {
            type: "string",
            maxLength : 32
        },
        classify: {
            type: "string",
            enum: Object.values(GB.Common.Constant.Mail.Classify)
        },
        query: {
            type: "object",
            properties: {
                timeRange: {
                    type: "object",
                    properties: {
                        start: {
                            type: "integer"
                        },
                        end: {
                            type: "integer"
                        }
                    },
                    additionalProperties: false,
                    required: ["start", "end"]
                },
                subject: {
                    type: "string"
                },
                from: {
                    type: "string"
                },
                attachmentName: {
                    type: "string"
                },
                content: {
                    type: "string"
                }
            }
        }
    },
    additionalProperties: false,
    required: ["pageIndex", "pageSize", "classify", "mailboxId"]
}

const response = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: {
                type: "string",
                length: 32
            },
            seen: {
                type: "integer",
                enum: [0 ,1]
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
            subject: {
                type: "string"
            },
            content: {
                type: "string"
            },
            hasAttachment: {
                type: "boolean",
            },
            priority: {
                type: "integer"
            },
            sendTime: {
                type: "integer"
            }
        },
        additionalProperties: false,
        required: ['id', 'seen', 'from', 'subject', 'content', 'hasAttachment', 'priority', 'sendTime']
    }
}

module.exports = {request, response}