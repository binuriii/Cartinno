<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import RetailGrowth from '../../RetailWholesale/RetailGrowth/RetailGrowth.vue'
import {
  reviewEngineHero
} from '../../../../components/InnerPages/Hero/Hero.js'

import {
  reviewEngineFAQs
} from '../../../components/InnerPages/FAQ/FAQData.js'
import RetailOperations from './RetailOperations/RetailOperations.vue'
import RetailExpansion from './RetailExpansion/RetailExpansion.vue'
</script>

<template>
  <main class="review-engine-page">

    <!-- HERO -->
    <Hero v-bind="reviewEngineHero" />

    <RetailExpansion />

    

    <RetailOperations />

    <RetailGrowth />


    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="reviewEngineFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>

