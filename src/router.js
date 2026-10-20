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
  path: '/delivery',
  name: 'delivery',
  component: () =>
    import('./pages/Products/EcommerceWebsite/Delivery/Delivery.vue')
},
  
{
  path: '/loyalty-management',
  name: 'loyalty-management',
  component: () =>
    import('./pages/Products/EcommerceWebsite/LoyaltyManagement/LoyaltyManagement.vue')
},

 
{
  path: '/gift-registry',
  name: 'gift-registry',
  component: () =>
    import('./pages/Products/EcommerceWebsite/GiftRegistry/GiftRegistry.vue')
},















  { path: '/:pathMatch(.*)*', 
    redirect: '/' 
  },

]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})