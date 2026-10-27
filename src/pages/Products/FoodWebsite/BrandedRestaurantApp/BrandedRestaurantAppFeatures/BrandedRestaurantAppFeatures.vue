<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './BrandedRestaurantAppFeatures.css'

import {
  brandedRestaurantAppFeaturesContent as content,
  brandedRestaurantAppFeatures as features,
  brandedRestaurantAppPreview as preview
} from './BrandedRestaurantAppFeaturesData.js'

const sectionRef = ref(null)
const visible = ref(false)
const imageFailed = ref(false)

let observer = null

onMounted(() => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return

      visible.value = true
      observer?.disconnect()
      observer = null
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
    id="branded-restaurant-app-features"
    class="bra-section"
    :class="{ 'bra-visible': visible }"
  >
    <div class="bra-container">

      <!-- SECTION HEADING -->
      <header class="bra-header">
        <h2 class="bra-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- TWO-COLUMN LAYOUT -->
      <div class="bra-layout">

        <!-- LEFT: APP PREVIEW IMAGE -->
        <div class="bra-image-card">

          <img
            v-if="!imageFailed"
            class="bra-preview-image"
            :src="preview.image"
            :alt="preview.imageAlt"
            loading="lazy"
            @error="imageFailed = true"
          />

          <div
            v-else
            class="bra-image-fallback"
          >
            <span>Branded Restaurant App</span>
          </div>

        </div>

        <!-- RIGHT: BENEFITS -->
        <div class="bra-benefits">

          <article
            v-for="(feature, index) in features"
            :key="feature.id"
            class="bra-benefit"
            :style="{ '--bra-index': index }"
          >
            <div class="bra-benefit-content">

              <h3 class="bra-benefit-title">
                {{ feature.title }}
              </h3>

              <p class="bra-benefit-description">
                {{ feature.description }}
              </p>

            </div>
          </article>

        </div>

      </div>

    </div>
  </section>
</template>