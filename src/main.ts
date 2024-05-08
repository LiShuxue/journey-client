import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as Sentry from '@sentry/vue';
import VueGtag from 'vue-gtag';

import 'normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
import axios from './ajax/config';
import handleError from './utils/handleError';

const app = createApp(App);

Sentry.init({
  app,
  dsn: 'https://7be260b737ff4dfebd56761342ee56d5@o212666.ingest.sentry.io/4505424448258048',
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/lishuxue\.site/],
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

app.use(createPinia());
app.use(router);
app.use(ElementPlus as any);

app.config.globalProperties.axios = axios;
app.config.globalProperties.handleError = handleError;
app.config.errorHandler = handleError;

app.use(
  VueGtag,
  {
    config: { id: 'G-Q3QSPMH38N' },
  },
  router
);

app.mount('#app');
