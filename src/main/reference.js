const Log4js = require('log4js');
Log4js.configure({
    appenders: {
        runtime: {
            type: 'dateFile',
            filename: `${__dirname}/logs/runtime/`,
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['runtime'], level: "ALL" },
        runtime: { appenders: ['runtime'], level: "ALL" }
    }
});

export default {
        // Config: require('../config'), 
        Model: require("smart-model-for-sqlcipher").setup(`${__dirname}/model/definition`, `${__dirname}/model/config`),
        Electron: require('electron'),
        IpcSender: class {
            static send(method, data){
              mainWindow.webContents.send('method', JSON.stringify({method, data}));
            }
        },
        Logger: {
            Runtime: Log4js.getLogger('runtime')
        },
        Common: class {
            // static get Toolbox() {return require('./common/toolbox')}
            // static get Constant() {return require('./common/constant')}
        },
        Lib: class {
            static get Imap() {return require('./lib/imap')}
            static get Pop3() {return require('./lib/pop3')}
            static get Smtp() {return require('./lib/smtp')}
        }
}


