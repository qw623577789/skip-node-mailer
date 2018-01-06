import { ipcRenderer } from 'electron';

export class IpcSender {
    static send(method, data) {
        ipcRenderer.send("method", JSON.stringify({
            mode : "async", method, data
        }));
    }

    static sendSync(method, data) {
        let {status, payload} = JSON.parse(ipcRenderer.sendSync("method", JSON.stringify({
            mode : "sync", method, data
        })));

        if (status != 0) throw new Error('server error');
        return payload;
    }
}
