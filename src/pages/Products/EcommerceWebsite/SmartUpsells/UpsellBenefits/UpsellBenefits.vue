
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import './UpsellBenefits.css'

import {
  upsellBenefitsContent,
  upsellBenefits
} from './UpsellBenefitsData.js'

const sectionRef = ref(null)
const visible = ref(false)

let observer = null

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
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
    id="smart-upsells-benefits"
    class="su-section"
    :class="{ 'su-visible': visible }"
  >
    <div class="su-container">

      <!-- LEFT-ALIGNED SECTION HEADING -->
      <header class="su-header">

        <h2 class="su-heading">
          {{ upsellBenefitsContent.title1 }}<br />
          {{ upsellBenefitsContent.title2 }}
        </h2>

        <p class="su-description">
          {{ upsellBenefitsContent.description }}
        </p>

      </header>

      <!-- MAIN TWO-COLUMN LAYOUT -->
      <div class="su-layout">

        <!-- LEFT IMAGE -->
        <div class="su-image-card">

          <img
            v-if="upsellBenefitsContent.image"
            :src="upsellBenefitsContent.image"
            :alt="upsellBenefitsContent.imageAlt"
            class="su-image"
            loading="lazy"
          />

          <!-- IMAGE PLACEHOLDER -->
          <div v-else class="su-image-placeholder">

            <span class="su-placeholder-title">
              Smart Upsells Illustration
            </span>

            <p>
              Add your image URL in
              UpsellBenefitsData.js
            </p>

          </div>

        </div>

        <!-- RIGHT BENEFITS - NO ICONS -->
        <div class="su-benefits">

          <article
            v-for="(benefit, index) in upsellBenefits"
            :key="benefit.id"
            class="su-benefit"
            :style="{ '--su-index': index }"
          >

            <div class="su-benefit-content">

              <h3 class="su-benefit-title">
                {{ benefit.title }}
              </h3>

              <p class="su-benefit-description">
                {{ benefit.description }}
              </p>

            </div>

          </article>

        </div>

      </div>

    </div>
  </section>
</template>
