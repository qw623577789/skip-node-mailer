module.exports = {
	id: {
		type: "string",
		length: 32,
		default: "",
		index: "unique"
	},
	amount: {
		type: "integer",
		default: 0
	},
	userId: {
		type: "string",
		length: 32,
		default: ""
	}
}
