<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  posIntegrationsHero
} from './PosIntegrations.js'

import {
  posIntegrationsFAQs
} from './POSIntegrations.js'
import PosIntegrationGrid from './PosIntegrationGrid/PosIntegrationGrid.vue'
import PosSetupSection from './PosSetupSection/PosSetupSection.vue'

</script>

<template>
  <main class="pos-integrations-page">

    <!-- HERO -->
    <Hero v-bind="posIntegrationsHero" />

    <PosSetupSection/>

    <PosIntegrationGrid />

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="posIntegrationsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


