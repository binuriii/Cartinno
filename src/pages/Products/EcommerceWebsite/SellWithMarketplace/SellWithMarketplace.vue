
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  marketplaceHero
} from './SellWithMarketplace.js'

import {
  marketplaceFAQs
} from './SellWithMarketplace.js'
import MarketplaceFeatures from './MarketplaceFeatures/MarketplaceFeatures.vue'
import MarketplaceHowItWorks from './MarketplaceHowItWorks/MarketplaceHowItWorks.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="marketplaceHero" />

    <MarketplaceFeatures/>

    <MarketplaceHowItWorks/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="marketplaceFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


