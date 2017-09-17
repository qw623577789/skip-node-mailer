import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import {ipcRenderer} from 'electron'
import {customIpcRenderer} from './utils/ipcSender.js'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

//暴露公共方法到全局
Vue.http = Vue.prototype.$http = axios
Vue.prototype.ipcSender = customIpcRenderer


//监听与分发来自主线程信号
ipcRenderer.on('method', function (event, args){    console.log(args)
  let queryData = JSON.parse(args);
  try {

    let handler = require(`${__dirname}/handler/${queryData.method}`);
    handler.default(queryData.data);
  }
  catch(err){
    console.log(err.message)
  }
})
// 

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')



