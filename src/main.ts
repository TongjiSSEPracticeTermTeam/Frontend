import './assets/application.css'

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue'
import HomePage from '@/components/HomePage.vue'
import CustomerLogin from '@/components/customer/CustomerLogin.vue'
import axios from "axios";
import 'element-plus/theme-chalk/src/message.scss'

// 配置axios
if (import.meta.env.MODE === "development")
  axios.defaults.baseURL = "http://localhost:5212/";
else
  axios.defaults.baseURL = "https://cinema.cinea.com.cn/";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: HomePage},
    {path: '/login', component: CustomerLogin}
  ]
})

createApp(App).use(router).mount('#app')
