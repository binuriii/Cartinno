
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import './FoodReviewFeatures.css'

import {
  foodReviewContent as content,
  foodReviewFeatures as features,
  foodReviewRequest as request,
  foodReviewTrust as trust
} from './FoodReviewFeaturesData.js'

const sectionRef = ref(null)
const visible = ref(false)
const featuredImageFailed = ref(false)

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
    id="food-review-features"
    class="frf-section"
    :class="{ 'frf-visible': visible }"
  >
    <div class="frf-container">

      <!-- SECTION HEADING -->
      <header class="frf-header">
        <h2 class="frf-title">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- THREE-CARD LAYOUT -->
      <div class="frf-cards">

        <article
          v-for="(feature, index) in features"
          :key="feature.id"
          class="frf-card"
          :class="{
            'frf-card-featured': feature.theme === 'featured'
          }"
          :style="{ '--frf-index': index }"
        >

          <!-- FEATURED MIDDLE BACKGROUND -->
          <template v-if="feature.theme === 'featured'">
            <img
              v-if="!featuredImageFailed"
              class="frf-featured-image"
              :src="content.featuredImage"
              :alt="content.featuredImageAlt"
              loading="lazy"
              @error="featuredImageFailed = true"
            />

            <div
              v-else
              class="frf-featured-fallback"
              aria-hidden="true"
            >
              <i class="fa-solid fa-utensils"></i>
            </div>

            <div
              class="frf-featured-overlay"
              aria-hidden="true"
            ></div>
          </template>

          <!-- CARD CONTENT -->
          <div class="frf-card-content">
            <h3 class="frf-card-title">
              {{ feature.title }}
            </h3>

            <p class="frf-card-description">
              {{ feature.description }}
            </p>
          </div>

          <!-- LEFT: REVIEW REQUEST -->
          <div
            v-if="index === 0"
            class="frf-preview frf-request-preview"
            aria-label="Illustrative restaurant review request"
          >
            <div class="frf-preview-label">
              Review Request
            </div>

            <div class="frf-request-box">
              <span class="frf-request-icon">
                <i class="fa-solid fa-utensils"></i>
              </span>

              <div class="frf-request-copy">
                <strong>{{ request.heading }}</strong>
                <span>{{ request.message }}</span>
              </div>
            </div>

            <div class="frf-review-stars" aria-hidden="true">
              <i
                v-for="star in 5"
                :key="star"
                class="fa-solid fa-star"
              ></i>
            </div>

            <div class="frf-preview-action">
              {{ request.action }}
            </div>
          </div>

          <!-- MIDDLE: DECORATIVE LABEL -->
          <div
            v-if="index === 1"
            class="frf-featured-bottom"
          >
            <span>{{ feature.label }}</span>
          </div>

          <!-- RIGHT: REPUTATION PREVIEW -->
          <div
            v-if="index === 2"
            class="frf-preview frf-trust-preview"
            aria-label="Illustrative restaurant reputation preview"
          >
            <div class="frf-preview-label">
              Restaurant Reputation
            </div>

            <div class="frf-trust-header">
              <span class="frf-trust-icon">
                <i class="fa-solid fa-store"></i>
              </span>

              <div>
                <strong>{{ trust.restaurant }}</strong>
                <span>{{ trust.subtitle }}</span>
              </div>
            </div>

            <div class="frf-trust-stars">
              <span aria-hidden="true">
                <i
                  v-for="star in trust.stars"
                  :key="star"
                  class="fa-solid fa-star"
                ></i>
              </span>

              <span>{{ trust.message }}</span>
            </div>

            <div class="frf-trust-divider"></div>

            <div class="frf-trust-footer">
              <span>{{ trust.footer }}</span>
            </div>
          </div>

        </article>

      </div>

    </div>
  </section>
</template>
