const GlobalConstant = require('../constant');
 
module.exports = {
    uuid: {
        type: "string",
        pattern: "^[a-fA-F0-9]{32}$"
    },
    timestamp: {
        type: "integer",
        minimum: 0
    },
    email: {
        id: {
            type: "string",
            pattern: "^(.+)@(.+)$"
        },
        priority: {
            type: "integer",
            enum: Object.values(GlobalConstant.Mail.Priority)
        },
        classify: {
            type: "string",
            enum: Object.values(GlobalConstant.Mail.Classify)
        },
    },
    mailbox: {
        protocol: {
            type: "integer",
            enum: Object.values(GlobalConstant.Protocol)
        },
        useSSL: {
            type: "integer",
            enum: [0, 1]
        },
        host: {
            type: "string",
            pattern: "^(.+)$"
        },
        port: {
            type: "integer",
            default: 0
        }
    }
};