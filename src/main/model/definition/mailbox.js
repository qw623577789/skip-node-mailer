module.exports = {
	username: {
		type: "string",
		length: 32,
		default: "",
		index: "unique"
	},
	password: {
		type: "string",
		length: 32,
		default: ""
	},
	receiveState: {
		type: "integer",
		default: 0
	},
	receiveProtocol: {
		type: "integer",
		default: 0
	},
	receiveUseSSL: {
		type: "integer",
		default: 0
	},
	receiveServerAddress: {
		type: "string",
		length: 32,
		default: ""
	},
	receiveServerPort: {
		type: "integer",
		default: 0
	},
	postState: {
		type: "integer",
		default: 0
	},
	postUseSSL: {
		type: "integer",
		default: 0
	},
	postServerAddress: {
		type: "string",
		length: 32,
		default: ""
	},
	postServerPort: {
		type: "integer",
		default: 0
	}
}
