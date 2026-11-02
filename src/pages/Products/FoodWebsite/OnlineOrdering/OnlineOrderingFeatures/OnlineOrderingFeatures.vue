<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './OnlineOrderingFeatures.css'

import {
  onlineOrderingFeaturesContent as content,
  onlineOrderingFeatures as features
} from './OnlineOrderingFeaturesData.js'

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
    ([entry]) => {
      if (!entry?.isIntersecting) return

      isVisible.value = true
      observer?.disconnect()
      observer = null
    },
    { threshold: 0.12 }
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
    id="online-ordering-features"
    class="oof-section"
    :class="{ 'oof-visible': isVisible }"
  >
    <div class="oof-container">

      <!-- LEFT-ALIGNED SECTION HEADING -->
      <header class="oof-header">

        <h2 class="oof-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>

      </header>

      <!-- THREE STAGGERED CARDS -->
      <div class="oof-grid">

        <article
          v-for="(card, index) in features"
          :key="card.id"
          class="oof-card"
          :class="[
            `oof-card-${card.theme}`,
            { 'oof-card-middle': index === 1 }
          ]"
          :style="{ '--oof-index': index }"
        >

          <!-- BACKGROUND IMAGE -->
          <div class="oof-card-image-wrapper">

            <img
              v-if="hasImage(card)"
              class="oof-card-image"
              :src="card.image"
              :alt="card.imageAlt"
              loading="lazy"
              @error="onImageError(card.id)"
            />

            <div
              v-else
              class="oof-card-image-fallback"
              aria-hidden="true"
            ></div>

            <div
              class="oof-card-overlay"
              aria-hidden="true"
            ></div>

          </div>

          <!-- FLOATING WHITE CONTENT PANEL -->
          <div class="oof-card-panel">

            <div class="oof-card-text">

              <h3 class="oof-card-title">
                {{ card.title }}
              </h3>

              <p class="oof-card-description">
                {{ card.description }}
              </p>

            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
