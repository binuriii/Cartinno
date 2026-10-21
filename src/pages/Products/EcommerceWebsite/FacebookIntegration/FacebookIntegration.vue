
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  facebookIntegrationHero
} from './FacebookIntegration.js'

import {
  facebookIntegrationFAQs
} from './FacebookIntegration.js'
import FacebookFeatures from './FacebookFeatures/FacebookFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="facebookIntegrationHero" />

    <FacebookFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="facebookIntegrationFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


