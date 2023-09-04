import { createRouter, createWebHistory } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HomePage from '@/components/HomePage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CustomerLogin from '@/components/LoginPage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ManagerView from '@/components/cinema/CinemaHallView.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AdminView from '@/components/admin/AdminView.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MovieDetailPage from '@/components/customer/movie/MovieDetailPage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CustomerRegister from '@/components/RegisterPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: CustomerLogin },
    { path: '/manager', component: ManagerView },
    { path: '/admin', component: AdminView },
    { path: '/movie/:movieId', component: MovieDetailPage },
    { path: '/register', component: CustomerRegister }
  ]
})