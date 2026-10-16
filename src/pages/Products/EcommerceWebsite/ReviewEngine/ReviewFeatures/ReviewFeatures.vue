<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './ReviewFeatures.css'

import {
  reviewFeaturesContent,
  reviewFeatures,
  previewReviews,
  visibilityPreview
} from './ReviewFeaturesData.js'

const sectionRef = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
        observer = null
      }
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
  class="rf-section"
  :class="{ 'rf-visible': isVisible }"
  id="review-features"
    >

    <div class="rf-container">

      <!-- ==========================
           SECTION HEADER
      =========================== -->

      <header class="rf-header">

        <h2 class="rf-title">
          {{ reviewFeaturesContent.title }}
        </h2>

        <p class="rf-description">
          {{ reviewFeaturesContent.description }}
        </p>

      </header>

      <!-- ==========================
           MORE REVIEWS - GREEN CARD
      =========================== -->

      <article class="rf-main-card">

        <!-- REVIEW NOTIFICATIONS -->

        <div class="rf-reviews">

          <div class="rf-review-stack">

            <div
              v-for="review in previewReviews"
              :key="review.id"
              class="rf-review"
            >

              <div class="rf-review-top">

                <strong>
                  {{ review.name }}
                </strong>

                <span
                  class="rf-stars"
                  :aria-label="`${review.rating} out of 5 stars`"
                >
                  {{ '★'.repeat(review.rating) }}
                </span>

              </div>

              <p>{{ review.text }}</p>

            </div>

          </div>

          <span class="rf-preview-note">
            Illustrative review examples
          </span>

        </div>

        <!-- MAIN CONTENT -->

        <div class="rf-main-content">

          <span class="rf-label">
            {{ reviewFeatures.main.label }}
          </span>

          <h3>
            {{ reviewFeatures.main.title }}
          </h3>

          <p>
            {{ reviewFeatures.main.description }}
          </p>

        </div>

      </article>

      <!-- ==========================
           BOTTOM TWO CARDS
      =========================== -->

      <div class="rf-bottom-grid">

        <!-- ==========================
             MORE VISIBILITY
        =========================== -->

        <article class="rf-info-card rf-visibility-card">

          <div class="rf-info-content">

            <span class="rf-label">
              {{ reviewFeatures.visibility.label }}
            </span>

            <h3>
              {{ reviewFeatures.visibility.title }}
            </h3>

            <p>
              {{ reviewFeatures.visibility.description }}
            </p>

          </div>

          <!-- GOOGLE SEARCH PREVIEW -->

          <div class="rf-search-preview">

            <!-- SEARCH BAR -->

            <div class="rf-search-bar">

              <i
                class="fa-solid fa-magnifying-glass"
                aria-hidden="true"
              ></i>

              <span>
                {{ visibilityPreview.searchText }}
              </span>

              <i
                class="fa-solid fa-sliders"
                aria-hidden="true"
              ></i>

            </div>

            <!-- BUSINESS RESULT -->

            <div class="rf-search-result">

              <div class="rf-business-icon">

                <i
                  class="fa-solid fa-store"
                  aria-hidden="true"
                ></i>

              </div>

              <div class="rf-business-details">

                <h4>
                  {{ visibilityPreview.businessName }}
                </h4>

                <div class="rf-business-rating">

                  <span
                    class="rf-search-stars"
                    aria-label="Illustrative five-star rating"
                  >
                    ★★★★★
                  </span>

                  <span>
                    {{ visibilityPreview.reviewLabel }}
                  </span>

                </div>

                <p>
                  {{ visibilityPreview.description }}
                </p>

              </div>

            </div>

            <!-- VISIBILITY HIGHLIGHT -->

            <div class="rf-search-highlight">

              <i
                class="fa-solid fa-arrow-trend-up"
                aria-hidden="true"
              ></i>

              <span>
                {{ visibilityPreview.highlight }}
              </span>

            </div>

            <span class="rf-search-note">
              Illustrative search-result preview
            </span>

          </div>

        </article>

        <!-- ==========================
             BETTER RATINGS
        =========================== -->

        <article class="rf-info-card rf-ratings-card">

          <div class="rf-info-content">

            <span class="rf-label">
              {{ reviewFeatures.ratings.label }}
            </span>

            <h3>
              {{ reviewFeatures.ratings.title }}
            </h3>

            <p>
              {{ reviewFeatures.ratings.description }}
            </p>

          </div>

          <!-- PHONE ILLUSTRATION -->

          <div class="rf-phone-scene">

            <div class="rf-phone">

              <div class="rf-phone-notch"></div>

              <div class="rf-phone-screen">

                <div class="rf-phone-header">
                  cartinno
                </div>

                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80"
                  alt="Restaurant interior preview"
                  loading="lazy"
                />

                <div class="rf-phone-body">

                  <span>
                    YOUR EXPERIENCE
                  </span>

                  <h4>
                    Every review matters.
                  </h4>

                  <p>
                    Great service creates lasting impressions.
                  </p>

                  <div class="rf-phone-stars">
                    ★★★★★
                  </div>

                </div>

              </div>

            </div>

            <!-- FLOATING REVIEW -->

            <div class="rf-floating-review">

              <span>★★★★★</span>

              <strong>
                Customer feedback
              </strong>

              <small>
                Build trust with genuine reviews
              </small>

            </div>

          </div>

        </article>

      </div>

    </div>

  </section>
</template>
