
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  listingsBenefitsContent as content,
  listingsBenefits as benefits,
  listingsBenefitsCTA as cta
} from './ListingsBenefitsData.js'

import './ListingsBenefits.css'

const sectionRef = ref(null)
const isVisible = ref(false)
const failedImages = ref(new Set())

let observer = null

function hasImage(benefit) {
  return Boolean(benefit?.image) &&
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
    id="listings-benefits"
    class="lmb-section"
    :class="{ 'lmb-visible': isVisible }"
  >
    <div class="lmb-container">

      <!-- SECTION HEADING -->
      <header class="lmb-header">
        <h2 class="lmb-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>
      </header>

      <!-- ASYMMETRIC GRID -->
      <div class="lmb-grid">

        <!-- LARGE LEFT IMAGE -->
        <article class="lmb-card lmb-card-main">
          <img
            v-if="hasImage(benefits[0])"
            :src="benefits[0].image"
            :alt="benefits[0].imageAlt"
            class="lmb-card-image"
            loading="lazy"
            @error="onImageError(benefits[0].id)"
          />

          <div
            v-else
            class="lmb-image-fallback"
            aria-hidden="true"
          ></div>

          <div
            class="lmb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="lmb-card-content">
            <h3>{{ benefits[0].title }}</h3>
            <p>{{ benefits[0].description }}</p>
          </div>
        </article>

        <!-- TOP MIDDLE IMAGE -->
        <article class="lmb-card lmb-card-middle">
          <img
            v-if="hasImage(benefits[1])"
            :src="benefits[1].image"
            :alt="benefits[1].imageAlt"
            class="lmb-card-image"
            loading="lazy"
            @error="onImageError(benefits[1].id)"
          />

          <div
            v-else
            class="lmb-image-fallback"
            aria-hidden="true"
          ></div>

          <div
            class="lmb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="lmb-card-content">
            <h3>{{ benefits[1].title }}</h3>
            <p>{{ benefits[1].description }}</p>
          </div>
        </article>

        <!-- TOP RIGHT IMAGE -->
        <article class="lmb-card lmb-card-right">
          <img
            v-if="hasImage(benefits[2])"
            :src="benefits[2].image"
            :alt="benefits[2].imageAlt"
            class="lmb-card-image"
            loading="lazy"
            @error="onImageError(benefits[2].id)"
          />

          <div
            v-else
            class="lmb-image-fallback"
            aria-hidden="true"
          ></div>

          <div
            class="lmb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="lmb-card-content">
            <h3>{{ benefits[2].title }}</h3>
            <p>{{ benefits[2].description }}</p>
          </div>
        </article>

        <!-- YELLOW CTA -->
        <div class="lmb-cta">

          <div class="lmb-cta-content">
            <h3>{{ cta.title }}</h3>
            <p>{{ cta.description }}</p>
          </div>

          <a
            :href="cta.buttonLink"
            class="lmb-cta-button"
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
