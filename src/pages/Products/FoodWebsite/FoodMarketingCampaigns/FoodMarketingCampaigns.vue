
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  foodWebsiteMarketingCampaignHero
} from './FoodMarketingCampaigns.js'

import {
  foodWebsiteMarketingCampaignFAQs
} from './FoodMarketingCampaigns.js'
import FoodMarketingCampaignsFeatures from './FoodMarketingCampaignsFeatures/FoodMarketingCampaignsFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="foodWebsiteMarketingCampaignHero" />

    <FoodMarketingCampaignsFeatures/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="foodWebsiteMarketingCampaignFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


