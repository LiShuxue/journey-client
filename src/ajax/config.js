import axios from 'axios'
import API from './api'
import store from '../store'

axios.defaults.timeout = 60 * 1000
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://lishuxue.site/blog-api/' : (process.env.VUE_APP_TARGET === 'mobile' ? 'http://lishuxue.site/blog-api/' : 'http://localhost:4000/blog-api/')

axios.interceptors.request.use(config => {
  for (let key in API.requireAuth) {
    // 需要携带token
    if (config.url.includes(API.requireAuth[key])) {
      if (store.state.access_token && store.state.refresh_token) {
        config.headers.Authorization = `Bearer ${store.state.access_token}`
        config.headers['refresh-token'] = store.state.refresh_token
      }
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (response.status === 200 && response.data.errMsg) {
    return Promise.reject(response)
  }
  if (response.status === 200 && response.headers['new-access-token'] && response.headers['new-refresh-token']) {
    store.dispatch('saveAccessTokenAction', response.headers['new-access-token'])
    store.dispatch('saveRefreshTokenAction', response.headers['new-refresh-token'])
  }
  return response
}, error => {
  return Promise.reject(error.response)
})

export default axios
