<script setup>
// Shared InnerPages Components
import FAQ from "../../../../../components/InnerPages/FAQ/FAQ.vue";
import Testimonials from "../../../../../components/InnerPages/Testimonials/Testimonials.vue";

// Import the specific components we created for the Delivery App page
import AppIntro from "./AppIntro/AppIntro.vue"; 
import AppSolution from "./AppSolution/AppSolution.vue";

// Import Data
import {
  deliveryFAQs,
} from "./DeliveryAppPage.js";
</script>

<template>
  <main class="delivery-app-page">
    
    <!-- HERO SECTION (Using our custom premium blue card Hero) -->
    <AppIntro />

    <!-- COMPLETE APP SOLUTION SECTION -->
    <AppSolution />

    <!-- FAQ SECTION -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about the Cartinno Delivery App."
      :items="deliveryFAQs"
    />

    <!-- TESTIMONIALS SECTION -->
    <Testimonials />
  </main>
</template>

<style scoped>
.delivery-app-page {
  width: 100%;
  overflow-x: hidden;
  background: #ffffff; /* Page base background */
}
</style>