
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  whyDifferentContent as content,
  whyDifferentBenefits as benefits
} from './WhyDifferentData.js'

import './WhyDifferent.css'

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
    id="why-different"
    class="wd-section"
    :class="{ 'wd-visible': isVisible }"
  >
    <div class="wd-container">

      <!-- LEFT-ALIGNED HEADING -->
      <header class="wd-header">
        <h2 class="wd-heading">
          {{ content.title }}
        </h2>

        <p class="wd-description">
          {{ content.description }}
        </p>
      </header>

      <!-- ASYMMETRIC CARD GRID -->
      <div class="wd-grid">

        <!-- LARGE LEFT IMAGE -->
        <article class="wd-card wd-card-main">

          <img
            v-if="hasImage(benefits[0])"
            :src="benefits[0].image"
            :alt="benefits[0].imageAlt"
            class="wd-card-image"
            loading="lazy"
            @error="onImageError(benefits[0].id)"
          />

          <div
            v-else
            class="wd-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-chart-line"></i>
          </div>

          <div
            class="wd-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="wd-card-content">
            <h3>{{ benefits[0].title }}</h3>
            <p>{{ benefits[0].description }}</p>
          </div>

        </article>

        <!-- UPPER MIDDLE IMAGE -->
        <article class="wd-card wd-card-middle">

          <img
            v-if="hasImage(benefits[1])"
            :src="benefits[1].image"
            :alt="benefits[1].imageAlt"
            class="wd-card-image"
            loading="lazy"
            @error="onImageError(benefits[1].id)"
          />

          <div
            v-else
            class="wd-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-shield-halved"></i>
          </div>

          <div
            class="wd-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="wd-card-content">
            <h3>{{ benefits[1].title }}</h3>
            <p>{{ benefits[1].description }}</p>
          </div>

        </article>

        <!-- UPPER RIGHT IMAGE -->
        <article class="wd-card wd-card-right">

          <img
            v-if="hasImage(benefits[2])"
            :src="benefits[2].image"
            :alt="benefits[2].imageAlt"
            class="wd-card-image"
            loading="lazy"
            @error="onImageError(benefits[2].id)"
          />

          <div
            v-else
            class="wd-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-user-check"></i>
          </div>

          <div
            class="wd-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="wd-card-content">
            <h3>{{ benefits[2].title }}</h3>
            <p>{{ benefits[2].description }}</p>
          </div>

        </article>

        <!-- YELLOW FOURTH BENEFIT CARD -->
        <div class="wd-feature-card">

          <div class="wd-feature-content">

            <h3>{{ benefits[3].title }}</h3>

            <p>{{ benefits[3].description }}</p>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
