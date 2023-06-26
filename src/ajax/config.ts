import axios from 'axios';

const instance = axios.create({
  baseURL: '/blog-api',
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.errMsg) {
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default instance;
