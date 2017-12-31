const request = {}

const response = {
    type: "array",
    item: {
        type: "object",
        properties: {
            username: {
                type: "string",
                pattern: "^(.+)@(.+)$"
            },
            password: {
                type: "string",
                pattern: "^(.+)$",
                maxLength : 32
            },
            id: {
                type: "string",
                maxLength : 32
            }
        },
        additionalProperties: false,
        required: [
            "username", "password", "id"
        ]
    }
}

module.exports = {request, response}