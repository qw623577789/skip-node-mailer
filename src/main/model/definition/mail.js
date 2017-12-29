module.exports = {
	id: {
		type: "string",
		length: 32,
		default: "",
		index: "unique"
	},
	classify: {
		type: "integer",
		default: 0
	},
	seen: {
		type: "integer",
		default: 0
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
