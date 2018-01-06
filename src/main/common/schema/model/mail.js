const Schema = require('../common');
const SchemaAddress = require('./address');
const Constant = require('../../constant');

module.exports = {
    type: "object",
    properties: {
        classify: Schema.email.classify,
        headers: {
            type: "object"
        },
        seen: {
            type: "integer",
            enum: [0 ,1]
        },
        uniqueIdentifier: {
            type: "object",
            properties: {
                common: {
                    type: "string"
                },
                pop3: {
                    type: "string"
                },
                imap: {
                    type: "integer"
                }
            },
            additionalProperties: false,
            required: ['common']
        },
        from: {
            type: "array",
            items: SchemaAddress
        },
        to: {
            type: "array",
            items: SchemaAddress
        },
        bc: {
            type: "array",
            items: SchemaAddress
        },
        cc: {
            type: "array",
            items: SchemaAddress
        },
        subject: {
            type: "string"
        },
        content: {
            type: "string"
        },
        attachments: {
            type: "object",
            properties: {
                has: {
                    type: "boolean"
                },
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            contentType: {
                                type: "string"
                            },
                            filename: {
                                type: "string"
                            },
                            md5: {
                                type: "string",
                                length: 32
                            },
                            size: {
                                type: "integer"
                            },
                            cacheName: {
                                type: "string"
                            }
                        },
                        additionalProperties: false,
                        required: ["contentType", "filename", "md5", "size", "cacheName"]
                    }
                }
            },
            additionalProperties: false,
            required: ['has']
        },
        priority: Schema.email.priority,
        sendTime: Schema.timestamp
    },
    additionalProperties: false,
    required: ['classify', 'headers', 'seen', 'uniqueIdentifier', 'from', 'to', 'subject', 'content', 'attachments', 'priority', 'sendTime']
}