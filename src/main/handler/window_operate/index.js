module.exports = async ({request}) => {
    switch(request) {
        case "minimize":
            !GB.Window.isMinimized() & GB.Window.minimize();
            break;
        case "maximize":
            GB.Window.isMaximized() ?  GB.Window.unmaximize() :  GB.Window.maximize();

            // GB.Logger.Runtime.info("ssssssss")
            // //await GB.Model.insert('user').data({name:'ray', id: '1003'}).run()
            // GB.Module.IpcSender.send("test", {
            //     "sss" : "sssssss"
            // })
            break;
        case "close":
            GB.Electron.app.quit();
            break;
    }
}