<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { enquiryOverviewHeading as heading, enquiryOverviewFeatures as features } from './EnquiryOverviewData.js'
import './EnquiryOverview.css'
const track = ref(null), atStart = ref(true), atEnd = ref(false)
function update() { const el=track.value; if(el){ atStart.value=el.scrollLeft<5; atEnd.value=el.scrollLeft+el.clientWidth>=el.scrollWidth-5 } }
function move(direction) { const el=track.value; if(!el)return; const card=el.querySelector('article'); el.scrollBy({left:direction*(card.getBoundingClientRect().width+28),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}) }
let observer
onMounted(()=>{observer=new ResizeObserver(update);observer.observe(track.value);update()})
onUnmounted(()=>observer?.disconnect())
function hideImage(event){event.currentTarget.hidden=true}
</script>
<template>
<section class="em-section eo-section" aria-labelledby="eo-title">
<div class="em-container">
 <header class="em-heading"><h2 id="eo-title">{{ heading.first }}<br>{{ heading.second }}</h2><p>{{ heading.description }}</p></header>
 <div id="enquiry-carousel" ref="track" class="eo-carousel" role="region" aria-label="Enquiry management features" tabindex="0" @scroll.passive="update">
  <article v-for="feature in features" :key="feature.id" class="eo-story">
   <img :src="feature.image" :alt="feature.alt" :style="{objectPosition: feature.imagePosition}" loading="lazy" width="800" height="1000" @error="hideImage">
   <div class="eo-shade"></div><div class="eo-copy"><span>{{ feature.number }}</span><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p></div>
  </article>
 </div>
 <div class="eo-arrows"><button type="button" aria-label="Previous enquiry feature" aria-controls="enquiry-carousel" :disabled="atStart" @click="move(-1)">←</button><button type="button" aria-label="Next enquiry feature" aria-controls="enquiry-carousel" :disabled="atEnd" @click="move(1)">→</button></div>
</div>
</section>
</template>
