<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import './LoyaltyBenefits.css'

import {
  loyaltyBenefitsContent,
  loyaltyBenefits
} from './LoyaltyBenefitsData.js'

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
      if (!entry?.isIntersecting) return

      visible.value = true
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
    id="loyalty-benefits"
    class="lr-section"
    :class="{ 'lr-visible': visible }"
  >
    <div class="lr-container">

      <!-- LEFT-ALIGNED SECTION HEADING -->
      <header class="lr-header">
        <h2 class="lr-heading">
          {{ loyaltyBenefitsContent.title1 }}<br />
          {{ loyaltyBenefitsContent.title2 }}
        </h2>

        <p class="lr-description">
          {{ loyaltyBenefitsContent.description }}
        </p>
      </header>

      <!-- MAIN TWO-COLUMN LAYOUT -->
      <div class="lr-layout">

        <!-- LEFT ILLUSTRATION -->
        <div class="lr-image-card">
          <img
            v-if="loyaltyBenefitsContent.image"
            :src="loyaltyBenefitsContent.image"
            :alt="loyaltyBenefitsContent.imageAlt"
            class="lr-image"
            loading="lazy"
          />

          <div v-else class="lr-image-placeholder">
            <span class="lr-placeholder-title">
              Loyalty and Rewards
            </span>

            <p>
              Add your illustration path in
              LoyaltyBenefitsData.js.
            </p>
          </div>
        </div>

        <!-- RIGHT BENEFITS -->
        <div class="lr-benefits">
          <article
            v-for="(benefit, index) in loyaltyBenefits"
            :key="benefit.id"
            class="lr-benefit"
            :style="{ '--lr-index': index }"
          >
            <div class="lr-benefit-content">
              <h3 class="lr-benefit-title">
                {{ benefit.title }}
              </h3>

              <p class="lr-benefit-description">
                {{ benefit.description }}
              </p>
            </div>
          </article>
        </div>

      </div>
    </div>
  </section>
</template>