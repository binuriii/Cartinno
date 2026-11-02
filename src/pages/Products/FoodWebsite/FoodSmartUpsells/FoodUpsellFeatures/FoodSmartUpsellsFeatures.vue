
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './FoodSmartUpsellsFeatures.css'

import {
  foodSmartUpsellsFeaturesContent as content,
  foodSmartUpsellsFeatures as features
} from './FoodSmartUpsellsFeaturesData.js'

const sectionRef = ref(null)
const visible = ref(false)
const imageFailed = ref(false)

let observer = null

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
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
    id="food-smart-upsells-features"
    class="fsu-section"
    :class="{ 'fsu-visible': visible }"
  >
    <div class="fsu-container">

      <!-- SECTION HEADING -->
      <header class="fsu-header">

        <h2 class="fsu-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>

      </header>

      <!-- TWO COLUMN LAYOUT -->
      <div class="fsu-layout">

        <!-- LEFT ILLUSTRATION -->
        <div class="fsu-image-card">

          <img
            v-if="content.image && !imageFailed"
            :src="content.image"
            :alt="content.imageAlt"
            class="fsu-image"
            loading="lazy"
            @error="imageFailed = true"
          />

          <!-- IMAGE PLACEHOLDER -->
          <div
            v-else
            class="fsu-image-placeholder"
          >
            <span class="fsu-placeholder-title">
              Smart Food Upsells
            </span>

            <p>
              Add your food upselling illustration
              inside the public folder.
            </p>

          </div>

        </div>

        <!-- RIGHT BENEFITS -->
        <div class="fsu-benefits">

          <article
            v-for="(feature, index) in features"
            :key="feature.id"
            class="fsu-benefit"
            :style="{ '--fsu-index': index }"
          >

            <div class="fsu-benefit-content">

              <h3 class="fsu-benefit-title">
                {{ feature.title }}
              </h3>

              <p class="fsu-benefit-description">
                {{ feature.description }}
              </p>

            </div>

          </article>

        </div>

      </div>

    </div>
  </section>
</template>
