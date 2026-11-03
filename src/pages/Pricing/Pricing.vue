<script setup>
import { ref } from 'vue'

import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'
import FAQ from '../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../components/InnerPages/Testimonials/Testimonials.vue'

import PricingPlans from './PricingPlans/PricingPlans.vue'
import PricingComparison from './PricingComparison/PricingComparison.vue'
import PricingGrowth from './PricingGrowth/PricingGrowth.vue'

import { pricingHero, pricingFAQs } from './Pricing.js'

const billing = ref('monthly')
const currency = ref('LKR')
</script>

<template>
  <main class="pricing-page">
    <HeroTwo v-bind="pricingHero" />

    <!-- 1. Choose the Right Plan for Your Business -->
    <PricingPlans
      v-model:billing="billing"
      v-model:currency="currency"
    />

    <!-- 2. Every feature, clearly compared -->
    <PricingComparison :currency="currency" />

    <!-- 3. Final image section with its heading -->
    <PricingGrowth />

    <FAQ
      title="Frequently Asked Questions"
      description="Find answers to common questions about Cartinno plans, features and billing."
      :items="pricingFAQs"
    />

    <Testimonials />
  </main>
</template>
