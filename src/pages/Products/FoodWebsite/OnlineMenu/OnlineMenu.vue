<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  onlineMenuHero
} from './OnlineMenu.js'

import {
  onlineMenuFAQs
} from './OnlineMenu.js'
import OnlineMenuFeatures from './OnlineMenuFeatures/OnlineMenuFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="onlineMenuHero" />

    <OnlineMenuFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Online Menu."
      :items="onlineMenuFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


