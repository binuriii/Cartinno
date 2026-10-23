<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import CloudPhoneFeatures from './CloudPhoneFeatures/CloudPhoneFeatures.vue'
import CloudPhoneJourney from './CloudPhoneJourney/CloudPhoneJourney.vue'
import CloudPhoneConnections from './CloudPhoneConnections/CloudPhoneConnections.vue'
import { cloudPhoneHero, cloudPhoneFAQs } from './CloudPhoneSystem.js'
import './CloudPhoneSystem.css'
</script>

<template>
  <main class="cloud-phone-page">
    <!-- HERO -->
    <Hero v-bind="cloudPhoneHero" />

    <!-- 1 · SMARTER CALLS -->
    <CloudPhoneFeatures />

    <!-- 2 · FOUR SIMPLE STEPS -->
    <CloudPhoneJourney />

    <!-- 3 · SEE IT IN ACTION -->
    <CloudPhoneConnections />

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Cloud Phone System."
      :items="cloudPhoneFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />
  </main>
</template>
