
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  inventoryManagementHero
} from './InventoryManagementSystem.js'

import {
  inventoryManagementFAQs
} from './InventoryManagementSystem.js'
import InventoryFeatures from './InventoryFeatures/InventoryFeatures.vue'
import InventoryBenefits from './InventoryBenefits/InventoryBenefits.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="inventoryManagementHero" />

    <InventoryFeatures/>

    <InventoryBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="inventoryManagementFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


