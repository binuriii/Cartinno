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
    path: '/gift-cards',
    name: 'gift-cards',
    component: () =>
      import('./pages/Products/EcommerceWebsite/GiftCards/GiftCards.vue')
  },

  {
    path: '/sell-with-reseller',
    name: 'sell-with-reseller',
    component: () =>
      import('./pages/Products/EcommerceWebsite/SellWithResellerNetwork/SellWithResellerNetwork.vue')
  },

  {
    path: '/sell-with-marketplace',
    name: 'sell-with-marketplace',
    component: () =>
      import('./pages/Products/EcommerceWebsite/SellWithMarketplace/SellWithMarketplace.vue')
  },

  {
    path: '/ecommerce-cloud-pos',
    name: 'ecommerce-cloud-pos',
    component: () =>
      import('./pages/Products/EcommerceWebsite/CloudPOS/CloudPOS.vue')
  },

  {
    path: '/push-notification-marketing',
    name: 'push-notification-marketing',
    component: () =>
      import('./pages/Products/EcommerceWebsite/PushNotificationMarketing/PushNotificationMarketing.vue')
  },











  { path: '/:pathMatch(.*)*', 
    redirect: '/' 
  },

]


export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    return {
      top: 0,
      left: 0
    }
  }
})
