import './assets/application.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import HomePage from '@/components/HomePage.vue'
import CustomerLogin from '@/components/customer/CustomerLogin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: CustomerLogin }
  ]
})

createApp(App).use(router).mount('#app')
