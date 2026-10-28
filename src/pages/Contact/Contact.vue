<script setup>
import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'
import { contactHero } from './Contact.js'
import ContactInquiry from './ContactInquiry/ContactInquiry.vue'
</script>

<template>
  <HeroTwo v-bind="contactHero" />
  <ContactInquiry />
</template>