
<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  reportingAnalyticsHero
} from './ReportingAnalytics.js'

import {
  reportingAnalyticsFAQs
} from './ReportingAnalytics.js'
import ReportingFeatures from './ReportingFeatures/ReportingFeatures.vue'
import ReportingBenefits from './ReportingBenefits/ReportingBenefits.vue'
</script>

<template>
  <main class="smart-upsells-page">

    <!-- HERO -->
    <Hero v-bind="reportingAnalyticsHero" />

    <ReportingFeatures/>

    <ReportingBenefits/>

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Review Engine."
      :items="reportingAnalyticsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


