import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
  ],
})

export default router
