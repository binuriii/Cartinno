<script setup>
// Shared InnerPages Components
import Hero from "../../../../../components/InnerPages/Hero/Hero.vue";
import FAQ from "../../../../../components/InnerPages/FAQ/FAQ.vue";
import Testimonials from "../../../../../components/InnerPages/Testimonials/Testimonials.vue";

// Import the specific components we created for the POS Integrations page
import PosSetupSection from "./PosSetupSection/PosSetupSection.vue"; 
import PosIntegrationGrid from "./PosIntegrationGrid/PosIntegrationGrid.vue";

// Import Data
import {
  posIntegrationsHero,
  posIntegrationsFAQs,
} from "./PosIntegrationsPage.js";
</script>

<template>
  <main class="pos-page">
    <!-- HERO SECTION (Using Shared Component) -->
    <Hero v-bind="posIntegrationsHero" />

    <!-- SETUP FEATURE SECTION -->
    <PosSetupSection />

    <!-- INTEGRATION BENTO GRID SECTION -->
    <PosIntegrationGrid />

    <!-- FAQ SECTION -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno POS Integrations."
      :items="posIntegrationsFAQs"
    />

    <!-- TESTIMONIALS SECTION -->
    <Testimonials />
  </main>
</template>

<style scoped>
.pos-page {
  width: 100%;
  overflow-x: hidden;
  background: #ffffff; /* Page base background */
}
</style>