
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './FacebookFeatures.css'

import {
  facebookFeaturesContent,
  facebookFeaturesCards
} from './FacebookFeaturesData.js'

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
    id="facebook-features"
    class="fbf-section"
    :class="{ 'fbf-visible': isVisible }"
  >
    <div class="fbf-container">

      <!-- LEFT-ALIGNED HEADING -->
      <header class="fbf-header">

        <h2 class="fbf-heading">
          {{ facebookFeaturesContent.title1 }}
          <br />
          {{ facebookFeaturesContent.title2 }}
        </h2>

      </header>

      <!-- THREE STAGGERED FEATURE CARDS -->
      <div class="fbf-grid">

        <article
          v-for="(card, index) in facebookFeaturesCards"
          :key="card.id"
          class="fbf-card"
          :class="[
            `fbf-card-${card.theme}`,
            { 'fbf-card-middle': index === 1 }
          ]"
          :style="{ '--fbf-index': index }"
        >

          <!-- BACKGROUND IMAGE -->
          <div class="fbf-card-image-wrapper">

            <img
              v-if="hasImage(card)"
              class="fbf-card-image"
              :src="card.image"
              :alt="card.imageAlt"
              loading="lazy"
              @error="onImageError(card.id)"
            />

            <div
              v-else
              class="fbf-image-fallback"
              aria-hidden="true"
            >
              <i class="fa-solid fa-image"></i>
            </div>

            <div
              class="fbf-card-overlay"
              aria-hidden="true"
            ></div>

          </div>

          <!-- FLOATING WHITE CONTENT PANEL -->
          <div class="fbf-card-panel">

            <div class="fbf-card-text">

              <h3 class="fbf-card-title">
                {{ card.title }}
              </h3>

              <p class="fbf-card-description">
                {{ card.description }}
              </p>

            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
