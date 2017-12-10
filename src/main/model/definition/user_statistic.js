module.exports = {
	id: {
		type: "string",
		length: 32,
		default: "",
		index: "unique"
	},
	name: {
		type: "string",
		length: 20,
		default: ""
	},
	logins: {
		type: "integer",
		default: 0
	},
	logouts: {
		type: "integer",
		default: 0
	}
}
