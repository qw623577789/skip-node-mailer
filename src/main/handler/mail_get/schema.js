const request = GB.Common.Schema.common.uuid

const response = {
    type: "object",
    properties: {
        id: GB.Common.Schema.common.uuid,
        mail: GB.Common.Schema.model.mail,
        fromCache: {
            type: "boolean"
        }
    },
    additionalProperties: false,
    required: ['id', 'mail', 'fromCache']
}

module.exports = {request, response}