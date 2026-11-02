<script setup>

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'


import {
  reportingAnalyticsHero
} from './ReportingAnalyticsPage.js'

import {
  reportingAnalyticsFAQs
} from './ReportingAnalyticsPage.js'

import ReportingSection from './ReportingSection/ReportingSection.vue'
import AnalyticsSection from './AnalyticsSection/AnalyticsSection.vue'

</script>


<template>
  <main class="reporting-analytics-page">

    <!-- HERO -->
    <Hero v-bind="reportingAnalyticsHero" />

    <AnalyticsSection />

    <ReportingSection />

    <!-- FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Reporting Analytics."
      :items="reportingAnalyticsFAQs"
    />

    <!-- TESTIMONIALS -->
    <Testimonials />

  </main>
</template>


