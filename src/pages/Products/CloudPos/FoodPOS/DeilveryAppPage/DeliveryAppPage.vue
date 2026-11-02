<script setup>
// Shared InnerPages Components
import Hero from "../../../../../components/InnerPages/Hero/Hero.vue";
import FAQ from "../../../../../components/InnerPages/FAQ/FAQ.vue";
import Testimonials from "../../../../../components/InnerPages/Testimonials/Testimonials.vue";

// Custom Delivery App Sections
import AppSolution from "./AppSolution/AppSolution.vue";
import AppBenefits from "./AppBenefits/AppBenefits.vue";

// Import Data
import {
  deliveryHero,
  deliveryFAQs,
} from "./DeliveryAppPage.js";
</script>

<template>
  <main class="delivery-app-page">
    
    <!-- 1. HERO SECTION -->
    <Hero v-bind="deliveryHero" />

    <!-- 2. COMPLETE APP SOLUTION SECTION (3-Card Layout) -->
    <AppSolution />

    <!-- 3. APP BENEFITS SECTION (Blue, Green, Yellow Cards) -->
    <AppBenefits />

    <!-- 4. FAQ SECTION -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about the Cartinno Delivery App."
      :items="deliveryFAQs"
    />

    <!-- 5. TESTIMONIALS SECTION -->
    <Testimonials />
    
  </main>
</template>

<style scoped>
.delivery-app-page {
  width: 100%;
  overflow-x: hidden;
  background: #ffffff;
}
</style>