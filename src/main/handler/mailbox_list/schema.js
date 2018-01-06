const request = {}

const response = {
    type: "array",
    item: {
        type: "object",
        properties: {
            id: GB.Common.Schema.common.uuid,
            mailbox: GB.Common.Schema.model.mailbox
        },
        additionalProperties: false,
        required: [
            "mailbox", "id"
        ]
    }
}

module.exports = {request, response}