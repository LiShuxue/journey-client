import axios from 'axios';
import API from './api';
import store from '../store';
import router from '../router';
import { Message, MessageBox } from 'element-ui';

const instance = axios.create({
  baseURL: process.env.VUE_APP_TARGET === 'mobile' ? 'https://lishuxue.site/blog-api/' : '/blog-api',
  timeout: 60 * 1000
});

instance.interceptors.request.use(
  config => {
    for (let key in API.requireAuth) {
      // 需要携带token
      if (config.url.includes(API.requireAuth[key])) {
        if (store.state.access_token && store.state.refresh_token) {
          config.headers.Authorization = `Bearer ${store.state.access_token}`;
          config.headers['refresh-token'] = store.state.refresh_token;
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.errMsg) {
      return Promise.reject(response);
    }
    if (response.status === 200 && response.headers['new-access-token'] && response.headers['new-refresh-token']) {
      store.dispatch('saveAccessTokenAction', response.headers['new-access-token']);
      store.dispatch('saveRefreshTokenAction', response.headers['new-refresh-token']);
    }
    response.data.successMsg && Message.success(response.data.successMsg);
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      MessageBox.alert('Token无效，请重新登录', '401', {
        confirmButtonText: '确定',
        showClose: false,
        callback: () => {
          store.dispatch('saveAccessTokenAction', '');
          store.dispatch('saveRefreshTokenAction', '');
          store.dispatch('saveUsernameAction', '');
          router.push('/login');
        }
      });
    }
    return Promise.reject(error.response);
  }
);

export default instance;
