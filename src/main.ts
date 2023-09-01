import './assets/application.css'

import {createApp} from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import HomePage from '@/components/HomePage.vue'
import CustomerLogin from '@/components/customer/CustomerLogin.vue'
import CinemaInfo from '@/components/cinema/CinemaInfo.vue'
import MovieInfo from '@/components/cinema/MovieInfo/MovieInfo.vue'
import CinemaHome from '@/components/cinema/CinemaHome/CinemaHome.vue'
import axios from 'axios'
//import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/index.scss'//将element-plus的全部样式导入到项目中

// 配置axios
if (import.meta.env.MODE === 'development') axios.defaults.baseURL = 'http://localhost:5212/'
else axios.defaults.baseURL = 'http://cinema.cinea.com.cn/'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: CinemaHome },
    { path: '/CinemaInfo', component: CinemaInfo },
    //{ path: '/', component: MovieInfo},
    //{ path: '/', component: HomePage },
    { path: '/login', component: CustomerLogin },
    { path: '/movieInfo', component: MovieInfo }
  ]
})

createApp(App).use(router).mount('#app')
//Test