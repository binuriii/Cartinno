
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import PushNotificationFeatures from './PushNotificationFeatures/PushNotificationFeatures.vue'

import {
  pushNotificationHero
} from './PushNotificationMarketing.js'

import {
  pushNotificationFAQs
} from './PushNotificationMarketing.js'
import PushNotificationBenefits from './PushNotificationBenefits/PushNotificationBenefits.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="pushNotificationHero" />

    <PushNotificationFeatures/>

    <PushNotificationBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Push Notifications."
      :items="pushNotificationFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


