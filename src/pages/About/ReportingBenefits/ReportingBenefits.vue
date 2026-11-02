
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  reportingBenefitsContent as content,
  reportingBenefits as benefits,
  reportingBenefitsCTA as cta
} from './ReportingBenefitsData.js'

import './ReportingBenefits.css'

const sectionRef = ref(null)
const isVisible = ref(false)
const failedImages = ref(new Set())

let observer = null

function hasImage(benefit) {
  return Boolean(benefit.image) &&
    !failedImages.value.has(benefit.id)
}

function onImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
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
    {
      threshold: 0.08,
      rootMargin: '0px 0px -5% 0px'
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
    id="reporting-benefits"
    class="rpb-section"
    :class="{ 'rpb-visible': isVisible }"
  >
    <div class="rpb-container">

      <!-- LEFT-ALIGNED HEADING -->
      <header class="rpb-header">
        <h2 class="rpb-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>
      </header>

      <!-- ASYMMETRIC CARD GRID -->
      <div class="rpb-grid">

        <!-- LARGE LEFT IMAGE -->
        <article
          class="rpb-card rpb-card-main"
        >
          <img
            v-if="hasImage(benefits[0])"
            :src="benefits[0].image"
            :alt="benefits[0].imageAlt"
            class="rpb-card-image"
            loading="lazy"
            @error="onImageError(benefits[0].id)"
          />

          <div
            v-else
            class="rpb-image-fallback"
          ></div>

          <div
            class="rpb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="rpb-card-content">
            <h3>{{ benefits[0].title }}</h3>
            <p>{{ benefits[0].description }}</p>
          </div>
        </article>

        <!-- UPPER MIDDLE IMAGE -->
        <article
          class="rpb-card rpb-card-middle"
        >
          <img
            v-if="hasImage(benefits[1])"
            :src="benefits[1].image"
            :alt="benefits[1].imageAlt"
            class="rpb-card-image"
            loading="lazy"
            @error="onImageError(benefits[1].id)"
          />

          <div
            v-else
            class="rpb-image-fallback"
          ></div>

          <div
            class="rpb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="rpb-card-content">
            <h3>{{ benefits[1].title }}</h3>
            <p>{{ benefits[1].description }}</p>
          </div>
        </article>

        <!-- UPPER RIGHT IMAGE -->
        <article
          class="rpb-card rpb-card-right"
        >
          <img
            v-if="hasImage(benefits[2])"
            :src="benefits[2].image"
            :alt="benefits[2].imageAlt"
            class="rpb-card-image"
            loading="lazy"
            @error="onImageError(benefits[2].id)"
          />

          <div
            v-else
            class="rpb-image-fallback"
          ></div>

          <div
            class="rpb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="rpb-card-content">
            <h3>{{ benefits[2].title }}</h3>
            <p>{{ benefits[2].description }}</p>
          </div>
        </article>

        <!-- YELLOW CTA CARD -->
        <div class="rpb-cta">
          <div class="rpb-cta-content">
            <h3>{{ cta.title }}</h3>
            <p>{{ cta.description }}</p>
          </div>

          <a
            :href="cta.buttonLink"
            class="rpb-cta-button"
            :aria-label="cta.buttonLabel"
            :title="cta.buttonLabel"
          >
            <i
              class="fa-solid fa-chevron-right"
              aria-hidden="true"
            ></i>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>
