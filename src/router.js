import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

// 页面刷新时，重新赋值
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
  if (window.sessionStorage.getItem('saveBlogListMutation')) {
    store.commit('saveBlogListMutation', JSON.parse(window.sessionStorage.getItem('saveBlogListMutation')))
  }
  if (window.sessionStorage.getItem('chooseBlog')) {
    store.commit('chooseBlog', JSON.parse(window.sessionStorage.getItem('chooseBlog')))
  }
  if (window.sessionStorage.getItem('saveFilterBlogList')) {
    store.commit('saveFilterBlogList', JSON.parse(window.sessionStorage.getItem('saveFilterBlogList')))
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
      meta: { requireAuth: true }, // 添加requireAuth，表示进入这个路由是需要登录的，在父路由添加，则下面的子路由都需要验证
      children: [
        { path: 'home', component: () => import('./views/admin/home.vue') },
        { path: 'user', component: () => import('./views/admin/user.vue') },
        { path: 'manage-blog', component: () => import('./views/admin/manage-blog.vue') },
        { path: 'view-blog', component: () => import('./views/visitor/Blog.vue') },
        { name: 'edit-blog', path: 'edit-blog', component: () => import('./views/admin/edit-blog.vue') }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // to.matched可以拿到父路由，所以可以直接判断父路由的权限。子路由可以无需添加。
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
  window.scrollTo(0, 0)
})

export default router
