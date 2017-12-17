module.exports = async (args) => {
    let queryData = JSON.parse(args);
    try {
      const schema = require(`${__dirname}/${queryData.method}/schema.js`);
      GB.Module.SchemaValidater.validateSchema("request", queryData.data, schema);
      const handler = require(`${__dirname}/${queryData.method}`);
      if(queryData.mode == "async") {      
        //异步返回值模式
        handler({request: queryData.data,　constant: schema.constant}).then((response) => {
          GB.Module.SchemaValidater.validateSchema("response", response, schema);
          if (response != undefined) {
            GB.Module.IpcSender.send(queryData.method, response);
          }
        }).catch((error) => {
          GB.Logger.Runtime.error(error);
        });
        return {status: 0};
      }
      else {
        //同步返回值模式
        const response = await handler({
          request: queryData.data,
          constant: schema.constant
        });
        GB.Module.SchemaValidater.validateSchema("response", response, schema);
        return {status: 0, payload: response}
      }
    }
    catch(error) {
        console.log(error)
        GB.Logger.Runtime.error(error);
        return {status: -1}
    }
}