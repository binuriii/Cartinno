<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './FoodMarketingCampaignsFeatures.css'

import {
  foodMarketingCampaignsContent as content,
  foodMarketingCampaignsCards as cards
} from './FoodMarketingCampaignsFeaturesData.js'

const sectionRef = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reduceMotion ||
    !('IntersectionObserver' in window)
  ) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    {
      threshold: 0.12
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="food-marketing-campaigns-features"
    class="fmc-section"
    :class="{ 'fmc-visible': isVisible }"
  >
    <div class="fmc-container">

      <!-- LEFT-ALIGNED HEADING -->
      <header class="fmc-header">

        <h2 class="fmc-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>

        <p class="fmc-description">
          {{ content.description }}
        </p>

      </header>

      <!-- THREE STAGGERED CARDS -->
      <div class="fmc-grid">

        <article
          v-for="(card, index) in cards"
          :key="card.id"
          class="fmc-card"
          :class="[
            `fmc-card-${card.theme}`,
            { 'fmc-card-middle': index === 1 }
          ]"
          :style="{ '--fmc-index': index }"
        >

          <!-- IMAGE -->
          <div class="fmc-card-image-wrapper">

            <img
              class="fmc-card-image"
              :src="card.image"
              :alt="card.imageAlt"
              loading="lazy"
            />

            <div
              class="fmc-card-overlay"
              aria-hidden="true"
            ></div>

          </div>

          <!-- NUMBER -->
          <span class="fmc-card-number">
            {{ card.number }}
          </span>

          <!-- FLOATING CONTENT PANEL -->
          <div class="fmc-card-panel">

            <div class="fmc-card-text">

              <h3 class="fmc-card-title">
                {{ card.title }}
              </h3>

              <p class="fmc-card-description">
                {{ card.description }}
              </p>

            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>