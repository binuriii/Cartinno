<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  foodLoyaltyRewardsHero
} from './LoyaltyAndRewards.js'

import {
  foodLoyaltyRewardsFAQs
} from './LoyaltyAndRewards.js'
import LoyaltyBenefits from './LoyaltyBenefits/LoyaltyBenefits.vue'
import LoyaltyFeatures from './LoyaltyFeatures/LoyaltyFeatures.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="foodLoyaltyRewardsHero" />

    <LoyaltyBenefits/>

    <LoyaltyFeatures/>
    
    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Loyalty and Rewards."
      :items="foodLoyaltyRewardsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


