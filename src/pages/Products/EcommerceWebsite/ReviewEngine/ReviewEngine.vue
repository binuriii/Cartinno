
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import ReviewFeatures from './ReviewFeatures/ReviewFeatures.vue'
import GoogleReview from './GoogleReview/GoogleReview.vue'

import {
  reviewEngineHero
} from '../../../../components/InnerPages/Hero/Hero.js'

import {
  reviewEngineFAQs
} from '../../../../components/InnerPages/FAQ/FAQData.js'
</script>

<template>
  <main class="review-engine-page">

    <!-- HERO -->
    <Hero v-bind="reviewEngineHero" />

    <!-- GOOGLE REVIEW -->
    <GoogleReview />

    <ReviewFeatures />

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
