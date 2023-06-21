import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // import.meta.env.BASE_URL 是vite.config.ts中的base
  routes: [
    {
      path: '/',
      component: () => import('./views/Main.vue'),
      redirect: '/one',
      children: [
        { path: '/one', name: 'one', component: () => import('./views/One.vue') },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: { keepAlive: true },
        },
        { path: '/category', name: 'category', component: () => import('./views/Category.vue') },
        { path: '/about', name: 'about', component: () => import('./views/About.vue') },
        { path: '/blog/:id', name: 'blog', component: () => import('./views/Blog.vue') },
        { path: '/bloglist', name: 'bloglist', component: () => import('./views/BlogList.vue') },
      ],
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
  window.scrollTo(0, 0);
});

export default router;
