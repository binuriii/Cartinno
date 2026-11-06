<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import DailyOperationsFeatures from './DailyOperationsFeatures/DailyOperationsFeatures.vue'
import DailyOperationsJourney from './DailyOperationsJourney/DailyOperationsJourney.vue'
import DailyOperationsConnections from './DailyOperationsConnections/DailyOperationsConnections.vue'
import { dailyOperationsHero, dailyOperationsFAQs } from './DailyOperations.js'
import './DailyOperations.css'
</script>

<template>
  <main class="daily-operations-page">
    <Hero v-bind="dailyOperationsHero" />
    <DailyOperationsFeatures />
    <DailyOperationsJourney />
    <DailyOperationsConnections />
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about managing daily operations with Cartinno."
      :items="dailyOperationsFAQs"
    />
    <Testimonials />
  </main>
</template>
