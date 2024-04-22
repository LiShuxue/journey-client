import axios from 'axios';

const instance = axios.create({
  baseURL: '/blog-api',
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data?.data);
  },
  (error) => {
    return Promise.reject(error.response?.data);
  }
);

export default instance;
