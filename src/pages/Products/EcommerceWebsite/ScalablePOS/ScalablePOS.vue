<script setup>
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import { scalablePOSHero } from './ScalablePOS.js'
import ScalablePOSFeatures from './ScalablePOSFeatures/ScalablePOSFeatures.vue'
import ScalablePOSStory from './ScalablePOSStory/ScalablePOSStory.vue'
import ScalablePOSJourney from './ScalablePOSJourney/ScalablePOSJourney.vue'
import './ScalablePOS.css'
</script>

<template>
  <main class="scalable-pos-page">
    <Hero v-bind="scalablePOSHero" />
    <ScalablePOSFeatures />
    <ScalablePOSStory />
    <ScalablePOSJourney />
  </main>
</template>
