import {app} from 'electron'

export default async (request)=>{
    switch(request) {
        case "minimize":
            if (!mainWindow.isMinimized()) {
                mainWindow.minimize();
            }
            break;
        case "maximize":
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            } else {
                mainWindow.maximize();
            }
            IpcSender.send("test", {
                "sss" : "sssssss"
            })
            break;
        case "close":
            app.quit();
            break;
        default :
            throw new Error(`can not deal the request ${request}`);
    }
}