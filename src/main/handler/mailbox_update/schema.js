const request = {
    type: "object",
    properties: {
        id: GB.Common.Schema.common.uuid,
        mailbox: GB.Common.Schema.model.mailbox
    },
    additionalProperties: false,
    required: ["id", 'mailbox']
}

const response = {}

module.exports = {request, response}