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

  {
    path: '/inventory-management-system',
    name: 'inventory-management-system',
    component: () =>
      import('./pages/Products/EcommerceWebsite/InventoryManagementSystem/InventoryManagementSystem.vue')
  },

  {
    path: '/reporting-and-analytics',
    name: 'reporting-and-analytics',
    component: () =>
      import('./pages/Products/EcommerceWebsite/ReportingAnalytics/ReportingAnalytics.vue')
  },

  {
    path: '/facebook-intergration',
    name: 'facebook-intergration',
    component: () =>
      import('./pages/Products/EcommerceWebsite/FacebookIntegration/FacebookIntegration.vue')
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

{
  path: '/marketing-campaigns',
  name: 'marketing-campaigns',
  component: () =>
    import('./pages/Products/EcommerceWebsite/MarketingCampaigns/MarketingCampaigns.vue')
},

{
  path: '/cloud-phone-system',
  name: 'cloud-phone-system',
  component: () =>
    import('./pages/Products/EcommerceWebsite/CloudPhoneSystem/CloudPhoneSystem.vue')
},


{
  path: '/pos-integrations',
  name: 'pos-integrations',
  component: () =>
    import('./pages/Products/EcommerceWebsite/POSIntegrations/POSIntegrations.vue')
},

{
  path: '/enquiry-management',
  name: 'enquiry-management',
  component: () =>
    import('./pages/Products/EcommerceWebsite/EnquiryManagement/EnquiryManagement.vue')
},


{
  path: '/lead-manager',
  name: 'lead-manager',
  component: () =>
    import('./pages/Products/EcommerceWebsite/LeadManager/LeadManager.vue')
},



  {
    path: '/restaurant-website',
    name: 'restaurant-website',
    component: () =>
      import('./pages/Products/FoodWebsite/RestaurantWebsite/RestaurantWebsite.vue')
  },

  {
    path: '/restaurant-seo',
    name: 'restaurant-seo',
    component: () =>
      import('./pages/Products/FoodWebsite/RestaurantSEO/RestaurantSEO.vue')
  },

  {
    path: '/online-menu',
    name: 'online-menu',
    component: () =>
      import('./pages/Products/FoodWebsite/OnlineMenu/OnlineMenu.vue')
  },

  {
    path: '/food-reviews-engine',
    name: 'food-reviews-engine',
    component: () =>
      import('./pages/Products/FoodWebsite/FoodReviewsEngine/FoodReviewsEngine.vue')
  },

  {
    path: '/listings-management',
    name: 'listings-management',
    component: () =>
      import('./pages/Products/FoodWebsite/ListingsManagement/ListingsManagement.vue')
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
