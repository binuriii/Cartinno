<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import RetailGrowth from './RetailGrowth/RetailGrowth.vue'
import {
  retailPOSHero
} from './RetailWholesalePage.js'

import {
  retailPOSFAQs
} from './RetailWholesalePage.js'
import RetailOperations from './RetailOperations/RetailOperations.vue'
import RetailExpansion from './RetailExpansion/RetailExpansion.vue'
</script>

<template>
  <main class="review-engine-page">

    <!-- HERO -->
    <Hero v-bind="retailPOSHero" />

    <RetailExpansion />

    <RetailOperations />

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Retail POS."
      :items="retailPOSFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>

