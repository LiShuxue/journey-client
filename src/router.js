import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./views/visitor/Main.vue'),
      redirect: '/one',
      children: [
        { path: '/one', name: 'one', component: () => import('./views/visitor/One.vue') },
        { path: '/home', name: 'home', component: () => import('./views/visitor/Home.vue'), meta: { keepAlive: true } },
        { path: '/category', name: 'category', component: () => import('./views/visitor/Category.vue') },
        { path: '/about', name: 'about', component: () => import('./views/visitor/About.vue') },
        { path: '/blog/:id', name: 'blog', component: () => import('./views/visitor/Blog.vue') },
        { path: '/bloglist', name: 'bloglist', component: () => import('./views/visitor/BlogList.vue') }
      ]
    },
    { path: '/loginlsx', component: () => import('./views/admin/login.vue') },
    {
      path: '/admin',
      component: () => import('./views/admin/Admin.vue'),
      redirect: '/admin/edit-blog',
      meta: { requireAuth: true }, // 添加requireAuth，表示进入这个路由是需要登录的，在父路由添加，则下面的子路由都需要验证
      children: [
        { path: '/admin/user', name: 'user', component: () => import('./views/admin/user.vue') },
        {
          path: '/admin/manage-blog',
          name: 'manage-blog',
          component: () => import('./views/admin/manage-blog.vue')
        },
        { path: '/admin/view-blog', name: 'view-blog', component: () => import('./views/visitor/Blog.vue') },
        { path: '/admin/edit-blog', name: 'edit-blog', component: () => import('./views/admin/edit-blog.vue') },
        { path: '/admin/upload-file', name: 'upload-file', component: () => import('./views/admin/upload-file.vue') }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    // to.matched可以拿到父路由，所以可以直接判断父路由的权限。子路由可以无需添加。
    if (store.state.access_token) {
      next();
    } else {
      next({
        path: '/loginlsx',
        query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
      });
    }
  } else {
    next();
  }
  window.scrollTo(0, 0);
});

export default router;
