const constant = {
    ResponseState: {
        SUCCESS: 0
    }
}

const request = {
    type: "string",
    pattern: "^(.+)@(.+)$"
}

const response = {
    type: "integer",
    enum: Object.values(constant.ResponseState)
}

module.exports = {constant, request, response}