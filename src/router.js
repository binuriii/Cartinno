import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  // { path: '/products', name: 'products', component: () => import('./pages/Products/Products.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})