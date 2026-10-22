
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  restaurantWebsiteHero
} from './RestaurantWebsite.js'

import {
  restaurantWebsiteFAQs
} from './RestaurantWebsite.js'
import RestaurantFeatures from './RestaurantFeatures/RestaurantFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="restaurantWebsiteHero" />

    <RestaurantFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Restaurant Website."
      :items="restaurantWebsiteFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


