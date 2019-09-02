import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

// 页面刷新时，重新赋值token 和 username
if (window.sessionStorage) {
  if (window.sessionStorage.getItem('access_token')) {
    store.commit('saveAccessTokenMutation', window.sessionStorage.getItem('access_token'))
  }
  if (window.sessionStorage.getItem('refresh_token')) {
    store.commit('saveRefreshTokenMutation', window.sessionStorage.getItem('refresh_token'))
  }
  if (window.sessionStorage.getItem('username')) {
    store.commit('saveUsernameMutation', window.sessionStorage.getItem('username'))
  }
}

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('./views/visitor/Main.vue'),
      redirect: '/home',
      children: [
        { path: 'home', name: 'home', component: () => import('./views/visitor/Home.vue'), meta: { keepAlive: true } },
        { path: 'category', name: 'category', component: () => import('./views/visitor/Category.vue') },
        { path: 'about', name: 'about', component: () => import('./views/visitor/About.vue') },
        { path: 'blog', name: 'blog', component: () => import('./views/visitor/Blog.vue') },
        { path: 'bloglist', name: 'bloglist', component: () => import('./views/visitor/BlogList.vue') }
      ]
    },
    { path: '/login', component: () => import('./views/admin/login.vue') },
    {
      path: '/admin',
      component: () => import('./views/admin/Admin.vue'),
      redirect: '/admin/home',
      children: [
        { path: 'home', component: () => import('./views/admin/home.vue'), meta: { requireAuth: true } }, // 添加requireAuth，表示进入这个路由是需要登录的
        { path: 'user', component: () => import('./views/admin/user.vue'), meta: { requireAuth: true } },
        { path: 'manage-blog', component: () => import('./views/admin/manage-blog.vue'), meta: { requireAuth: true } },
        { path: 'view-blog', component: () => import('./views/visitor/Blog.vue') },
        { name: 'edit-blog', path: 'edit-blog', component: () => import('./views/admin/edit-blog.vue'), meta: { requireAuth: true } }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.access_token || sessionStorage.getItem('access_token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
      })
    }
  } else {
    next()
  }
})

export default router
