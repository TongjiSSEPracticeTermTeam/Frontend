import { createRouter, createWebHashHistory } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HomePage from '@/components/HomePage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CustomerLogin from '@/components/customer/CustomerLogin.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ManagerView from '@/components/manager/ManagerView.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AdminView from '@/components/admin/AdminView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: CustomerLogin },
    { path: '/manager', component: ManagerView },
    { path: '/admin', component: AdminView }
  ]
})