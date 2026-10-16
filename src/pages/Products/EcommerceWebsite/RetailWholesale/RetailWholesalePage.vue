<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import RetailGrowth from './RetailGrowth/RetailGrowth.vue'
import {
  retailPOSHero
} from '../../../../components/InnerPages/Hero/Hero.js'

import {
  retailPOSFAQs
} from '../../../../components/InnerPages/FAQ/FAQData.js'
import RetailOperations from './RetailOperations/RetailOperations.vue'
import RetailExpansion from './RetailExpansion/RetailExpansion.vue'
</script>

<template>
  <main class="review-engine-page">

    <!-- HERO -->
    <Hero v-bind="retailPOSHero" />

    <RetailExpansion />

    

    <RetailOperations />

    <RetailGrowth />


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

