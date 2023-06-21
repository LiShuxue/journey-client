import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
import axios from './ajax/config';
import handleError from './utils/handleError';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.config.globalProperties.axios = axios;
app.config.globalProperties.handleError = handleError;
app.config.errorHandler = handleError;

app.mount('#app');
