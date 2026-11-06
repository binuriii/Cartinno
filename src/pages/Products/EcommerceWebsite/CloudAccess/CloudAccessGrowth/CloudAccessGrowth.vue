<script setup>
import LeadIcon from '../shared/LeadIcon.vue'
import { cloudAccessGrowthContent, cloudAccessGrowthCards } from './CloudAccessGrowthData.js'
import './CloudAccessGrowth.css'
</script>

<template>
  <section id="cloud-access-growth" class="cag-section" aria-labelledby="cag-heading">
    <div class="lm-container">
      <header class="cag-header" data-cloud-reveal>
        <h2 id="cag-heading">{{ cloudAccessGrowthContent.title1 }}<br />{{ cloudAccessGrowthContent.title2 }}</h2>
        <p>{{ cloudAccessGrowthContent.description }}</p>
      </header>

      <div class="cag-grid">
        <article class="cag-image-card cag-main" data-cloud-reveal>
          <img :src="cloudAccessGrowthCards[0].image" :alt="cloudAccessGrowthCards[0].alt" :style="{ objectPosition: cloudAccessGrowthCards[0].position }" loading="lazy" decoding="async" />
          <div class="cag-scrim"></div>
          <h3>{{ cloudAccessGrowthCards[0].title }}</h3>
        </article>

        <div class="cag-right">
          <article v-for="card in cloudAccessGrowthCards.slice(1)" :key="card.id" class="cag-image-card cag-small" data-cloud-reveal>
            <img :src="card.image" :alt="card.alt" :style="{ objectPosition: card.position }" loading="lazy" decoding="async" />
            <div class="cag-scrim"></div>
            <h3>{{ card.title }}</h3>
          </article>
          <a class="cag-cta" :href="cloudAccessGrowthContent.ctaHref" data-cloud-reveal>
            <span><strong>{{ cloudAccessGrowthContent.ctaTitle }}</strong><small>{{ cloudAccessGrowthContent.ctaDescription }}</small></span>
            <span class="cag-arrow"><LeadIcon name="arrow-right" /></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
