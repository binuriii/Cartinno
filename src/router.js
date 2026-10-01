import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home }
  // Add Products routes here, e.g.
  // { path: '/products', name: 'products', component: () => import('./pages/Products/Products.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
