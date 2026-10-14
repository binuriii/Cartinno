
<script setup>

import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'  
import BusinessSupport from './BusinessSupportData/BusinessSupport.vue';
import {
  ecommerceFAQs
} from '../../../../components/InnerPages/FAQ/FAQData.js'


</script>

<template>
  <main class="ec-page">

    <BusinessSupport />
    <!-- REUSABLE FAQ -->
    <FAQ
      title="Frequently Ask Questions"
      :items="ecommerceFAQs"
    />
    <Testimonials />  

  </main>
</template>
