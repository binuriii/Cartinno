<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  cateringHero
} from './Catering.js'

import {
  cateringFAQs
} from './Catering.js'
import CateringFeatures from './CateringFeatures/CateringFeatures.vue'
import CateringBenefits from './CateringBenefits/CateringBenefits.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="cateringHero" />

    <CateringFeatures/>

    <CateringBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="cateringFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


