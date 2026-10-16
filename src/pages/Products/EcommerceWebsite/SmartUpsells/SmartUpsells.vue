
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  smartUpsellsHero
} from './SmartUpsells.js'

import {
  smartUpsellsFAQs
} from './SmartUpsells.js'
import UpsellBenefits from './UpsellBenefits/UpsellBenefits.vue'
import UpsellHighlights from './UpsellHighlights/UpsellHighlights.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="smartUpsellsHero" />

    <UpsellBenefits />

    <UpsellHighlights />

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="smartUpsellsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>

