const Log4js = require('log4js');
const path = require('path')
Log4js.configure({
    appenders: {
        runtime: {
            type: 'dateFile',
            filename: `./logs/runtime/`,
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['runtime'], level: "ALL" },
        runtime: { appenders: ['runtime'], level: "ALL" }
    }
});

module.exports =  {
        // Config: require('../config'), 
        Model: require("smart-model-for-sqlcipher").setup(`${__dirname}/model/definition`,  `${__dirname}/model/config`),
        Electron: require('electron'),
        Path: class {
            static get Project() {
                return __dirname 
            }
            static get Data() {
                return require('electron').app.getPath("userData")
            }
            static get Resource() {
                return process.env.NODE_ENV === 'development' ?  `${__dirname}/../../static` : `${__dirname}/static`
            }
        },
        IpcSender: class {
            static send(method, data){
              mainWindow.webContents.send('method', JSON.stringify({method, data}));
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
        }
}


