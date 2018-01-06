import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/inbox',
      component : require('@/views/inbox')
    },
    {
      path : '/outbox',
      component : require('@/views/outbox')
    },
    {
      path : '/draftbox',
      component : require('@/views/draftbox')
    },
    {
      path : '/deletebox',
      component : require('@/views/deletebox')
    },
    {
      path: '*',
      redirect: '/inbox'
    }
  ]
})
