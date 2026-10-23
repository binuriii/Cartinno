<script setup>
import { leadGrowthContent, leadGrowthCards } from './LeadGrowthData.js'
import LeadIcon from '../shared/LeadIcon.vue'
import './LeadGrowth.css'
</script>

<template>
  <section id="lead-growth" class="lmg-section" aria-labelledby="lmg-heading">
    <div class="lm-container">
      <header class="lmg-header" data-lead-reveal>
        <h2 id="lmg-heading">{{ leadGrowthContent.title1 }}<br />{{ leadGrowthContent.title2 }}</h2>
        <p>{{ leadGrowthContent.description }}</p>
      </header>

      <div class="lmg-grid">
        <article class="lmg-image-card lmg-main" data-lead-reveal>
          <img :src="leadGrowthCards[0].image" :alt="leadGrowthCards[0].alt" :style="{objectPosition: leadGrowthCards[0].position}" loading="lazy" decoding="async" />
          <div class="lmg-scrim"></div>
          <h3>{{ leadGrowthCards[0].title }}</h3>
        </article>

        <div class="lmg-right">
          <article v-for="card in leadGrowthCards.slice(1)" :key="card.id" class="lmg-image-card lmg-small" data-lead-reveal>
            <img :src="card.image" :alt="card.alt" :style="{ objectPosition: card.position }" loading="lazy" decoding="async" />
            <div class="lmg-scrim"></div>
            <h3>{{ card.title }}</h3>
          </article>
          <a class="lmg-cta" :href="leadGrowthContent.ctaHref" data-lead-reveal>
            <span><strong>{{ leadGrowthContent.ctaTitle }}</strong><small>{{ leadGrowthContent.ctaDescription }}</small></span>
            <span class="lmg-arrow"><LeadIcon name="arrow-right" /></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
