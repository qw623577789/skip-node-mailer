require("./env");
import { app, BrowserWindow, Menu,Tray, MenuItem, ipcMain } from 'electron'
import "reflect-metadata";

global.windowManager = [];

app.on('ready', ()=>{
  createWindow();
  createTray();
  handleMessage();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
})


function createWindow () {
  global.mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    minHeight: 900,
    minWidth: 1200,
    useContentSize: true,
    center : true,
    frame : false,
    icon : `${staticResourcePath}/icon.png`,
    title : "deepin-mail"
  });

  Menu.setApplicationMenu(null);
  let winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`
  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {})
}

function createTray(){
  global.tray = new Tray(`${staticResourcePath}/icon.png`);
  let contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主窗口', 
      click: ()=>{
        app.quit();
      }
    },
    {
      label: '写新邮件', 
      click: ()=>{
        app.quit();
      }
    },
    {
      label: '系统设置', 
      click: ()=>{
        app.quit();
      }
    },
    {
      label: '退出程序', 
      click: ()=>{
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on('double-click',function(){
        mainWindow.show();
  })
}

function handleMessage(){
  ipcMain.on('method', async (event, args)=>{
    let handler = await require(`${__dirname}/handler`);
    event.returnValue = JSON.stringify(await handler.default(args));
  })
}