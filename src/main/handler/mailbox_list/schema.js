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
            }
        },
        additionalProperties: false,
        required: [
            "username", "password"
        ]
    }
}

module.exports = {request, response}