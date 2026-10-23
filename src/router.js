import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home/Home.vue";

const routes = [
  { path: "/", name: "home", component: Home },

  {
    path: "/ecommerce-website",
    name: "ecommerce-website",
    component: () =>
      import("./pages/Products/EcommerceWebsite/EcommercePage/EcommercePage.vue"),
  },

  {
    path: "/seo",
    name: "seo",
    component: () => import("./pages/Products/EcommerceWebsite/SEO/SEO.vue"),
  },

  {
    path: "/review-engine",
    name: "review-engine",
    component: () =>
      import("./pages/Products/EcommerceWebsite/ReviewEngine/ReviewEngine.vue"),
  },

  {
    path: "/retail-wholesale",
    name: "retail-wholesale",
    component: () =>
      import("./pages/Products/EcommerceWebsite/RetailWholesale/RetailWholesalePage.vue"),
  },

  {
    path: "/gift-cards",
    name: "gift-cards",
    component: () =>
      import("./pages/Products/EcommerceWebsite/GiftCards/GiftCards.vue"),
  },

  {
    path: "/sell-with-reseller",
    name: "sell-with-reseller",
    component: () =>
      import("./pages/Products/EcommerceWebsite/SellWithResellerNetwork/SellWithResellerNetwork.vue"),
  },

  {
    path: "/sell-with-marketplace",
    name: "sell-with-marketplace",
    component: () =>
      import("./pages/Products/EcommerceWebsite/SellWithMarketplace/SellWithMarketplace.vue"),
  },

  {
    path: "/ecommerce-cloud-pos",
    name: "ecommerce-cloud-pos",
    component: () =>
      import("./pages/Products/EcommerceWebsite/CloudPOS/CloudPOS.vue"),
  },

  {
    path: "/push-notification-marketing",
    name: "push-notification-marketing",
    component: () =>
      import("./pages/Products/EcommerceWebsite/PushNotificationMarketing/PushNotificationMarketing.vue"),
  },

  {
    path: "/inventory-management-system",
    name: "inventory-management-system",
    component: () =>
      import("./pages/Products/EcommerceWebsite/InventoryManagementSystem/InventoryManagementSystem.vue"),
  },

  {
    path: "/reporting-and-analytics",
    name: "reporting-and-analytics",
    component: () =>
      import("./pages/Products/EcommerceWebsite/ReportingAnalytics/ReportingAnalytics.vue"),
  },

  {
    path: "/facebook-intergration",
    name: "facebook-intergration",
    component: () =>
      import("./pages/Products/EcommerceWebsite/FacebookIntegration/FacebookIntegration.vue"),
  },

  {
    path: "/delivery",
    name: "delivery",
    component: () =>
      import("./pages/Products/EcommerceWebsite/Delivery/Delivery.vue"),
  },

  {
    path: "/loyalty-management",
    name: "loyalty-management",
    component: () =>
      import("./pages/Products/EcommerceWebsite/LoyaltyManagement/LoyaltyManagement.vue"),
  },

  {
    path: "/gift-registry",
    name: "gift-registry",
    component: () =>
      import("./pages/Products/EcommerceWebsite/GiftRegistry/GiftRegistry.vue"),
  },

  {
    path: "/marketing-campaigns",
    name: "marketing-campaigns",
    component: () =>
      import("./pages/Products/EcommerceWebsite/MarketingCampaigns/MarketingCampaigns.vue"),
  },

  {
    path: "/cloud-phone-system",
    name: "cloud-phone-system",
    component: () =>
      import("./pages/Products/EcommerceWebsite/CloudPhoneSystem/CloudPhoneSystem.vue"),
  },

  {
    path: "/enquiry-management",
    name: "enquiry-management",
    component: () =>
      import("./pages/Products/EcommerceWebsite/EnquiryManagement/EnquiryManagement.vue"),
  },

  {
    path: "/lead-manager",
    name: "lead-manager",
    component: () =>
      import("./pages/Products/EcommerceWebsite/LeadManager/LeadManager.vue"),
  },

  {
    path: "/smart-upsells",
    name: "smart-upsells",
    component: () =>
      import("./pages/Products/EcommerceWebsite/SmartUpsells/SmartUpsells.vue"),
  },

  {
    path: "/point-of-sale",
    name: "point-of-sale",
    component: () =>
      import("./pages/Products/CloudPos/POS/PointOfSalePage/PointOfSalePage.vue"),
  },

  {
    path: "/reporting-analytics",
    name: "reporting-analytics",
    component: () =>
      import("./pages/Products/CloudPos/FoodPOS/ReportingAnalyticsPage/ReportingAnalyticsPage.vue"),
  },

  // Active POS Integrations Route (Cloud POS)
  {
    path: "/pos-integrations",
    name: "pos-integrations",
    component: () =>
      import("./pages/Products/CloudPos/FoodPOS/POSIntegrationsPage/PosIntegrationsPage.vue"),
  },

  {
    path: "/kitchen-tablet",
    name: "kitchen-tablet",
    component: () =>
      import("./pages/Products/CloudPos/FoodPOS/KitchenTabletPage/KitchenTabletPage.vue"),
  },

  // Commented out to prevent duplicate route conflict:
  // {
  //   path: '/pos-integrations-ecommerce',
  //   name: 'pos-integrations-ecommerce',
  //   component: () =>
  //     import('./pages/Products/EcommerceWebsite/POSIntegrations/POSIntegrations.vue')
  // },

  // Catch-all fallback route
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return {
      top: 0,
      left: 0,
    };
  },
});
