process.env.NODE_ENV = "test";
require(`${__dirname}/../env`);
const fs = require("fs");
const Tester = require('@qtk/tester-framework');

class AppExecuter extends Tester.Executer {
    async init() {
        if (fs.existsSync(__dirname + '/data')) {
            fs.unlinkSync(__dirname + '/data')
        }
        await GB.Model.Toolbox.setup(`${GB.Path.Project}/model/definition`, `${GB.Path.Project}/model/config`);
    }

    async fini() {
        fs.unlinkSync(__dirname + '/data')
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