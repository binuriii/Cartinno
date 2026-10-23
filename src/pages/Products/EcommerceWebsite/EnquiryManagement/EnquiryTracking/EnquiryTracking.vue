<script setup>
import { enquiryTrackingHeading as heading, enquiryTrackingFeatures as features, enquiryTrackingImages as images } from './EnquiryTrackingData.js'
import './EnquiryTracking.css'
function hideImage(event) { event.currentTarget.hidden = true }
</script>
<template>
<section class="em-section et-section" aria-labelledby="et-title"><div class="em-container">
  <div class="et-editorial">
    <div class="et-left">
      <header class="et-heading"><h2 id="et-title">{{ heading.first }}<br>{{ heading.second }}</h2><p>{{ heading.description }}</p></header>
      <div class="et-picture et-picture-left"><img :src="images[0].image" :alt="images[0].alt" :style="{objectPosition:images[0].imagePosition}" width="1100" height="1200" loading="lazy" @error="hideImage"></div>
    </div>
    <div class="et-right">
      <div class="et-picture et-picture-large"><img :src="images[1].image" :alt="images[1].alt" :style="{objectPosition:images[1].imagePosition}" width="1300" height="1400" loading="lazy" @error="hideImage"></div>
      <div class="et-picture et-picture-small"><img :src="images[2].image" :alt="images[2].alt" :style="{objectPosition:images[2].imagePosition}" width="1000" height="650" loading="lazy" @error="hideImage"></div>
    </div>
  </div>
  <div class="et-feature-list"><article v-for="(feature,index) in features" :key="feature.id" :class="'et-feature-card et-card-'+index"><span class="et-card-number">{{ feature.number }}</span><div><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p></div></article></div>
</div></section>
</template>
