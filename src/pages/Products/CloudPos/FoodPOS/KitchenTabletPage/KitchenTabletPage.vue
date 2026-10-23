<script setup>
// Shared InnerPages Components
import Hero from "../../../../../components/InnerPages/Hero/Hero.vue";
import FAQ from "../../../../../components/InnerPages/FAQ/FAQ.vue";
import Testimonials from "../../../../../components/InnerPages/Testimonials/Testimonials.vue";

// Import the specific components we created for the Kitchen Tablet page
import KitchenFeatures from "./KitchenFeatures/KitchenFeatures.vue"; 
import KitchenBento from "./KitchenBento/KitchenBento.vue";

// Import Data
import {
  kitchenHero,
  kitchenFAQs,
} from "./KitchenTabletPage.js";
</script>

<template>
  <main class="kitchen-tablet-page">
    <!-- HERO SECTION (Using Shared Component) -->
    <Hero v-bind="kitchenHero" />

    <!-- KITCHEN FEATURES SECTION -->
    <KitchenFeatures />

    <!-- KITCHEN BENTO GRID SECTION -->
    <KitchenBento />

    <!-- FAQ SECTION -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about the Cartinno Kitchen POS."
      :items="kitchenFAQs"
    />

    <!-- TESTIMONIALS SECTION -->
    <Testimonials />
  </main>
</template>

<style scoped>
.kitchen-tablet-page {
  width: 100%;
  overflow-x: hidden;
  background: #ffffff; /* Page base background */
}
</style>