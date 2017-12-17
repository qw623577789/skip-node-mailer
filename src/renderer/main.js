import Vue from 'vue'

import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import config from './config'
import elementUI from 'element-ui'
import editer from 'vueditor'
import 'vueditor/dist/style/vueditor.min.css'

import {IpcSender} from './utils/ipcSender.js'
import {IpcListener} from './utils/ipcListener.js'

Vue.use(elementUI)
Vue.use(editer, config.vueditor);
Vue.use(require('vue-electron'))

//暴露公共方法到VUE全局
Vue.prototype.http = axios
Vue.prototype.ipcSender = IpcSender
Vue.prototype.ipcMethod = require('../share/ipc_method.json')

//处理来自主进程事件
IpcListener.handle((method, data) => {
  let handler = require(`${__dirname}/ipc_handler/${method}`);
  handler.default(data);
})


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')



