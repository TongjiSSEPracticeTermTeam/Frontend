import './assets/application.css'

import {createApp} from 'vue'

import App from '@/App.vue'
import 'element-plus/theme-chalk/src/message.scss'
import router from '@/router'

import '@/helpers/axios'

createApp(App).use(router).mount('#app')
