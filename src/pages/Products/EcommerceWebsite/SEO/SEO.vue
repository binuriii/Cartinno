<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import SEOFeatures from './SEOFeatures/SEOFeatures.vue'
import SEOProcess from './SEOProcess/SEOProcess.vue'

import { seoHero } from './SEO.js'
import { seoFAQs } from './SEO.js'
import SEOGuides from './SEOGuides/SEOGuides.vue'

import './SEOPage.css'
</script>

<template>
  <main class="seo-page">
    <!-- SHARED HERO -->
    <Hero v-bind="seoHero" />

    <!-- SEO SERVICES -->
    <SEOFeatures />

    <!-- SEO PROCESS -->
    <SEOProcess />
    <SEOGuides />

    <!-- SHARED FAQ -->
    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno SEO solutions."
      :items="seoFAQs"
    />

    <!-- SHARED TESTIMONIALS -->
    <Testimonials />
  </main>
</template>