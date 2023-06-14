import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './ajax/config';
import handleError from './utils/handleError';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.config.errorHandler = handleError;
Vue.prototype.handleError = handleError;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
