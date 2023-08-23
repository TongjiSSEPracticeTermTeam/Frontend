// 配置axios
import axios from 'axios'

if (import.meta.env.MODE === 'development') axios.defaults.baseURL = 'http://localhost:5212/'
else axios.defaults.baseURL = 'https://cinema.cinea.com.cn/'

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
