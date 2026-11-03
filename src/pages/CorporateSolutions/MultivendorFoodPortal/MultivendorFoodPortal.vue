<script setup>
import Hero from '../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../components/InnerPages/Testimonials/Testimonials.vue'

import {
  multivendorFoodPortalHero,
  multivendorFoodPortalFAQs
} from './MultivendorFoodPortal.js'
import BusinessOwnerFeatures from './BusinessOwnerFeatures/BusinessOwnerFeatures.vue';
import CustomerFeatures from './CustomerFeatures/CustomerFeatures.vue';

</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="multivendorFoodPortalHero" />

    <BusinessOwnerFeatures/>

    <CustomerFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Multivendor Food Portal."
      :items="multivendorFoodPortalFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


