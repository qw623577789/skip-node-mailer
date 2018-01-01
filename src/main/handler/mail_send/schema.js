const request = {
    type: "object",
    properties: {
        from: {
            type: "object",
            properties: {
                name: {
                    type: "string"
                },
                address: {
                    type: "string"
                }
            },
            additionalProperties: false,
            required: ["name", "address"]
        },
        to: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ["name", "address"]
            }
        },
        bc: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ["name", "address"]
            }
        },
        cc: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    }
                },
                additionalProperties: false,
                required: ["name", "address"]
            }
        },
        subject: {
            type: "string",
            pattern: "^(.+)$"
        },
        content: {
            type: "string"
        },
        attachments: {
            type: "array",
            items: {
                type: "string"
            }
        },
        priority: {
            type: "integer"
        }
    },
    additionalProperties: false,
    required: ['from', 'to', 'priority']
}

module.exports = {request, response}