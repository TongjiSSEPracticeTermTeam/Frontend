// 配置axios
import axios from 'axios'

if (import.meta.env.MODE === 'development') axios.defaults.baseURL = 'http://localhost:5212/'
else axios.defaults.baseURL = 'http://cinema.cinea.com.cn/'

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (window.localStorage.getItem('cc_token')) {
      config.headers['Authorization'] = window.localStorage.getItem('cc_token')
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error) return Promise.reject(error)
  }
)
