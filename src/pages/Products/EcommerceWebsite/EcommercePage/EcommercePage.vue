
<script setup>
import './EcommercePage.css'

import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import {
  ecommerceFAQs
} from '../../../../components/InnerPages/FAQ/FAQData.js'
</script>

<template>
  <main class="ec-page">

    <!-- REUSABLE FAQ -->
    <FAQ
      title="Frequently Ask Questions"
      :items="ecommerceFAQs"
    />

    <Testimonials />

  </main>
</template>
