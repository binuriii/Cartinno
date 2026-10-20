<script setup>
import Hero from "../../../../../components/InnerPages/Hero/Hero.vue";
import FAQ from "../../../../../components/InnerPages/FAQ/FAQ.vue";
import Testimonials from "../../../../../components/InnerPages/Testimonials/Testimonials.vue";

// Import the specific components we created for the POS page
import FeaturesSection from "./FeaturesSection/FeaturesSection.vue";
import ReasonsSection from "./ReasonsSection/ReasonsSection.vue";
import StatsBar from "./StatsBar/StatsBar.vue";

import { posHero, posFAQs } from "./PointOfSalePage.js";
</script>

<template>
  <main class="pos-page">
    <!-- HERO SECTION -->
    <Hero v-bind="posHero" />
    <!-- STATS BAR SECTION -->
    <StatsBar />

    <!-- FEATURES SECTION -->
    <FeaturesSection />

    <!-- REASONS SECTION -->
    <ReasonsSection />

    <!-- FAQ SECTION -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Cloud POS."
      :items="posFAQs"
    />

    <!-- TESTIMONIALS SECTION -->
    <Testimonials />
  </main>
</template>
