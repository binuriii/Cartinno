<script setup>
import { noNeedToFindVendorsData as data } from './NoNeedToFindVendorsData.js'
import './NoNeedToFindVendors.css'
const supportingPoints = data.benefits?.slice(0, 2) || []
</script>

<template>
  <section :id="data.id" class="nvf-section" :class="`theme-${data.theme}`">
    <div class="nvf-inner">
      <header class="nvf-heading">
        <span>{{ data.eyebrow }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="nvf-grid" :class="{ 'is-image-left': data.imageSide === 'left' }">
        <article class="nvf-main">
          <div v-if="data.imageSide === 'left'" class="nvf-image">
            <img :src="data.image" :alt="data.title" loading="lazy">
          </div>
          <div class="nvf-copy">
            <div class="nvf-card-top">
              <span class="nvf-card-index">01</span>
              <span class="nvf-card-label">{{ data.eyebrow }}</span>
            </div>
            <div class="nvf-card-bottom">
              <h3>{{ data.title }}</h3>
              <p>{{ data.description }}</p>
            </div>
          </div>
          <div v-if="data.imageSide !== 'left'" class="nvf-image">
            <img :src="data.image" :alt="data.title" loading="lazy">
          </div>
        </article>

        <article
          v-for="(point, index) in supportingPoints"
          :key="point"
          class="nvf-card"
          :class="`support-card-${index + 1}`"
        >
          <div class="nvf-card-top">
            <span class="nvf-card-index">0{{ index + 2 }}</span>
            <span class="nvf-card-label">{{ index === 0 ? 'THE ADVANTAGE' : 'MORE CONTROL' }}</span>
          </div>
          <div class="nvf-card-bottom">
            <h3>{{ point }}</h3>
            <p>{{ index === 0 ? data.lead : data.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
