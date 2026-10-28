<script setup>
import FAQ from '../../components/InnerPages/FAQ/FAQ.vue';
import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'
import Testimonials from '../../components/InnerPages/Testimonials/Testimonials.vue';

import {contactHero} from './Contact.js'
import {contactFAQs} from './Contact.js'
import Contactoffices from './Contactoffices/Contactoffices.vue';


const base = import.meta.env.BASE_URL
</script>

<template>
  <HeroTwo v-bind="contactHero" />

  <Contactoffices/>





</template>