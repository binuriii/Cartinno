<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import DeliveryPeople from './DeliveryPeople/DeliveryPeople.vue'
import DeliveryOperations from './DeliveryOperations/DeliveryOperations.vue'
import DeliveryCoverage from './DeliveryCoverage/DeliveryCoverage.vue'

import {
  deliveryHero,
  deliveryFAQs
} from './Delivery.js'

import './Delivery.css'
</script>

<template>
  <main class="delivery-page">
    <!-- SHARED HERO -->
    <Hero v-bind="deliveryHero" />

    <!-- ROUNDED SECTION OVERLAPPING HERO -->
    <DeliveryPeople />

    <!-- DELIVERY WORKFLOW -->
    <DeliveryOperations />

    <!-- CONNECTED DELIVERY JOURNEY -->
    <DeliveryCoverage />

    <!-- SHARED FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Delivery."
      :items="deliveryFAQs"
    />

    <!-- SHARED TESTIMONIALS -->
    <Testimonials />
  </main>
</template>