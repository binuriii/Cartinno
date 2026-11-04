<script setup>
import Hero from '../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../components/InnerPages/Testimonials/Testimonials.vue'

import {
  multivendorEcommerceHero,
  multivendorEcommerceFAQs
} from './MultivendorEcommercePortal.js'

import MultiVendorIntro from './MultivendorEcommerce/MultiVendorIntro.vue'
import MultiVendorBenefits from './MultiVendorBenefits/MultiVendorBenefits.vue'
import EcommerceNecessity from './EcommerceNecessity/EcommerceNecessity.vue'
import WhyDifferent from './WhyDifferent/WhyDifferent.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="multivendorEcommerceHero" />

    <MultiVendorIntro/>

    <MultiVendorBenefits/>

    <EcommerceNecessity/>

    <WhyDifferent/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Multivendor Ecommerce Portal."
      :items="multivendorEcommerceFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


