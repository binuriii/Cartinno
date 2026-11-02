
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  brandedRestaurantAppHero
} from './BrandedRestaurantApp.js'

import {
  brandedRestaurantAppFAQs
} from './BrandedRestaurantApp.js'
import BrandedRestaurantAppFeatures from './BrandedRestaurantAppFeatures/BrandedRestaurantAppFeatures.vue'
import BrandedRestaurantAppBenefits from './BrandedRestaurantAppBenefits/BrandedRestaurantAppBenefits.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="brandedRestaurantAppHero" />

    <BrandedRestaurantAppFeatures/>

    <BrandedRestaurantAppBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="brandedRestaurantAppFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


