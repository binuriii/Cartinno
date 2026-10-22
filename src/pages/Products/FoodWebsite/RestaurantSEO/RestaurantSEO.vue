<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  restaurantSEOHero
} from './RestaurantSEO.js'

import {
  restaurantSEOFAQs
} from './RestaurantSEO.js'
import RestaurantSEOFeatures from './RestaurantSEOFeatures/RestaurantSEOFeatures.vue'
import RestaurantSEOBenefits from './RestaurantSEOBenefits/RestaurantSEOBenefits.vue'


</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="restaurantSEOHero" />

    <RestaurantSEOFeatures/>

    <RestaurantSEOBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Restaurant SEO."
      :items="restaurantSEOFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


