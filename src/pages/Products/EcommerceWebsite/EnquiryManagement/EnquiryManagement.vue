<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import EnquiryOverview from './EnquiryOverview/EnquiryOverview.vue'
import EnquiryTracking from './EnquiryTracking/EnquiryTracking.vue'
import CustomerRelationships from './CustomerRelationships/CustomerRelationships.vue'
import { enquiryHero, enquiryFAQs } from './EnquiryManagement.js'
import './EnquiryManagement.css'
</script>
<template>
  <main class="enquiry-page">
    <Hero v-bind="enquiryHero" />
    <EnquiryOverview />
     <CustomerRelationships />
    <EnquiryTracking />
    <FAQ title="Frequently Asked Questions" description="Get to know Cartinno Enquiry Management." :items="enquiryFAQs" />
    <Testimonials />
  </main>
</template>
