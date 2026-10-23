
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './FoodReviewBenefits.css'

import {
  foodReviewBenefitsContent as content,
  foodReviewBenefits as benefits,
  foodReviewExamples as reviews,
  foodReviewSearchPreview as search,
  foodReviewPhonePreview as phone
} from './FoodReviewBenefitsData.js'

const sectionRef = ref(null)
const visible = ref(false)
const phoneImageFailed = ref(false)

let observer = null

onMounted(() => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reduceMotion ||
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
    id="food-review-benefits"
    class="frb-section"
    :class="{ 'frb-visible': visible }"
  >
    <div class="frb-container">

      <!-- CENTERED SECTION HEADER -->
      <header class="frb-header">
        <h2 class="frb-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- =====================================
           TOP CARD: CUSTOMER REVIEWS
      ====================================== -->
      <article class="frb-main-card">

        <!-- ANIMATED REVIEW NOTIFICATIONS -->
        <div class="frb-reviews">

          <div class="frb-review-stack">

            <div
              v-for="review in reviews"
              :key="review.id"
              class="frb-review"
            >

              <div class="frb-review-top">

                <strong>
                  {{ review.name }}
                </strong>

                <span
                  class="frb-stars"
                  :aria-label="`${review.rating} out of 5 stars`"
                >
                  {{ '★'.repeat(review.rating) }}
                </span>

              </div>

              <p>{{ review.text }}</p>

            </div>

          </div>

          <span class="frb-preview-note">
            Illustrative guest review examples
          </span>

        </div>

        <!-- MAIN CONTENT -->
        <div class="frb-main-content">

          <span class="frb-label">
            {{ benefits.main.label }}
          </span>

          <h3>
            {{ benefits.main.title }}
          </h3>

          <p>
            {{ benefits.main.description }}
          </p>

        </div>

      </article>

      <!-- =====================================
           BOTTOM TWO CARDS
      ====================================== -->
      <div class="frb-bottom-grid">

        <!-- CARD 02: SEARCH VISIBILITY -->
        <article class="frb-info-card frb-visibility-card">

          <div class="frb-info-content">

            <span class="frb-label">
              {{ benefits.visibility.label }}
            </span>

            <h3>
              {{ benefits.visibility.title }}
            </h3>

            <p>
              {{ benefits.visibility.description }}
            </p>

          </div>

          <!-- SEARCH UI -->
          <div class="frb-search-preview">

            <div class="frb-search-bar">

              <i
                class="fa-solid fa-magnifying-glass"
                aria-hidden="true"
              ></i>

              <span>{{ search.searchText }}</span>

              <i
                class="fa-solid fa-sliders"
                aria-hidden="true"
              ></i>

            </div>

            <!-- RESTAURANT SEARCH RESULT -->
            <div class="frb-search-result">

              <div class="frb-business-icon">
                <i
                  class="fa-solid fa-utensils"
                  aria-hidden="true"
                ></i>
              </div>

              <div class="frb-business-details">

                <h4>{{ search.businessName }}</h4>

                <div class="frb-business-rating">

                  <span class="frb-search-stars">
                    ★★★★★
                  </span>

                  <span>
                    {{ search.rating }} ·
                    {{ search.reviewLabel }}
                  </span>

                </div>

                <p>
                  {{ search.description }}
                </p>

              </div>

            </div>

            <!-- VISIBILITY HIGHLIGHT -->
            <div class="frb-search-highlight">

              <i
                class="fa-solid fa-arrow-trend-up"
                aria-hidden="true"
              ></i>

              <span>{{ search.highlight }}</span>

            </div>

            <span class="frb-search-note">
              Illustrative restaurant search preview
            </span>

          </div>

        </article>

        <!-- CARD 03: CUSTOMER CONFIDENCE -->
        <article class="frb-info-card frb-confidence-card">

          <div class="frb-info-content">

            <span class="frb-label">
              {{ benefits.confidence.label }}
            </span>

            <h3>
              {{ benefits.confidence.title }}
            </h3>

            <p>
              {{ benefits.confidence.description }}
            </p>

          </div>

          <!-- ANIMATED PHONE SCENE -->
          <div class="frb-phone-scene">

            <div class="frb-phone">

              <div class="frb-phone-notch"></div>

              <div class="frb-phone-screen">

                <div class="frb-phone-header">
                  {{ phone.brand }}
                </div>

                <img
                  v-if="!phoneImageFailed"
                  :src="phone.image"
                  :alt="phone.imageAlt"
                  loading="lazy"
                  @error="phoneImageFailed = true"
                />

                <div
                  v-else
                  class="frb-phone-image-fallback"
                  aria-hidden="true"
                >
                  <i class="fa-solid fa-utensils"></i>
                </div>

                <div class="frb-phone-body">

                  <span>{{ phone.eyebrow }}</span>

                  <h4>{{ phone.heading }}</h4>

                  <p>{{ phone.description }}</p>

                  <div
                    class="frb-phone-stars"
                    aria-label="Five-star review illustration"
                  >
                    ★★★★★
                  </div>

                </div>

              </div>

            </div>

            <!-- FLOATING REVIEW PANEL -->
            <div class="frb-floating-review">

              <span>★★★★★</span>

              <strong>
                {{ phone.floatingTitle }}
              </strong>

              <small>
                {{ phone.floatingDescription }}
              </small>

            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
