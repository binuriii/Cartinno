<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  whatsappBusinessHero
} from './WhatsAppBusinessAPI.js'

import {
  whatsappBusinessFAQs
} from './WhatsAppBusinessAPI.js'
import WhatsAppFeatures from './WhatsAppFeatures/WhatsAppFeatures.vue'
import WhatsAppBenefits from './WhatsAppBenefits/WhatsAppBenefits.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="whatsappBusinessHero" />

    <WhatsAppFeatures/>

    <WhatsAppBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Whatsapp Busines API."
      :items="whatsappBusinessFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


