const Pop = require('node-poplib-gowhich').Client;
const EventEmitter = require('events').EventEmitter;

module.exports = class Pop3 extends EventEmitter{
    constructor(pop){
        this._pop = pop;
    }

    static async getinstance({
        user,
        password,
        host,
        port,
        secure = true, //使用安全传输协议
        debug = false
    }) {
        let pop = new Pop({
            hostname: host,
            port:  port,
            tls: secure,
            mailparser: true,
            username: user,
            password: password,
            debug : debug
          });

          await this._connect(pop);
          
          let instance = new Pop3(pop);instance.
          pop.disconnect(() => {instance.emit('diconnect')})
          return instance;
    }

    close() {
        this._pop.quit();
    }

    get isOnline() {
        return this._pop.connected
    }

    async  index() {
        let that = this;
        return await new Promise((resolve, reject) => {
            that._pop.uidl(function(err, data) {
                if(err != null) return reject(err);
                return resolve(data);
            });
        }).then(function (data) {
            return data;
        }).catch((err)=>{
            throw new Error(err);
        });
    }

    async  getDetail(uid) {
        let that = this;
        return await new Promise((resolve, reject) => {
            that._pop.retr(uid,function(err, data) {
                if (err !== null) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }).then((data)=>{
            return data;
        })
    }

    async  list(uidList, callback) {
        let that = this;
        let outgoing  = [];        
        for(let uid of uidList) {
            await new Promise((resolve, reject) => {
                that._pop.top(uid, 0,function(err, data) {
                    //console.log(data)
                    if (err !== null) {
                        outgoing.push({
                            uid,
                            state : false
                        });
                        if (callback != undefined) callback(err, uid);
                    } else {
                        outgoing.push({
                            uid,
                            state : true,
                            data : data
                        });
                        if (callback != undefined) callback(null, uid);
                    }
                    return resolve();
                });
            })
        }
        return outgoing;
    }

    async  delete(uid) {
        let that = this;
        return await new Promise((resolve, reject) => {
            that._pop.dele(uid,function(err, data) {
                if (err !== null) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        }).then((data)=>{
            return data;
        })
    }

    static async  _connect(pop){
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

