<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import ConnectedPOS from './ConnectedPOS/ConnectedPOS.vue'
import HardwareIntegrations from './HardwareIntegrations/HardwareIntegrations.vue'
import IntegrationAutomation from './IntegrationAutomation/IntegrationAutomation.vue'
import { posIntegrationsHero, posIntegrationsFAQs } from './POSIntegrations.js'
import './POSIntegrations.css'
</script>

<template>
  <main class="pos-integrations-page">
    <Hero v-bind="posIntegrationsHero" />
    <ConnectedPOS />
    <HardwareIntegrations />
    <IntegrationAutomation />
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno POS integrations."
      :items="posIntegrationsFAQs"
    />
    <Testimonials />
  </main>
</template>
