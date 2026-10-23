
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './WhatsAppFeatures.css'

import {
  whatsAppFeaturesContent,
  whatsAppFeaturesCards
} from './WhatsAppFeaturesData.js'

const sectionRef = ref(null)
const isVisible = ref(false)
const failedImages = ref(new Set())

let observer = null

function hasImage(card) {
  return Boolean(card.image) &&
    !failedImages.value.has(card.id)
}

function onImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

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
    id="whatsapp-features"
    class="waf-section"
    :class="{ 'waf-visible': isVisible }"
  >
    <div class="waf-container">

      <!-- LEFT-ALIGNED SECTION HEADING -->
      <header class="waf-header">

        <h2 class="waf-heading">
          {{ whatsAppFeaturesContent.title1 }}
          <br />
          {{ whatsAppFeaturesContent.title2 }}
        </h2>

      </header>

      <!-- THREE STAGGERED FEATURE CARDS -->
      <div class="waf-grid">

        <article
          v-for="(card, index) in whatsAppFeaturesCards"
          :key="card.id"
          class="waf-card"
          :class="[
            `waf-card-${card.theme}`,
            { 'waf-card-middle': index === 1 }
          ]"
          :style="{ '--waf-index': index }"
        >

          <!-- CARD IMAGE -->
          <div class="waf-card-image-wrapper">

            <img
              v-if="hasImage(card)"
              class="waf-card-image"
              :src="card.image"
              :alt="card.imageAlt"
              loading="lazy"
              @error="onImageError(card.id)"
            />

            <div
              v-else
              class="waf-image-fallback"
              aria-hidden="true"
            >
              <i class="fa-brands fa-whatsapp"></i>
            </div>

            <div
              class="waf-card-overlay"
              aria-hidden="true"
            ></div>

          </div>

          <!-- FLOATING WHITE CONTENT PANEL -->
          <div class="waf-card-panel">

            <div class="waf-card-text">

              <h3 class="waf-card-title">
                {{ card.title }}
              </h3>

              <p class="waf-card-description">
                {{ card.description }}
              </p>

            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
