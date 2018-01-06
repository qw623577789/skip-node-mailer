const request = {
    type: "object",
    properties: {
        pageIndex: {
            type: "integer"
        },
        pageSize: {
            type: "integer"
        },
        mailboxId: GB.Common.Schema.common.uuid,
        classify: GB.Common.Schema.common.email.classify,
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
            id: GB.Common.Schema.common.uuid,
            intro: {
                properties: {
                    seen: {
                        type: "integer",
                        enum: [0 ,1]
                    },
                    from: {
                        type: "array",
                        items: GB.Common.Schema.model.address
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
                    priority: GB.Common.Schema.common.email.priority,
                    sendTime: GB.Common.Schema.common.timestamp
                },
                additionalProperties: false,
                required: ['seen', 'from', 'subject', 'content', 'hasAttachment', 'priority', 'sendTime']
            }
        },
        additionalProperties: false,
        required: ['id', 'intro']
    }
}

module.exports = {request, response}