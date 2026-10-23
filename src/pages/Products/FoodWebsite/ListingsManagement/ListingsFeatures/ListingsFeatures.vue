
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './ListingsFeatures.css'

import {
  listingsFeaturesContent as content,
  listingsFeatures as features,
  listingsPreview as preview
} from './ListingsFeaturesData.js'

const sectionRef = ref(null)
const visible = ref(false)
const imageFailed = ref(false)

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
    id="listings-features"
    class="lmf-section"
    :class="{ 'lmf-visible': visible }"
  >
    <div class="lmf-container">

      <!-- SECTION HEADING -->
      <header class="lmf-header">
        <h2 class="lmf-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- TWO-COLUMN LAYOUT -->
      <div class="lmf-layout">

        <!-- LEFT: ANIMATED LISTINGS MOCKUP -->
        <div class="lmf-image-card">

          <div class="lmf-browser">

            <!-- BROWSER HEADER -->
            <div class="lmf-browser-topbar">

              <div class="lmf-browser-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>

              <div class="lmf-browser-address">
                <i class="fa-solid fa-lock"></i>
                Business listings
              </div>

            </div>

            <!-- SEARCH INTERFACE -->
            <div class="lmf-search-area">

              <div class="lmf-search-bar">
                <i class="fa-solid fa-magnifying-glass"></i>

                <span>{{ preview.searchQuery }}</span>

                <i class="fa-solid fa-sliders"></i>
              </div>

              <div class="lmf-search-caption">
                <i class="fa-solid fa-location-dot"></i>
                Local business information
              </div>

            </div>

            <!-- BUSINESS LISTING -->
            <div class="lmf-business-listing">

              <div class="lmf-listing-photo">
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

              <div class="lmf-listing-body">

                <div class="lmf-listing-heading">
                  <div>
                    <h3>{{ preview.restaurant }}</h3>
                    <p>{{ preview.category }}</p>
                  </div>

                  <span class="lmf-verified">
                    <i class="fa-solid fa-circle-check"></i>
                    Details checked
                  </span>
                </div>

                <div class="lmf-detail-list">

                  <div
                    v-for="detail in preview.details"
                    :key="detail.id"
                    class="lmf-detail"
                  >
                    <span class="lmf-detail-icon">
                      <i :class="detail.icon"></i>
                    </span>

                    <div>
                      <strong>{{ detail.label }}</strong>
                      <span>{{ detail.value }}</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <!-- FLOATING PLATFORM CARD -->
          <div class="lmf-platform-card">

            <strong class="lmf-platform-title">
              Listing consistency
            </strong>

            <div
              v-for="platform in preview.platforms"
              :key="platform.id"
              class="lmf-platform-row"
            >
              <span class="lmf-platform-icon">
                <i :class="platform.icon"></i>
              </span>

              <div>
                <strong>{{ platform.name }}</strong>
                <small>{{ platform.status }}</small>
              </div>

              <i class="fa-solid fa-circle-check lmf-check"></i>
            </div>

          </div>

          <!-- FLOATING STATUS -->
          <div class="lmf-floating-badge">
            <i class="fa-solid fa-circle-check"></i>
            Consistent business information
          </div>

        </div>

        <!-- RIGHT: THREE BENEFITS -->
        <div class="lmf-benefits">

          <article
            v-for="(feature, index) in features"
            :key="feature.id"
            class="lmf-benefit"
            :style="{ '--lmf-index': index }"
          >
            <h3 class="lmf-benefit-title">
              {{ feature.title }}
            </h3>

            <p class="lmf-benefit-description">
              {{ feature.description }}
            </p>
          </article>

        </div>

      </div>

    </div>
  </section>
</template>
