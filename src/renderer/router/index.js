import Vue from 'vue'
import Router from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      component : require('@/views/home')
    },
    {
      path: '/systemConfig',
      component: require('@/views/systemConfig')
    }
    // {
    //   path: '*',
    //   redirect: '/home'
    // }
  ]
})
