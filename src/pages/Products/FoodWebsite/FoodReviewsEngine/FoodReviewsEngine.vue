<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  foodReviewEngineHero
} from './FoodReviewsEngine.js'

import {
  foodReviewEngineFAQs
} from './FoodReviewsEngine.js'
import FoodReviewFeatures from './FoodReviewFeatures/FoodReviewFeatures.vue'
import FoodReviewBenefits from './FoodReviewBenefits/FoodReviewBenefits.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="foodReviewEngineHero" />

    <FoodReviewFeatures/>

    <FoodReviewBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="foodReviewEngineFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


