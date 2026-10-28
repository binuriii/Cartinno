<script setup>
import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'
import { contactHero } from './Contact.js'
import ContactInquiry from './ContactInquiry/ContactInquiry.vue'
import OfficeDirectory from './OfficeDirectory/OfficeDirectory.vue';
</script>

<template>
  <HeroTwo v-bind="contactHero" />
  <OfficeDirectory/>
  <ContactInquiry />
</template>