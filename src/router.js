import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
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
      redirect: '/admin/home',
      children: [
        { path: 'login', component: () => import('./views/admin/login.vue') },
        { path: 'home',
          component: () => import('./views/admin/home.vue'),
          meta: { requireAuth: true } // 添加该字段，表示进入这个路由是需要登录的
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.token) {
      next({
        path: 'admin/login',
        query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
