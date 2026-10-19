<script setup>
// GLOBAL COMPONENTS (already in your Cartinno project)
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

// ONLY THREE CUSTOM SECTIONS
import LoyaltyShowcase from './LoyaltyShowcase/LoyaltyShowcase.vue'
import LoyaltyStories from './LoyaltyStories/LoyaltyStories.vue'
import LoyaltyBenefits from './LoyaltyBenefits/LoyaltyBenefits.vue'

// SHARED HERO / FAQ PAGE CONTENT
import { loyaltyHero, loyaltyFAQs } from './LoyaltyManagement.js'

import './LoyaltyManagement.css'
</script>

<template>
  <main class="loyalty-page">
    <!-- SHARED HERO -->
    <Hero v-bind="loyaltyHero" />

    <!-- SECTION 1: HORIZONTAL FEATURE-CARD CAROUSEL -->
    <LoyaltyShowcase />

    <!-- SECTION 3: SPLIT-IMAGE LOYALTY BENEFITS -->
    <LoyaltyBenefits />


    <!-- SECTION 2: IMAGE GRID / EDITORIAL STORIES -->
    <LoyaltyStories />

    

    <!-- EXISTING SHARED FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Loyalty Management."
      :items="loyaltyFAQs"
    />

    <!-- EXISTING SHARED TESTIMONIALS -->
    <Testimonials />
  </main>
</template>
