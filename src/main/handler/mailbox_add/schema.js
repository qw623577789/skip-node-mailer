const constant = {
    ResponseState: {
        SUCCESS: 0,
        HAD_EXISTED: 1
    }
}

const request = GB.Common.Schema.model.mailbox;

const response = {
    type: "object",
    switch: [
        {
            if: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.ResponseState.SUCCESS]
                    }
                }
            },
            then: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.ResponseState.SUCCESS]
                    },
                    mailboxId: {
                        type: "string",
                        length: 32
                    }
                },
                additionalProperties: false,
                required: ['state', 'mailboxId']
            }
        },
        {
            if: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.ResponseState.HAD_EXISTED]
                    }
                }
            },
            then: {
                properties: {
                    state: {
                        type: "integer",
                        enum: [constant.ResponseState.HAD_EXISTED]
                    }
                },
                additionalProperties: false,
                required: ['state']
            }
        }
    ]
}

module.exports = {constant, request, response}