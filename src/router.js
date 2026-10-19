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

  {
    path: '/seo',
    name: 'seo',
    component: () => 
      import('./pages/Products/EcommerceWebsite/SEO/SEO.vue')
  },

  {
    path: '/review-engine',
    name: 'review-engine',
    component: () =>
      import('./pages/Products/EcommerceWebsite/ReviewEngine/ReviewEngine.vue')
  },

  {
    path: '/retail-wholesale',
    name: 'retail-wholesale',
    component: () =>
      import('./pages/Products/EcommerceWebsite/RetailWholesale/RetailWholesalePage.vue')
  },

  {
    path: '/smart-upsells',
    name: 'smart-upsells',
    component: () =>
      import('./pages/Products/EcommerceWebsite/SmartUpsells/SmartUpsells.vue')
  },
  {
    path: '/point-of-sale',
    name: 'point-of-sale',
    component: () =>
      import('./pages/Products/CloudPos/POS/PointOfSalePage/PointOfSalePage.vue')
  },











  { path: '/:pathMatch(.*)*', 
    redirect: '/' 
  },

]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})