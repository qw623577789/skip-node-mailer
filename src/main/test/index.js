process.env.NODE_ENV = "test";
require(`${__dirname}/../env`);
const fs = require("fs");
const fsx = require('fs-extra');
const walk = require('klaw-sync');
const path = require('path');
const Tester = require('@qtk/tester-framework');

class AppExecuter extends Tester.Executer {
    async init() {
        //清除历史数据
        fsx.removeSync(__dirname + '/test_data_dir');
        fsx.ensureDirSync(__dirname + '/test_data_dir');

        //建库建表
        await GB.Model.Toolbox.setup(`${GB.Path.Project}/model/definition`, `${GB.Path.Project}/model/config`);

        //初始化数据
        let modelsDataConfig = walk(`${__dirname}/init/db/`, {
            nodir: true
        })
        .map((item) => {
            return {
                dbName : item.path.replace(`${__dirname}/init/db/`, '').replace(/\.js/, ''),
                path: item.path
            }
        });

        for (let modelDataConfig of modelsDataConfig) {
            let modelData = require(modelDataConfig.path);
            for (let data of modelData) {
                await GB.Model.insert(modelDataConfig.dbName).data(data).run()
            }
        }

        // //拷贝文件
        // fsx.copySync(`${__dirname}/init/file`, `${__dirname}/test_data_dir/attachments`)
    }

    async fini() {
        //fs.removeSync(__dirname + '/data');
    }

    async send(name, request, context) {
        let handler = await require(`${__dirname}/../handler`);
        let query = {
            mode: "sync",
            method: name,
            data: request
        }
        let response = await handler(JSON.stringify(query));
        if (response.status !== -1) {
            return {error: undefined, response: response.payload};
        }
        else {
            return {error: new Error('internal server error')};
        }
    }
}

Tester.setup('./scenario', new AppExecuter());
(async () => await Tester.run())().catch(err => {
    console.error(err.stack);
    process.exit(-1);
});