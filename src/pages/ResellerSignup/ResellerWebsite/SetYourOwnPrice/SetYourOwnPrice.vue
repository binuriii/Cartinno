<script setup>
import { setYourOwnPriceData as data } from './SetYourOwnPriceData.js'
import './SetYourOwnPrice.css'
const supportingPoints = data.benefits?.slice(0, 2) || []
</script>

<template>
  <section :id="data.id" class="syp-section" :class="`theme-${data.theme}`">
    <div class="syp-inner">
      <header class="syp-heading">
        <span>{{ data.eyebrow }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="syp-grid" :class="{ 'is-image-left': data.imageSide === 'left' }">
        <article class="syp-main">
          <div v-if="data.imageSide === 'left'" class="syp-image">
            <img :src="data.image" :alt="data.title" loading="lazy">
          </div>
          <div class="syp-copy">
            <div class="syp-card-top">
              <span class="syp-card-index">01</span>
              <span class="syp-card-label">{{ data.eyebrow }}</span>
            </div>
            <div class="syp-card-bottom">
              <h3>{{ data.title }}</h3>
              <p>{{ data.description }}</p>
            </div>
          </div>
          <div v-if="data.imageSide !== 'left'" class="syp-image">
            <img :src="data.image" :alt="data.title" loading="lazy">
          </div>
        </article>

        <article
          v-for="(point, index) in supportingPoints"
          :key="point"
          class="syp-card"
          :class="`support-card-${index + 1}`"
        >
          <div class="syp-card-top">
            <span class="syp-card-index">0{{ index + 2 }}</span>
            <span class="syp-card-label">{{ index === 0 ? 'THE ADVANTAGE' : 'MORE CONTROL' }}</span>
          </div>
          <div class="syp-card-bottom">
            <h3>{{ point }}</h3>
            <p>{{ index === 0 ? data.lead : data.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
