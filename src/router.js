import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home/Home.vue'

const routes = [
  
  { path: '/', 
    name: 'home', 
    component: Home 
  },

  {
  path: '/ecommerce-website',
  name: 'ecommerce-website',
  component: () =>
    import('./pages/Products/EcommerceWebsite/EcommercePage/EcommercePage.vue')
  },











  { path: '/:pathMatch(.*)*', 
    redirect: '/' 
  },

]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})