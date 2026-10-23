<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './RestaurantSEOFeatures.css'

import {
  restaurantSEOFeaturesContent as content,
  restaurantSEOFeatures as features,
  restaurantSEOPreview as preview
} from './RestaurantSEOFeaturesData.js'

const sectionRef = ref(null)
const visible = ref(false)
const imageFailed = ref(false)

let observer = null

onMounted(() => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
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
    id="restaurant-seo-features"
    class="rsf-section"
    :class="{ 'rsf-visible': visible }"
  >
    <div class="rsf-container">

      <!-- SECTION HEADING -->
      <header class="rsf-header">
        <h2 class="rsf-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- TWO-COLUMN LAYOUT -->
      <div class="rsf-layout">

        <!-- LEFT: ANIMATED SEO PREVIEW -->
        <div class="rsf-image-card">

          <div class="rsf-browser">

            <!-- BROWSER TOP -->
            <div class="rsf-browser-topbar">
              <span class="rsf-browser-dots">
                <i></i>
                <i></i>
                <i></i>
              </span>

              <div class="rsf-browser-address">
                <i class="fa-solid fa-lock"></i>
                Search results
              </div>
            </div>

            <!-- SEARCH BAR -->
            <div class="rsf-search-header">

              <div class="rsf-search-brand">
                <span>G</span>
                <span>o</span>
                <span>o</span>
                <span>g</span>
                <span>l</span>
                <span>e</span>
              </div>

              <div class="rsf-search-bar">
                <i class="fa-solid fa-magnifying-glass"></i>

                <span>{{ preview.searchQuery }}</span>

                <i class="fa-solid fa-microphone"></i>
              </div>

              <div class="rsf-search-tabs">
                <span class="rsf-tab-active">All</span>
                <span>Maps</span>
                <span>Images</span>
              </div>

            </div>

            <!-- LOCAL SEARCH RESULT -->
            <div class="rsf-results">

              <span class="rsf-results-eyebrow">
                <i class="fa-solid fa-location-dot"></i>
                Local restaurants
              </span>

              <div class="rsf-featured-result">

                <div class="rsf-result-photo">
                  <img
                    v-if="!imageFailed"
                    :src="preview.image"
                    :alt="preview.imageAlt"
                    loading="lazy"
                    @error="imageFailed = true"
                  />

                  <i
                    v-else
                    class="fa-solid fa-utensils"
                  ></i>
                </div>

                <div class="rsf-result-copy">

                  <strong>{{ preview.restaurantName }}</strong>

                  <div class="rsf-rating">
                    <span>{{ preview.rating }}</span>

                    <span class="rsf-stars">
                      ★★★★★
                    </span>

                    <small>{{ preview.reviews }}</small>
                  </div>

                  <small>{{ preview.category }}</small>

                  <div class="rsf-result-link">
                    <i class="fa-solid fa-globe"></i>
                    Visit website
                  </div>

                </div>

              </div>

              <!-- SEARCH RESULT SKELETONS -->
              <div class="rsf-skeleton">
                <span></span>
                <div>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

              <div class="rsf-skeleton">
                <span></span>
                <div>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

            </div>

          </div>

          <!-- FLOATING WEBSITE PREVIEW -->
          <div class="rsf-website-preview">

            <div class="rsf-preview-photo">
              <img
                v-if="!imageFailed"
                :src="preview.image"
                :alt="preview.imageAlt"
              />

              <i
                v-else
                class="fa-solid fa-utensils"
              ></i>
            </div>

            <div class="rsf-preview-content">
              <small>{{ preview.website }}</small>
              <strong>{{ preview.headline }}</strong>

              <span>
                {{ preview.buttonText }}
              </span>
            </div>

          </div>

          <!-- DISCOVERY BADGE -->
          <div class="rsf-discovery-badge">
            <i class="fa-solid fa-magnifying-glass-chart"></i>
            Discoverable online
          </div>

        </div>

        <!-- RIGHT: BENEFITS -->
        <div class="rsf-benefits">

          <article
            v-for="(feature, index) in features"
            :key="feature.id"
            class="rsf-benefit"
            :style="{ '--rsf-index': index }"
          >
            <div class="rsf-benefit-content">

              <h3 class="rsf-benefit-title">
                {{ feature.title }}
              </h3>

              <p class="rsf-benefit-description">
                {{ feature.description }}
              </p>

            </div>
          </article>

        </div>

      </div>

    </div>
  </section>
</template>
