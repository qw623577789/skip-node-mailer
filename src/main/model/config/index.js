module.exports = {
	file: process.env.NODE_ENV == "test"  ? process.cwd() + "/data" : `${require('electron').app.getPath("userData")}/data`,
	// password: "123456", //不设的话,则数据库无加密
	// cipherMode: "aes-256-cbc" //password字段存在时必传
};