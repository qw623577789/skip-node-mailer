const request = {
    type: "object",
    properties: {
        box: {
            type: "string",
            enum: Object.values(GB.Common.Constant.Mail.Classify)
        },
        mailboxId: {
            type: "string",
            length: 32
        }
    },
    additionalProperties: false,
    required: ["box", "mailboxId"]
}

const response = {
}

module.exports = {request, response}