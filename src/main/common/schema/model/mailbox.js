const Schema = require('../common');
const Constant = require('../../constant');

module.exports = {
    type: "object",
    properties: {
        username: Schema.email.id,
        password: {
            type: "string",
            pattern: "^(.+)$",
            maxLength : 32
        },
        receive: {
            type: "object",
            switch : [
                {
                    if: {
                        properties: {
                            state: {
                                type: "integer",
                                enum: [0]
                            }
                        }
                    },
                    then: {
                        state: {
                            type: "integer",
                            enum: [0]
                        },
                        additionalProperties: false,
                        required: ['state']
                    }
                },
                {
                    if: {
                        properties: {
                            state: {
                                type: "integer",
                                enum: [1]
                            }
                        }
                    },
                    then: {
                        properties: {
                            state: {
                                type: "integer",
                                enum: [1]
                            },
                            protocol: {
                                type: "integer",
                                description: "收信协议",
                                enum: [Constant.Protocol.IMAP, Constant.Protocol.POP3]
                            },
                            useSSL: Schema.mailbox.useSSL,
                            serverHost: Schema.mailbox.host,
                            serverPort: Schema.mailbox.port
                        },
                        additionalProperties: false,
                        required: ['state', 'protocol', 'useSSL', 'serverHost', 'serverPort']
                    }
                }
            ]
        },
        post: {
            type: "object",
            switch : [
                {
                    if: {
                        properties: {
                            state: {
                                type: "integer",
                                enum: [0]
                            }
                        }
                    },
                    then: {
                        properties: {
                            state: {
                                type: "integer",
                                enum: [0]
                            }
                        },
                        additionalProperties: false,
                        required: ['state']
                    }
                },
                {
                    if: {
                        properties: {
                            state: {
                                type: "integer",
                                enum: [1]
                            }
                        }
                    },
                    then: {
                        properties: {
                            state: {
                                type: "integer",
                                enum: [1]
                            },
                            useSSL: Schema.mailbox.useSSL,
                            serverHost: Schema.mailbox.host,
                            serverPort: Schema.mailbox.port
                        },
                        additionalProperties: false,
                        required: ['state', 'useSSL', 'serverHost', 'serverPort']
                    }
                }
            ]
        }
    },
    additionalProperties: false,
    required: [ "username", "password", "receive", "post"]
}