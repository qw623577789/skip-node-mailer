export default async (args) => {
  console.log(args);
    let queryData = JSON.parse(args);
    try {
      //const schema = GB.Module.SchemaValidater.resolveSchema(`${__dirname}/${queryData.method}/schema`);
      //GB.Module.SchemaValidater.validateSchema("request", queryData.data, schema);
      const handler = require(`${__dirname}/${queryData.method}`);
      await handler(queryData.data);
      /*
      if(queryData.mode == "async") {      
        //异步返回值模式
        handler.default(queryData.data).then((repsonse) => {
          //GB.Module.SchemaValidater.validateSchema("response", response, schema);
          GB.IpcSender.send(queryData.method, response);
        }).catch((error) => {
          GB.Logger.Runtime.error(error);
        });
        return {status: 0};
      }
      else {
        //同步返回值模式
        const repsonse = await handler(queryData.data);
        GB.Module.SchemaValidater.validateSchema("response", repsonse, schema);
        return {status: 0, payload: response}
      }*/
    }
    catch(error) {
        GB.Logger.Runtime.error(error);
        return {status: -1}
    }
}