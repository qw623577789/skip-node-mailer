const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = class {

	static resolveSchema(schemaFile) {
		let schema = null;
		try {
			schema = require(schemaFile);
		}
		catch(err) {
			throw new Error(`failed to load schemaFile(${schemaFile}), detail message: ${err.message}`);
		}
		if ((typeof schema.request !== 'object') 
			|| (typeof schema.response !== 'object') ) {
			throw new Error(`bad format of schemaFile(${schemaFile}), expecting request/response/info to be objects.`);
		}
		return schema;
	}
	
	static validateSchema(module, instance, schema) {
		if (ajv.validate(schema[module], instance)) {
			return;
		}

		throw new Error(`invalid ${module}\n instance:${JSON.stringify(instance)}\nschema:${JSON.stringify(schema[module])}\n${ajv.errorsText()}`);
	}
}

