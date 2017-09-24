import {app, BrowserWindow, Menu} from 'electron'

export default async (request)=>{
    console.log("wwwwwwww")
    switch(request) {
        case "show":
            windowManager['system-config'] = new BrowserWindow({
                height: 300,
                width: 400,
                minHeight: 300,
                minWidth: 400,
                useContentSize: true,
                center : true,
                frame : false,
                parent : mainWindow,
                modal: true,
                icon : `${staticResourcePath}/icon.png`,
                title : "deepin-mail"
              });
            
              Menu.setApplicationMenu(null);
              let winURL = `file://${__dirname}/index.html`;
              windowManager['system-config'].loadURL(winURL);
              windowManager['system-config'].on('closed', () => {})
            break;
        case "close":
            delete windowManager['system-config'];
            break;
        default :
            throw new Error(`can not deal the request ${request}`);
    }
}