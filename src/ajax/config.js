import axios from 'axios'
import API from './api'
import store from '../store'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.request.use(config => {
  for (let key in API.admin) {
    if (config.url.includes(API.admin[key]) && config.url !== 'http://localhost:8080/api/admin/login') {
      if (store.state.access_token) {
        config.headers.Authorization = `Bearer ${store.state.access_token}`
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
  return response
}, error => {
  console.log(error.response)
  return Promise.reject(error.response)
})

export default axios
