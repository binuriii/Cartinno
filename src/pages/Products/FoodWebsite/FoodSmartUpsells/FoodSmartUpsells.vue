<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  foodSmartUpsellsHero
} from './FoodSmartUpsells.js'

import {
  foodSmartUpsellsFAQs
} from './FoodSmartUpsells.js'
import FoodSmartUpsellsFeatures from './FoodUpsellFeatures/FoodSmartUpsellsFeatures.vue'


</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="foodSmartUpsellsHero" />

    <FoodSmartUpsellsFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="foodSmartUpsellsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


