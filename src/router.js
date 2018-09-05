import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/visitor/Main.vue'),
      redirect: '/home',
      children: [
        { path: 'home',
          component: () => import('./views/visitor/Home.vue'),
          meta: { keepAlive: true }
        },
        { path: 'about', component: () => import('./views/visitor/About.vue') }
      ]
    },
    {
      path: '/admin',
      component: () => import('./views/admin/Admin.vue'),
      redirect: '/admin/login',
      children: [
        { path: 'login', component: () => import('./views/admin/login.vue') }
      ]
    }
  ]
})
