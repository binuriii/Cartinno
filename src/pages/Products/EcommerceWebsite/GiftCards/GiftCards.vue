
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import GiftCardHowItWorks from './GiftCardHowItWorks/GiftCardHowItWorks.vue'

import {
  giftCardsHero
} from './GiftCards.js'

import {
  giftCardsFAQs
} from './GiftCards.js'
import GiftCardOccasions from './GiftCardOccasions/GiftCardOccasions.vue'
import GiftCardBusinesses from './GiftCardBusinesses/GiftCardBusinesses.vue'
</script>

<template>
  <main class="gift-cards-page">

    <!-- HERO -->
    <Hero v-bind="giftCardsHero" />

    <GiftCardHowItWorks />

    <GiftCardOccasions/>

    <GiftCardBusinesses/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Gift Cards."
      :items="giftCardsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


