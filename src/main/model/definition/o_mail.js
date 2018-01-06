module.exports = {
	id: {
		type: "string",
		length: 32,
		default: "",
		index: "unique"
	},
	classify: {
		type: "string",
		length: 20,
		default: "",
	},
	seen: {
		type: "integer",
		default: 0
	},
	headers: {
		type: "string",
		default: ""
	},
	uniqueIdentifier: {
		type: "string",
		default: ""
	},
	from: {
		type: "string",
		default: ""
	},
	to: {
		type: "string",
		default: ""
	},
	cc: {
		type: "string",
		default: ""
	},
	bc: {
		type: "string",
		default: ""
	},
	subject: {
		type: "string",
		default: ""
	},
	content: {
		type: "string",
		default: ""
	},
	attachments: {
		type: "string",
		default: ""
	},
	priority: {
		type: "integer",
		default: 0
	},
	sendTime: {
		type: "integer",
		default: 0
	}
}
