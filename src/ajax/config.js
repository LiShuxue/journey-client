import axios from 'axios'
import API from './api'
import store from '../store'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.request.use(config => {
  for (let key in API.admin) {
    // 除了登录注册之外的管理员相关请求，需要携带token
    if (config.url.includes(API.admin[key]) && config.url !== 'http://localhost:8080/api/admin/login' && config.url !== 'http://localhost:8080/api/admin/register') {
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
  console.log(response)
  if (response.status === 200 && response.data.errMsg) {
    return Promise.reject(response)
  }
  if (response.status === 200 && response.data.new_access_token && response.data.new_refresh_token) {
    store.dispatch('saveAccessTokenAction', response.data.new_access_token)
    store.dispatch('saveRefreshTokenAction', response.data.new_refresh_token)
  }
  return response
}, error => {
  console.log(error.response)
  return Promise.reject(error.response)
})

export default axios
