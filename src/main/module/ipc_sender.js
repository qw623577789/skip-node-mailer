module.exports = class {
    static send(method, data){
        GB.Window.webContents.send('method', JSON.stringify({method, data}));
      }
}