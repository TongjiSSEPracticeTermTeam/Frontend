import './assets/application.css'

import {createApp} from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import HomePage from '@/components/HomePage.vue'
import CustomerLogin from '@/components/customer/CustomerLogin.vue'
import axios from 'axios'
import 'element-plus/theme-chalk/src/message.scss'
import router from '@/router'

import '@/helpers/axios'

createApp(App).use(router).mount('#app')
