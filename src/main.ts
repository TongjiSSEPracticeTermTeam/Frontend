import './assets/application.css'

import {createApp} from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import HomePage from '@/components/HomePage.vue'
import CustomerLogin from '@/components/customer/CustomerLogin.vue'
import movieManage from '@/components/administrator/movieManage.vue'
import axios from 'axios'
import 'element-plus/theme-chalk/src/message.scss'

// 配置axios
if (import.meta.env.MODE === 'development') axios.defaults.baseURL = 'http://localhost:5212/'
else axios.defaults.baseURL = 'http://cinema.cinea.com.cn/'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: CustomerLogin },
    { path: '/admin', component: movieManage },
  ]
})

createApp(App).use(router).mount('#app')
