import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./views/Main.vue'),
      redirect: '/one',
      children: [
        { path: '/one', name: 'one', component: () => import('./views/One.vue') },
        { path: '/home', name: 'home', component: () => import('./views/Home.vue'), meta: { keepAlive: true } },
        { path: '/category', name: 'category', component: () => import('./views/Category.vue') },
        { path: '/about', name: 'about', component: () => import('./views/About.vue') },
        { path: '/blog/:id', name: 'blog', component: () => import('./views/Blog.vue') },
        { path: '/bloglist', name: 'bloglist', component: () => import('./views/BlogList.vue') }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
  window.scrollTo(0, 0);
});

export default router;
