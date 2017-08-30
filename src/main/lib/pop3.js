const Pop = require('node-poplib-gowhich').Client;
const fs = require("fs")

module.exports = class {
    constructor({
        user,
        password,
        host,
        port,
        secure = true, //使用安全传输协议
    }){
        this._user = user;
        this._password = password;
        this._host = host;
        this._port = port;
        this._secure = secure;
    }

    async  list() {
        let pop = await this._connect();
        return await new Promise((resolve, reject) => {
            pop.uidl(function(err, data) {
                if(err != null) return reject(err);
                return resolve(data);
            });
        }).then(function (data) {
            pop.quit();
            return data;
        }).catch((err)=>{
            pop.quit();
            throw new Error(err);
        });
    }

    async  getDetail(uid) {
        let pop = await this._connect();
        return await new Promise((resolve, reject) => {
            pop.retr(uid,function(err, data) {
                if (err !== null) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }).then((data)=>{
            pop.quit();
            return data;
        })
    }

    async  get(uidList, callback) {
        let pop = await this._connect();
        let outgoing  = [];
        for(let uid of uidList) {
            await new Promise((resolve, reject) => {
                pop.top(uid, 0,function(err, data) {
                    if (err !== null) {
                        outgoing.push({
                            uid,
                            state : false
                        });
                        callback(err, uid);
                    } else {
                        outgoing.push({
                            uid,
                            state : true,
                            data : data
                        });
                        callback(null, uid);
                    }
                    return resolve();
                });
            })
        }
        pop.quit();
        return outgoing;
    }

    async  delete(uid) {
        let pop = await this._connect();
        return await new Promise((resolve, reject) => {
            pop.dele(uid,function(err, data) {
                if (err !== null) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }).then((data)=>{
            pop.quit();
            return data;
        })
    }

    async _connect(){
        let that = this;
        let pop = new Pop({
            hostname: this._host,
            port:  this._port,
            tls: this._secure,
            mailparser: true,
            username: this._user,
            password: this._password,
            debug : true
          });

        return new Promise((resolve, reject) => {
            pop.connect(function(err) {
                if(err != null) {
                    return reject(err);
                }
                else{
                    return resolve(pop);
                }
              })
        })
    }


}

