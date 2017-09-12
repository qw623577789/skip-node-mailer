import { ipcRenderer } from 'electron';

export class customIpcRenderer {
    static send(method, data) {
        ipcRenderer.send("method", JSON.stringify({
            mode : "async", method, data
        }));
    }

    static sendSync(method, data) {
        return ipcRenderer.sendSync("method", JSON.stringify({
            mode : "sync", method, data
        }));
    }
}
