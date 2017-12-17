import { ipcRenderer } from 'electron';

export class IpcListener {
    static handle(callback) {
        ipcRenderer.on('method', function (event, args) {    
            console.log("get:" + JSON.stringify(args));
            let queryData = JSON.parse(args);
            if (callback != undefined) {
                callback(queryData.method, queryData.data);
            }
        })
    }
}
