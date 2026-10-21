
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  inventoryBenefitsContent as content,
  inventoryBenefits as benefits
} from './InventoryBenefitsData.js'

import './InventoryBenefits.css'

const sectionRef = ref(null)
const visible = ref(false)
const failedImages = ref(new Set())

let observer = null

function hasImage(key) {
  return Boolean(content.images[key]) &&
    !failedImages.value.has(key)
}

function onImageError(key) {
  failedImages.value = new Set([
    ...failedImages.value,
    key
  ])
}

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
    id="inventory-benefits"
    class="imb-section"
    :class="{ 'imb-visible': visible }"
  >
    <div class="imb-container">

      <!-- CENTERED SECTION HEADER -->
      <header class="imb-header">

        <h2 class="imb-heading">
          {{ content.title }}
        </h2>

        <p class="imb-description">
          {{ content.description }}
        </p>

      </header>

      <!-- EDITORIAL GRID -->
      <div class="imb-grid">

        <!-- LARGE LEFT IMAGE -->
        <div class="imb-main-image imb-image-card">

          <img
            v-if="hasImage('main')"
            :src="content.images.main"
            :alt="content.imageAlts.main"
            loading="lazy"
            @error="onImageError('main')"
          />

          <div
            v-else
            class="imb-image-fallback"
          >
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>

        </div>

        <!-- TOP MIDDLE IMAGE -->
        <div class="imb-top-image imb-image-card">

          <img
            v-if="hasImage('top')"
            :src="content.images.top"
            :alt="content.imageAlts.top"
            loading="lazy"
            @error="onImageError('top')"
          />

          <div
            v-else
            class="imb-image-fallback"
          >
            <i class="fa-solid fa-warehouse"></i>
          </div>

        </div>

        <!-- FEATURED COLORED CARD -->
        <div class="imb-highlight-card">

          <h3>
            {{ content.highlightTitle }}
          </h3>

          <p>
            {{ content.highlightDescription }}
          </p>

        </div>

        <!-- RIGHT IMAGE -->
        <div class="imb-right-image imb-image-card">

          <img
            v-if="hasImage('right')"
            :src="content.images.right"
            :alt="content.imageAlts.right"
            loading="lazy"
            @error="onImageError('right')"
          />

          <div
            v-else
            class="imb-image-fallback"
          >
            <i class="fa-solid fa-store"></i>
          </div>

        </div>

        <!-- THREE BENEFITS -->
        <div class="imb-benefits">

          <article
            v-for="(benefit, index) in benefits"
            :key="benefit.id"
            class="imb-benefit"
            :style="{ '--imb-index': index }"
          >

            <div class="imb-benefit-heading">

              <h3>
                {{ benefit.title }}
              </h3>

            </div>

            <p>
              {{ benefit.description }}
            </p>

          </article>

        </div>

      </div>

    </div>
  </section>
</template>
