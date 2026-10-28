<script setup>
import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'

import {contactHero} from './Contact.js'
import ContactInquiry from './ContactInquiry/ContactInquiry.vue';
import ContactOffices from './ContactOffices/ContactOffices.vue';


const base = import.meta.env.BASE_URL
</script>

<template>
  <HeroTwo v-bind="contactHero" />

  <ContactOffices/>

  <ContactInquiry/>




</template>