
<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import BusinessSupport from './BusinessSupportData/BusinessSupport.vue'
import Comparison from './Comparison/Comparison.vue'
import RetailChange from './RetailChange/RetailChange.vue'

import { ecommerceHero } from './EcommercePage.js'
import { ecommerceFAQs } from './EcommercePage.js'

</script>

<template>
  <main class="ec-page">

    <!-- HERO SECTION -->
    <Hero v-bind="ecommerceHero" />

    <!-- BUSINESS SUPPORT -->
    <BusinessSupport />

    <!-- COMPARISON SECTION -->
    <Comparison />

    <!-- RETAIL CHANGE SECTION -->
    <RetailChange />

    <!-- FAQ SECTION -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno E-Commerce."
      :items="ecommerceFAQs"
    />

    <!-- TESTIMONIALS SECTION -->
    <Testimonials />

  </main>
</template>
