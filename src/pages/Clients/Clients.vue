<script setup>
import FAQ from '../../components/InnerPages/FAQ/FAQ.vue';
import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'
import Testimonials from '../../components/InnerPages/Testimonials/Testimonials.vue';

import {clientsHero} from './Clients.js'
import {clientsFAQs} from './Clients.js'
import ClientsTrustedBrands from './ClientsTrustedBrands/ClientsTrustedBrands.vue';


const base = import.meta.env.BASE_URL
</script>

<template>
  <HeroTwo v-bind="clientsHero" />

  <ClientsTrustedBrands/>
  
  <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Cloud POS FAQs."
      :items="clientsFAQs"
    />

  <Testimonials/>



</template>