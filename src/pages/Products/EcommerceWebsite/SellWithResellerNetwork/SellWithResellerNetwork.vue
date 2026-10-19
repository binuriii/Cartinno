
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  resellerNetworkHero
} from './SellWithResellerNetwork.js'

import {
  resellerNetworkFAQs
} from './SellWithResellerNetwork.js'
import ResellerFeatures from './ResellerFeatures/ResellerFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="resellerNetworkHero" />

    <ResellerFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="resellerNetworkFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


