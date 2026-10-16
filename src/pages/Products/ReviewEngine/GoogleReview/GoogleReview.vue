
<script setup>
import './GoogleReview.css'

import {
  googleReviewContent,
  googleReviewFeatures
} from './GoogleReviewData.js'
</script>

<template>
  <section class="gr-section" id="google-reviews">
    <div class="gr-container">

      <!-- CENTERED HEADING -->
      <header class="gr-header">
        <h2 class="gr-title">
          {{ googleReviewContent.title1 }}
          <br/>
          {{ googleReviewContent.title2 }}
        </h2>

        <p class="gr-description">
          {{ googleReviewContent.description }}
        </p>
      </header>

      <!-- THREE-CARD LAYOUT -->
      <div class="gr-cards">

        <article
          v-for="(feature, index) in googleReviewFeatures"
          :key="feature.id"
          class="gr-card"
          :class="{
            'gr-card-featured': feature.theme === 'featured'
          }"
        >

          <!-- FEATURED MIDDLE BACKGROUND -->
          <template v-if="feature.theme === 'featured'">
            <img
              class="gr-featured-image"
              :src="googleReviewContent.featuredImage"
              :alt="googleReviewContent.featuredImageAlt"
              loading="lazy"
            />

            <div
              class="gr-featured-overlay"
              aria-hidden="true"
            ></div>
          </template>

          <!-- FEATURE CONTENT -->
          <div class="gr-card-content">

            <h3 class="gr-card-title">
              {{ feature.title }}
            </h3>

            <p class="gr-card-description">
              {{ feature.description }}
            </p>

          </div>

          <!-- LEFT CARD: REVIEW REQUEST PREVIEW -->
          <div
            v-if="index === 0"
            class="gr-preview gr-request-preview"
            aria-label="Illustrative review request interface"
          >
            <div class="gr-preview-label">
              Review Request
            </div>

            <div class="gr-request-box">
              <div class="gr-request-icon">
                <i
                  class="fa-solid fa-star"
                  aria-hidden="true"
                ></i>
              </div>

              <div class="gr-request-copy">
                <strong>Share your experience</strong>
                <span>
                  We'd love to hear your feedback.
                </span>
              </div>
            </div>

            <div class="gr-review-stars" aria-hidden="true">
              <i
                v-for="star in 5"
                :key="star"
                class="fa-solid fa-star"
              ></i>
            </div>

            <div class="gr-preview-action">
              Leave a Google Review
              <i
                class="fa-solid fa-arrow-up-right-from-square"
                aria-hidden="true"
              ></i>
            </div>
          </div>

          <!-- MIDDLE CARD: DECORATIVE BOTTOM LABEL -->
          <div
            v-if="index === 1"
            class="gr-featured-bottom"
          >
            <span>
              {{ feature.label }}
            </span>

            <div
              class="gr-featured-symbol"
              aria-hidden="true"
            >
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>

          <!-- RIGHT CARD: VISIBILITY PREVIEW -->
          <div
            v-if="index === 2"
            class="gr-preview gr-visibility-preview"
            aria-label="Illustrative local business visibility preview"
          >
            <div class="gr-preview-label">
              Grow Your Visibility
            </div>

            <div class="gr-visibility-header">
              <span class="gr-google-g">G</span>

              <div>
                <strong>Google Business</strong>
                <span>Customer reviews</span>
              </div>
            </div>

            <div class="gr-visibility-stars">
              <span aria-hidden="true">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="fa-solid fa-star"
                ></i>
              </span>
              <span>Build customer trust</span>
            </div>

            <div class="gr-visibility-divider"></div>

            <div class="gr-visibility-footer">
              <i
                class="fa-solid fa-arrow-trend-up"
                aria-hidden="true"
              ></i>
              <span>
                Help more customers find you
              </span>
            </div>
          </div>

        </article>

      </div>

    </div>
  </section>
</template>
