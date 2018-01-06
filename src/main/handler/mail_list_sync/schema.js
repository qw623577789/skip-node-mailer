const request = {
    type: "object",
    properties: {
        box: GB.Common.Schema.common.email.classify,
        mailboxId: GB.Common.Schema.common.uuid
    },
    additionalProperties: false,
    required: ["box", "mailboxId"]
}

const response = {}

module.exports = {request, response}