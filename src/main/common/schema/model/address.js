const Schema = require('../common');

module.exports = {
    type: "object",
    properties: {
        name: {
            type: "string"
        },
        address: Schema.email.id
    },
    additionalProperties: false,
    required: ["name", "address"]
}