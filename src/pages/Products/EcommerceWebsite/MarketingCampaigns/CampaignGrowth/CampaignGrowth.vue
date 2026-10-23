<script setup>
import { campaignGrowthContent as content, campaignGrowthCards as cards } from './CampaignGrowth.js'
</script>
<template>
  <section class="mc-section mcg-section" data-mc-section aria-labelledby="mcg-heading">
    <div class="mc-shell">
      <header class="mc-heading" data-mc-reveal>
        <h2 id="mcg-heading">{{ content.headingFirst }}<span>{{ content.headingSecond }}</span></h2>
        <p>{{ content.description }}</p>
      </header>
      <div class="mcg-grid">
        <div v-for="(card,index) in cards" :key="card.id" class="mcg-reveal" data-mc-reveal :style="{ '--mc-delay': index * 110 + 'ms' }">
          <article class="mcg-card" :class="{ 'mcg-card--raised': index === 1 }">
            <img :src="card.image" :alt="card.alt" :style="{ objectPosition:card.position }" loading="lazy" decoding="async" width="1200" height="800">
            <div class="mcg-shade" aria-hidden="true"></div>
            <span class="mcg-number">{{ card.number }}</span>
            <div class="mcg-caption">
              <span class="mcg-tag">{{ card.tag }}</span>
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped src="./CampaignGrowth.css"></style>
