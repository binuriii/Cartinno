<script setup>
// Shared InnerPages Components
import Hero from "../../../../../components/InnerPages/Hero/Hero.vue";
import FAQ from "../../../../../components/InnerPages/FAQ/FAQ.vue";
import Testimonials from "../../../../../components/InnerPages/Testimonials/Testimonials.vue";

// Import the specific components we created for the Sales Management page
import AnalyticsSection from "./AnalyticsSection/AnalyticsSection.vue";
import CashTaxSection from "./CashTaxSection/CashTaxSection.vue";
import MultiLocationSection from "./MultiLocationSection/MultiLocationSection.vue";
import ReportingSection from "./ReportingSection/ReportingSection.vue";


// Import Data
import { salesManagementHero, salesManagementFAQs } from "./SalesManagementPage.js";
</script>

<template>
  <main class="sm-page">
    <!-- HERO SECTION (Using Shared Component) -->
    <Hero v-bind="salesManagementHero" />

    <!-- REAL-TIME ANALYTICS (Bento Grid) -->
    <AnalyticsSection />

    <!-- REPORTING SECTION (Bento Grid) -->
    <ReportingSection />

    <!-- CASH & TAX CONTROL (Grid) -->
    <CashTaxSection />

    <!-- MULTI LOCATION EXPANSION (Zig-Zag) -->
    <MultiLocationSection />

    <!-- FAQ SECTION -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Sales & Billing."
      :items="salesManagementFAQs"
    />

    <!-- TESTIMONIALS SECTION -->
    <Testimonials />
  </main>
</template>

<style scoped>
.sm-page {
  width: 100%;
  overflow-x: hidden;
  background: #ffffff; /* Page base background */
}
</style>