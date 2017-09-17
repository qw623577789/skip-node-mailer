import { app, BrowserWindow, Menu,Tray, MenuItem, ipcMain } from 'electron';
const path = require('path')

app.on('ready', ()=>{
  initEnv();
  createWindow();
  createTray();
  handleMessage();
  createIpcSender();
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

function initEnv() {
  //定义静态资源目录
  if (process.env.NODE_ENV === 'development') {
    global.staticResourcePath = require('path').join(__dirname, '/../../static').replace(/\\/g, '\\\\')
  }
  else {
    global.staticResourcePath = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
  }
}

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
      label: '关闭', 
      click: ()=>{
        app.quit();
      }
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.on('double-click',function(){
        mainWindow.show();
  })
}

function handleMessage(){
  ipcMain.on('method', async (event, args)=>{
    let queryData = JSON.parse(args);
    try {
      let handler = require(`${__dirname}/handler/${queryData.method}`);

      if(queryData.mode == "async") {      //异步返回值模式
        handler.default(queryData.data);
        event.returnValue = "";
      }
      else {      //同步返回值模式
        event.returnValue = await handler.default(queryData.data);
      }
    }
    catch(err){
      console.log(err.stack)
    }
  })
}

function createIpcSender(){
  global.IpcSender = class {
    static send(method, data){
      mainWindow.webContents.send('method', JSON.stringify({method, data}));
    }
  }
}