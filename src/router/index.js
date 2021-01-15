import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('../pages/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
