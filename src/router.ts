import { createRouter, createWebHistory } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HomePage from '@/components/HomePage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CustomerLogin from '@/components/LoginPage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ManagerView from '@/components/manager/ManagerView.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AdminView from '@/components/admin/AdminView.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MovieDetailPage from '@/components/customer/movie/MovieDetailPage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CustomerRegister from '@/components/RegisterPage.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ChooseSeatPage from '@/components/customer/ticket/ChooseSeatPage.vue'
import TicketSuccessPage from "@/components/customer/ticket/TicketSuccessPage.vue";
import TicketListPage from '@/components/customer/orders/TicketListPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: CustomerLogin },
    { path: '/manager', component: ManagerView },
    { path: '/admin', component: AdminView },
    { path: '/movie/:movieId', component: MovieDetailPage },
    { path: '/register', component: CustomerRegister },
    { path: '/buy/:movieId/:cinemaId/:hallId/:startTime', component: ChooseSeatPage },
    { path: '/buy/success', component: TicketSuccessPage },
    { path: '/tickets', component: TicketListPage }
  ]
})
