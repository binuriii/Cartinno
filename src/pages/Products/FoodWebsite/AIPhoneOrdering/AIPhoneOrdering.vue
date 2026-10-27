<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import AIPhoneOrderingFeatures from './AIPhoneOrderingFeatures/AIPhoneOrderingFeatures.vue'


import {
  aiPhoneOrderingHero
} from './AIPhoneOrdering.js'

import {
  aiPhoneOrderingFAQs
} from './AIPhoneOrdering.js'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="aiPhoneOrderingHero" />

    <AIPhoneOrderingFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="aiPhoneOrderingFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


