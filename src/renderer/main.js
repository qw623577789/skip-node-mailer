import Vue from 'vue'
import Vueditor from 'vueditor'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import elementUI from 'element-ui'

import 'vueditor/dist/style/vueditor.min.css'
//import vueEditor from 'vueditor/dist/language/lang.cn.js'
import emoji from 'vueditor/dist/plugins/emoji.min.js'
import {ipcRenderer} from 'electron'
import {customIpcRenderer} from './utils/ipcSender.js'

Vue.use(elementUI)
Vue.use(Vueditor, {
  toolbar: [
    'removeFormat', 'undo', 'redo', '|', 'fontName', 'fontSize', 'foreColor', 'backColor', '|', 'bold', 'italic', 'underline', 'strikeThrough',
    'link', 'unLink', '|', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'table'
  ],
  lang : {
    app: {},
  
    removeFormat: {title: '清除格式'},
  
    bold: {title: '加粗'},
    italic: {title: '斜体'},
    underline: {title: '下划线'},
    strikeThrough: {title: '中划线'},
  
    superscript: {title: '上标'},
    subscript: {title: '下标'},
    indent: {title: '增加缩进'},
    outdent: {title: '减少缩进'},
  
    justifyLeft: {title: '左对齐'},
    justifyCenter: {title: '居中对齐'},
    justifyRight: {title: '右对齐'},
    justifyFull: {title: '两端对齐'},
  
    insertOrderedList: {title: '插入有序列表'},
    insertUnorderedList: {title: '插入无序列表'},
  
    foreColor: {
      title: '文字颜色',
      ok: '确定',
      colorCode: '颜色代码',
      invalidColorCodeMsg: '请输入正确的颜色代码。',
    },
    backColor: {
      title: '背景颜色',
      ok: '确定',
      colorCode: '颜色代码',
      invalidColorCodeMsg: '请输入正确的颜色代码。',
    },
    fontName: {},
    fontSize: {},
    format: {},
    design: {
      ieMsg: '在IE浏览器中必须选中一段文字才能使用此功能！'
    },
    link: {
      title: '添加超链接',
      ok: '确定'
    },
    unLink: {
      title: '取消超链接'
    },
    markdown: {
      title: 'markdown'
    },
    picture: {
      title: '插入图片',
      ok: '确定',
      cancel: '取消',
      invalidFile: '未选择图片或选择的文件并非图片!'
    },
    sourceCode: {
      title: '源码'
    },
    fullscreen: {
      title: '全屏'
    },
    table: {title: '表格'},
    undo: {title: '撤销'},
    redo: {title: '恢复'}
  },
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
  plugins: {
    emoji: {
      type: 'btn',
      lang: {
        title: '插入表情'
      },
      element: {
        title: '插入表情',
        className: 'icon-smile-o'
      },
      component: emoji
    }
  },
  uploadUrl: ''
});

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



