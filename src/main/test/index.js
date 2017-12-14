require(`${__dirname}/../env`);
const Tester = require('@qtk/tester-framework');

class AppExecuter extends Tester.Executer {
    async init() {

    }

    async fini() {

    }

    async send(name, request, context) {
        console.log(name)
        console.log(request)
        console.log(context)
        let handler = await require(`${__dirname}/../handler`);
        let query = {
            mode: "sync",
            method: name,
            data: request
        }
        let response = await handler.default(JSON.stringify(query));
        if (response.status !== -1) {
            return {error: undefined, response: response.playload};
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