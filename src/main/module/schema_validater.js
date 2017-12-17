const Ajv = require('ajv');
const path = require("path");
const ajv = new Ajv();

module.exports = class {
	static validateSchema(module, instance, schema) {
		if (ajv.validate(schema[module], instance)) {
			return;
		}

		throw new Error(`invalid ${module}\n instance:${JSON.stringify(instance)}\nschema:${JSON.stringify(schema[module])}\n${ajv.errorsText()}`);
	}
}

