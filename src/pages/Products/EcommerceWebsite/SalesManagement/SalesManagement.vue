<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import SalesManagementFeatures from './SalesManagementFeatures/SalesManagementFeatures.vue'
import SalesManagementProcess from './SalesManagementProcess/SalesManagementProcess.vue'
import SalesManagementGuides from './SalesManagementGuides/SalesManagementGuides.vue'

import {
  salesManagementHero,
  salesManagementFAQs
} from './SalesManagement.js'

import './SalesManagement.css'
</script>

<template>
  <main class="sales-management-page">
    <Hero v-bind="salesManagementHero" />

    <SalesManagementFeatures />
    <SalesManagementProcess />
    <SalesManagementGuides />

    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Sales Management."
      :items="salesManagementFAQs"
    />

    <Testimonials />
  </main>
</template>
