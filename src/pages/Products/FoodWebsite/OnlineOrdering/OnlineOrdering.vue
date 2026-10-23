
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  onlineOrderingHero
} from './OnlineOrdering.js'

import {
  onlineOrderingFAQs
} from './OnlineOrdering.js'
import OnlineMenuFeatures from '../OnlineMenu/OnlineMenuFeatures/OnlineMenuFeatures.vue'
import OnlineOrderingFeatures from './OnlineOrderingFeatures/OnlineOrderingFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="onlineOrderingHero" />

    <OnlineOrderingFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Online Ordering."
      :items="onlineOrderingFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


