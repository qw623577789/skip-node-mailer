const Log4js = require('log4js');
const path = require('path');

Log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        runtime: {
            type: 'dateFile',
            filename: process.env.NODE_ENV == "test" ? process.cwd() + '/logs/runtime/' : `${require('electron').app.getPath("userData")}`,
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['runtime'], level: "ALL" },
        runtime: { appenders: ['runtime', 'out'], level: "ALL" }
    }
});

module.exports =  {
        // Config: require('../config'), 
        IsElectron: process.env.NODE_ENV != "test",
        Model: require("smart-model-for-sqlcipher").setup(`${__dirname}/model/definition`,  `${__dirname}/model/config`),
        Window: global.Window,
        Tray: global.Tray,
        Electron: require('electron'),
        Path: class {
            static get Project() {
                return __dirname 
            }
            static get Data() {
                switch (process.env.NODE_ENV) {
                    case 'development':
                        return require('electron').app.getPath("userData")
                    case 'test':
                        return process.cwd()
                    default:
                        return require('electron').app.getPath("userData")
                }
            }
            static get Resource() {
                switch (process.env.NODE_ENV) {
                    case 'development':
                        return `${__dirname}/../../static`;
                    case 'test':
                        return process.cwd()
                    default:
                        return `${__dirname}/static`
                }
            }
        },
        Logger: {
            Runtime: Log4js.getLogger('runtime')
        },
        Common: class {
            static get Toolbox() {return require('./common/toolbox')}
            static get Constant() {return require('./common/constant')}
        },
        Module: class {
            static get Imap() {return require('./module/imap')}
            static get Pop3() {return require('./module/pop3')}
            static get Smtp() {return require('./module/smtp')}
            static get SchemaValidater() {return require('./module/schema_validater')}
            static get IpcSender() {return require('./module/ipc_sender')}
        }
}


