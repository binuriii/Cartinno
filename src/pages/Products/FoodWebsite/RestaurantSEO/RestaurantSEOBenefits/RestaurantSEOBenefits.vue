
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './RestaurantSEOBenefits.css'

import {
  restaurantSEOBenefitsContent as content,
  restaurantSEOBenefits as benefits,
  seoSearchPreview as search,
  seoOrderingPreview as ordering,
  seoVisibilityPreview as visibility
} from './RestaurantSEOBenefitsData.js'

const sectionRef = ref(null)
const visible = ref(false)
const searchImageFailed = ref(false)
const foodImageFailed = ref(false)

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
    { threshold: 0.1 }
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
    id="restaurant-seo-benefits"
    class="rsb-section"
    :class="{ 'rsb-visible': visible }"
  >
    <div class="rsb-container">

      <!-- CENTERED HEADING -->
      <header class="rsb-header">
        <h2 class="rsb-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>
      </header>

      <!-- ======================================
           LARGE TOP CARD
      ======================================= -->
      <article class="rsb-main-card">

        <div class="rsb-search-scene">

          <div class="rsb-search-window">

            <!-- SEARCH BAR -->
            <div class="rsb-search-bar">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>{{ search.query }}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>

            <!-- SEARCH RESULTS -->
            <div class="rsb-results-window">

              <div class="rsb-results-label">
                <i class="fa-solid fa-location-dot"></i>
                Restaurants nearby
              </div>

              <div class="rsb-search-result">

                <div class="rsb-result-image">
                  <img
                    v-if="!searchImageFailed"
                    :src="search.image"
                    alt="Restaurant interior"
                    loading="lazy"
                    @error="searchImageFailed = true"
                  />

                  <i
                    v-else
                    class="fa-solid fa-utensils"
                  ></i>
                </div>

                <div class="rsb-result-content">
                  <strong>{{ search.name }}</strong>

                  <span class="rsb-rating">
                    <i class="fa-solid fa-star"></i>
                    {{ search.rating }}
                    <span>{{ search.reviews }}</span>
                  </span>

                  <small>{{ search.category }}</small>

                  <span class="rsb-result-link">
                    <i class="fa-solid fa-globe"></i>
                    Visit website
                  </span>
                </div>

              </div>

              <div
                v-for="n in 2"
                :key="n"
                class="rsb-skeleton-result"
              >
                <span></span>
                <div>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

            </div>

          </div>

          <!-- FLOATING BADGE -->
          <div class="rsb-search-float">
            <i class="fa-solid fa-location-dot"></i>
            Get discovered locally
          </div>

        </div>

        <div class="rsb-main-content">

          <span class="rsb-label">
            {{ benefits[0].number }}
            / {{ benefits[0].label }}
          </span>

          <h3>{{ benefits[0].title }}</h3>
          <p>{{ benefits[0].description }}</p>

        </div>

      </article>

      <!-- ======================================
           TWO BOTTOM CARDS
      ======================================= -->
      <div class="rsb-bottom-grid">

        <!-- CARD 02: SEARCH TO ORDER -->
        <article class="rsb-order-card">

          <div class="rsb-card-copy">
            <span class="rsb-label">
              {{ benefits[1].number }}
              / {{ benefits[1].label }}
            </span>

            <h3>{{ benefits[1].title }}</h3>
            <p>{{ benefits[1].description }}</p>
          </div>

          <div class="rsb-order-scene">

            <div class="rsb-mini-search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>{{ ordering.searchQuery }}</span>
            </div>

            <div class="rsb-journey-arrow">
              <i class="fa-solid fa-arrow-down"></i>
            </div>

            <div class="rsb-restaurant-card">

              <div class="rsb-restaurant-image">
                <img
                  v-if="!foodImageFailed"
                  :src="ordering.image"
                  :alt="ordering.meal"
                  loading="lazy"
                  @error="foodImageFailed = true"
                />
                <i
                  v-else
                  class="fa-solid fa-burger"
                ></i>
              </div>

              <div class="rsb-restaurant-details">
                <small>{{ ordering.website }}</small>
                <strong>{{ ordering.restaurantName }}</strong>
                <span>{{ ordering.meal }}</span>
              </div>

              <div class="rsb-order-button">
                {{ ordering.button }}
                <i class="fa-solid fa-arrow-right"></i>
              </div>

            </div>

            <div class="rsb-direct-badge">
              <i class="fa-solid fa-circle-check"></i>
              Direct online ordering
            </div>

          </div>

        </article>

        <!-- CARD 03: ONLINE VISIBILITY -->
        <article class="rsb-visibility-card">

          <div class="rsb-card-copy">
            <span class="rsb-label">
              {{ benefits[2].number }}
              / {{ benefits[2].label }}
            </span>

            <h3>{{ benefits[2].title }}</h3>
            <p>{{ benefits[2].description }}</p>
          </div>

          <div class="rsb-visibility-scene">

            <div class="rsb-dashboard">

              <div class="rsb-dashboard-header">
                <span class="rsb-dashboard-icon">
                  <i class="fa-solid fa-chart-line"></i>
                </span>

                <div>
                  <strong>{{ visibility.title }}</strong>
                  <small>{{ visibility.subtitle }}</small>
                </div>
              </div>

              <div class="rsb-dashboard-metric">
                <span>{{ visibility.metric }}</span>

                <div>
                  <strong>{{ visibility.impressions }}</strong>
                  <em>{{ visibility.change }}</em>
                </div>
              </div>

              <div
                class="rsb-chart"
                role="img"
                aria-label="Illustrative upward-trending search impressions"
              >
                <span
                  v-for="(bar, index) in visibility.bars"
                  :key="index"
                  :style="{
                    '--rsb-height': `${bar}%`,
                    '--rsb-delay': `${index * 0.08}s`
                  }"
                ></span>
              </div>

              <div class="rsb-dashboard-items">
                <div
                  v-for="item in visibility.labels"
                  :key="item"
                >
                  <i class="fa-solid fa-circle-check"></i>
                  {{ item }}
                </div>
              </div>

            </div>

            <div class="rsb-visibility-float">
              <i class="fa-solid fa-magnifying-glass-chart"></i>
              Better search presence
            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
