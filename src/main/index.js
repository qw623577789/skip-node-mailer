require("./env");
import "reflect-metadata";

GB.Electron.app.on('ready', async ()=>{
  await initData();
  createWindow();
  createTray();
})

GB.Electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    GB.Electron.app.quit()
  }
})

GB.Electron.app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
})

GB.Electron.ipcMain.on('method', async (event, args)=>{
  let handler = await require(`${__dirname}/handler`);
  event.returnValue = JSON.stringify(await handler.default(args));
})

async function initData() {
  const fs = require("fs");
  if (!fs.existsSync(`${GB.Path.Data}/data`)) {
    await GB.Model.Toolbox.setup(`${GB.Path.Project}/model/definition`, `${GB.Path.Project}/model/config`);
  }
}

function createWindow () {
  GB.Window = new GB.Electron.BrowserWindow({
    height: 900,
    width: 1200,
    minHeight: 900,
    minWidth: 1200,
    useContentSize: true,
    center : true,
    frame : false,
    icon : `${GB.Path.Resource}/icon.png`,
    title : "deepin-mail"
  });

  GB.Electron.Menu.setApplicationMenu(null);
  let winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`
  GB.Window.loadURL(winURL)
  GB.Window.on('closed', () => {})
  console.log(GB.Common.Constant.IpcMethod.WINDOW_OPERATE)
}

function createTray(){
  GB.Tray = new GB.Electron.Tray(`${GB.Path.Resource}/icon.png`);
  let contextMenu = GB.Electron.Menu.buildFromTemplate([
    {
      label: '显示主窗口', 
      click: ()=>{
        GB.Electron.app.quit();
      }
    },
    {
      label: '写新邮件', 
      click: ()=>{
        GB.Electron.app.quit();
      }
    },
    {
      label: '系统设置', 
      click: ()=>{
        GB.Electron.app.quit();
      }
    },
    {
      label: '退出程序', 
      click: ()=>{
        GB.Electron.app.quit();
      }
    }
  ]);
  GB.Tray.setContextMenu(contextMenu);
  GB.Tray.on('double-click',function(){
    GB.Window.show();
  })
}
