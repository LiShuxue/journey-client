import axios from 'axios'
import API from './api'
import store from '../store'

axios.defaults.timeout = 60 * 1000
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://47.93.18.226' : 'http://localhost:4000'

axios.interceptors.request.use(config => {
  for (let key in API.requireAuth) {
    // 需要携带token
    if (config.url.includes(API.requireAuth[key])) {
      if (store.state.access_token && store.state.refresh_token) {
        config.headers.Authorization = `Bearer ${store.state.access_token}`
        config.headers.refresh_token = store.state.refresh_token
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
  if (response.status === 200 && response.data.new_access_token && response.data.new_refresh_token) {
    store.dispatch('saveAccessTokenAction', response.data.new_access_token)
    store.dispatch('saveRefreshTokenAction', response.data.new_refresh_token)
  }
  return response
}, error => {
  return Promise.reject(error.response)
})

export default axios
