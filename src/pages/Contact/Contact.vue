<script setup>
import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'

import {contactHero} from './Contact.js'
import ContactInquiry from './ContactInquiry/ContactInquiry.vue';


const base = import.meta.env.BASE_URL
</script>

<template>
  <HeroTwo v-bind="contactHero" />


  <ContactInquiry/>




</template>