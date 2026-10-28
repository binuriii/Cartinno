<script setup>
import FAQ from '../../components/InnerPages/FAQ/FAQ.vue';
import HeroTwo from '../../components/InnerPages/HeroTwo/HeroTwo.vue'
import Testimonials from '../../components/InnerPages/Testimonials/Testimonials.vue';

import {aboutUsHero} from './About.js'
import {aboutUsFAQs} from './About.js'
import AboutUnique from './AboutUnique/AboutUnique.vue';
import Missionsection from './Missionsection/Missionsection.vue';
import ReportingBenefits from './ReportingBenefits/ReportingBenefits.vue'

const base = import.meta.env.BASE_URL
</script>

<template>
  <HeroTwo v-bind="aboutUsHero" />

  <AboutUnique/>

  <Missionsection/>

  <ReportingBenefits/>
  
  <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno."
      :items="aboutUsFAQs"
    />

  <Testimonials/>



</template>