import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      component : require('@/views/home')
    },
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage')
    // },
    // {
    //   path: '*',
    //   redirect: '/home'
    // }
  ]
})
