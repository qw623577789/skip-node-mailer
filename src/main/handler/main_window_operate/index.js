export default async (request) => {
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

            GB.Logger.Runtime.info("ssssssss")
            //await GB.Model.insert('user').data({name:'ray', id: '1003'}).run()
            GB.IpcSender.send("test", {
                "sss" : "sssssss"
            })
            break;
        case "close":
            GB.Electron.app.quit();
            break;
        default :
            throw new Error(`can not deal the request ${request}`);
    }
}