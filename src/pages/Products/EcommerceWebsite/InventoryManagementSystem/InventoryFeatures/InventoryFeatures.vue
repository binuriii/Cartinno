
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  inventoryFeaturesContent,
  inventoryFeatures
} from './InventoryFeaturesData.js'

import './InventoryFeatures.css'

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
    id="inventory-features"
    class="imf-section"
    :class="{ 'imf-visible': visible }"
  >
    <div class="imf-container">

      <!-- SECTION HEADING -->
      <header class="imf-header">

        <h2 class="imf-heading">
          {{ inventoryFeaturesContent.title1 }}
          <span>
            {{ inventoryFeaturesContent.title2 }}
          </span>
        </h2>

        <p class="imf-description">
          {{ inventoryFeaturesContent.description }}
        </p>

      </header>

      <!-- SAME TWO-COLUMN LAYOUT AS SMART UPSELLS -->
      <div class="imf-layout">

        <!-- LEFT IMAGE CARD -->
        <div class="imf-image-card">

          <img
            v-if="
              inventoryFeaturesContent.image &&
              !imageFailed
            "
            :src="inventoryFeaturesContent.image"
            :alt="inventoryFeaturesContent.imageAlt"
            class="imf-image"
            loading="lazy"
            @error="imageFailed = true"
          />

          <!-- FALLBACK -->
          <div
            v-else
            class="imf-image-placeholder"
          >
            <span class="imf-placeholder-icon">
              <i class="fa-solid fa-boxes-stacked"></i>
            </span>

            <span class="imf-placeholder-title">
              Inventory Management
            </span>

            <p>
              Products, stock levels, and inventory
              updates in one connected place.
            </p>
          </div>

        </div>

        <!-- RIGHT FEATURES — NO ICONS -->
        <div class="imf-benefits">

          <article
            v-for="(feature, index) in inventoryFeatures"
            :key="feature.id"
            class="imf-benefit"
            :style="{ '--imf-index': index }"
          >
            <div class="imf-benefit-content">

              <h3 class="imf-benefit-title">
                {{ feature.title }}
              </h3>

              <p class="imf-benefit-description">
                {{ feature.description }}
              </p>

            </div>

          </article>

        </div>

      </div>

    </div>
  </section>
</template>
