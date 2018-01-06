const constant = {
    SendState: {
        SUCCESS: 0,
        FAILED: 1
    }
}

const request = {
    type: "object",
    properties: {
        mailboxId: GB.Common.Schema.common.uuid,
        from: GB.Common.Schema.model.address,
        to: {
            type: "array",
            items: GB.Common.Schema.model.address,
        },
        bc: {
            type: "array",
            items: GB.Common.Schema.model.address,
        },
        cc: {
            type: "array",
            items: GB.Common.Schema.model.address,
        },
        subject: {
            type: "string",
            pattern: "^(.+)$"
        },
        content: {
            type: "string"
        },
        attachments: {
            type: "array",
            path: {
                type: "string"
            }
        },
        priority: GB.Common.Schema.common.email.priority,
        needReply: {
            type: "boolean"
        }
    },
    additionalProperties: false,
    required: ['mailboxId', 'from', 'to', 'priority']
}

const response = {
    type: "object",
    switch: [
        {
            if: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.SendState.SUCCESS]
                    }
                }
            },
            then: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.SendState.SUCCESS]
                    }
                },
                additionalProperties: false,
                required: ['state']
            }
        },
        {
            if: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.SendState.FAILED]
                    }
                }
            },
            then: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.SendState.FAILED]
                    },
                    message: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ['state', 'message']
            }
        }
    ]

}
module.exports = {constant, request, response}