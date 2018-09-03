import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Main.vue'),
      redirect: '/home',
      children: [
        { path: 'home',
          component: () => import('./views/Home.vue'),
          meta: { keepAlive: true }
        },
        { path: 'about', component: () => import('./views/About.vue') }
      ]
    },
    {
      path: '/admin',
      component: () => import('./sever/Admin.vue'),
      redirect: '/admin/login',
      children: [
        { path: 'login', component: () => import('./sever/login.vue') }
      ]
    }
  ]
})
