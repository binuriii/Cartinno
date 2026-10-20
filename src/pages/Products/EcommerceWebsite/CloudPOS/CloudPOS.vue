<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  cloudPOSHero
} from './CloudPOS.js'

import {
  cloudPOSFAQs
} from './CloudPOS.js'
import CloudPOSFeatures from './CloudPOSFeatures/CloudPOSFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="cloudPOSHero" />

    <CloudPOSFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Cloud POS FAQs."
      :items="cloudPOSFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


