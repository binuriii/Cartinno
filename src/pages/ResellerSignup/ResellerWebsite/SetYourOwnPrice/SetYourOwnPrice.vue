<script setup>
import { setYourOwnPriceData as data } from './SetYourOwnPriceData.js'
import './SetYourOwnPrice.css'
const supportingPoints = data.benefits?.slice(0, 2) || []
</script>

<template>
  <section :id="data.id" class="reseller-feature-section reseller-style-b" :class="`theme-${data.theme}`">
    <div class="reseller-feature-inner">
      <header class="reseller-section-head">
        <span class="reseller-section-eyebrow">{{ data.eyebrow }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="reseller-showcase-grid" :class="`image-${data.imageSide}`">
        <article class="reseller-showcase-main">
          <div v-if="data.imageSide === 'left'" class="reseller-showcase-image">
            <img :src="data.image" :alt="data.title" loading="lazy">
          </div>
          <div class="reseller-showcase-copy">
            <div class="reseller-card-top">
              <span class="reseller-card-index">01</span>
              <span class="reseller-card-label">{{ data.eyebrow }}</span>
            </div>
            <div class="reseller-card-bottom">
              <h3>{{ data.title }}</h3>
              <p>{{ data.description }}</p>
            </div>
          </div>
          <div v-if="data.imageSide !== 'left'" class="reseller-showcase-image">
            <img :src="data.image" :alt="data.title" loading="lazy">
          </div>
        </article>

        <article v-for="(point, index) in supportingPoints" :key="point" class="reseller-showcase-card" :class="`support-card-${index + 1}`">
          <div class="reseller-card-top">
            <span class="reseller-card-index">0{{ index + 2 }}</span>
            <span class="reseller-card-label">{{ index === 0 ? 'THE ADVANTAGE' : 'MORE CONTROL' }}</span>
          </div>
          <div class="reseller-card-bottom">
            <h3>{{ point }}</h3>
            <p>{{ index === 0 ? data.lead : data.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
