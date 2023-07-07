import './assets/application.css'

import {createApp} from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import HomePage from '@/components/HomePage.vue'
import CustomerLogin from '@/components/customer/CustomerLogin.vue'
import CinemaInfo from '@/components/cinema/CinemaInfo.vue'
import axios from 'axios'
import 'element-plus/theme-chalk/src/message.scss'

// 配置axios
if (import.meta.env.MODE === 'development') axios.defaults.baseURL = 'http://localhost:5212/'
else axios.defaults.baseURL = 'http://cinema.cinea.com.cn/'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: CinemaInfo },
    //{ path: '/', component: HomePage },
    { path: '/login', component: CustomerLogin }
  ]
})

createApp(App).use(router).mount('#app')
//Test