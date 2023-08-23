import './assets/application.css'

import {createApp} from 'vue'

import App from '@/App.vue'
import 'element-plus/theme-chalk/src/message.scss'
import router from '@/router'

import '@/helpers/axios'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
