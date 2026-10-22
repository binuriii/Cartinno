<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  foodListingsHero
} from './ListingsManagement.js'

import {
  foodListingsFAQs
} from './ListingsManagement.js'
import ListingsFeatures from './ListingsFeatures/ListingsFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="foodListingsHero" />

    <ListingsFeatures/>
    
    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Food Listnings."
      :items="foodListingsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>