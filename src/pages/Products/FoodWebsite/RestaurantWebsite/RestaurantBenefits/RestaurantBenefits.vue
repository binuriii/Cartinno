<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './RestaurantBenefits.css'

import {
  restaurantBenefitsContent as content,
  restaurantBenefits as benefits,
  restaurantSearchPreview as search,
  restaurantOrderPreview as order,
  restaurantDirectSalesPreview as sales
} from './RestaurantBenefitsData.js'

const sectionRef = ref(null)
const visible = ref(false)

const searchImageFailed = ref(false)
const orderImageFailed = ref(false)

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
      if (entry?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
        observer = null
      }
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
    id="restaurant-benefits"
    class="rwb-section"
    :class="{ 'rwb-visible': visible }"
  >
    <div class="rwb-container">

      <!-- CENTERED HEADING -->
      <header class="rwb-header">
        <h2 class="rwb-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>
      </header>

      <!-- LARGE TOP CARD -->
      <article class="rwb-main-card">

        <!-- LEFT: SEARCH RESULTS -->
        <div class="rwb-search-scene">

          <div class="rwb-search-window">

            <div class="rwb-search-bar">
              <i class="fa-solid fa-magnifying-glass"></i>
              <span>{{ search.query }}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>

            <div class="rwb-results-window">

              <div class="rwb-results-label">
                <i class="fa-solid fa-location-dot"></i>
                Restaurants nearby
              </div>

              <div class="rwb-search-result">

                <div class="rwb-result-image">
                  <img
                    v-if="!searchImageFailed"
                    :src="search.image"
                    alt="Restaurant dining area"
                    loading="lazy"
                    @error="searchImageFailed = true"
                  />

                  <i
                    v-else
                    class="fa-solid fa-utensils"
                  ></i>
                </div>

                <div class="rwb-result-content">
                  <strong>{{ search.name }}</strong>

                  <span class="rwb-rating">
                    <i class="fa-solid fa-star"></i>
                    {{ search.rating }}
                    <span>· Top rated</span>
                  </span>

                  <small>{{ search.category }}</small>
                </div>

                <i class="fa-solid fa-chevron-right"></i>

              </div>

              <div class="rwb-skeleton-result">
                <span></span>
                <div>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

              <div class="rwb-skeleton-result">
                <span></span>
                <div>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

            </div>

          </div>

          <div class="rwb-search-float">
            <i class="fa-solid fa-magnifying-glass-chart"></i>
            <span>Get discovered online</span>
          </div>

        </div>

        <!-- RIGHT: CONTENT -->
        <div class="rwb-main-content">

          <span class="rwb-label">
            {{ benefits[0].number }}
            / {{ benefits[0].label }}
          </span>

          <h3>{{ benefits[0].title }}</h3>

          <p>{{ benefits[0].description }}</p>

        </div>

      </article>

      <!-- TWO BOTTOM CARDS -->
      <div class="rwb-bottom-grid">

        <!-- CARD 02: DIRECT ORDERING -->
        <article class="rwb-order-card">

          <div class="rwb-card-copy">
            <span class="rwb-label">
              {{ benefits[1].number }}
              / {{ benefits[1].label }}
            </span>

            <h3>{{ benefits[1].title }}</h3>
            <p>{{ benefits[1].description }}</p>
          </div>

          <div class="rwb-order-scene">

            <div class="rwb-order-item rwb-order-back">
              <span class="rwb-order-ghost"></span>
              <div class="rwb-order-lines">
                <span></span>
                <span></span>
              </div>
            </div>

            <div class="rwb-order-item rwb-order-middle">
              <span class="rwb-order-ghost"></span>
              <div class="rwb-order-lines">
                <span></span>
                <span></span>
              </div>
            </div>

            <div class="rwb-order-item rwb-order-front">

              <div class="rwb-order-photo">
                <img
                  v-if="!orderImageFailed"
                  :src="order.image"
                  :alt="order.product"
                  loading="lazy"
                  @error="orderImageFailed = true"
                />

                <i
                  v-else
                  class="fa-solid fa-burger"
                ></i>
              </div>

              <div class="rwb-order-details">
                <strong>{{ order.product }}</strong>
                <small>{{ order.description }}</small>
                <span>{{ order.price }}</span>
              </div>

              <span class="rwb-order-plus">
                <i class="fa-solid fa-plus"></i>
              </span>

            </div>

            <div class="rwb-order-action">
              <span>Order directly</span>
            </div>

          </div>

        </article>

        <!-- CARD 03: MARGINS -->
        <article class="rwb-margins-card">

          <div class="rwb-card-copy">
            <span class="rwb-label">
              {{ benefits[2].number }}
              / {{ benefits[2].label }}
            </span>

            <h3>{{ benefits[2].title }}</h3>
            <p>{{ benefits[2].description }}</p>
          </div>

          <div class="rwb-margins-scene">

            <div class="rwb-sales-panel">

              <div class="rwb-sales-header">

                <div class="rwb-sales-icon">
                  <i class="fa-solid fa-store"></i>
                </div>

                <div>
                  <strong>{{ sales.title }}</strong>
                  <span>{{ sales.orderNumber }}</span>
                </div>

                <i class="fa-solid fa-ellipsis"></i>

              </div>

              <div class="rwb-sales-row">
                <span>Order total</span>
                <strong>{{ sales.orderTotal }}</strong>
              </div>

              <div class="rwb-sales-row">
                <span>Third-party marketplace commission</span>
                <strong class="rwb-zero">
                  {{ sales.commission }}
                </strong>
              </div>

              <div class="rwb-sales-divider"></div>

              <div class="rwb-sales-status">
                <span>
                  <i class="fa-solid fa-circle-check"></i>
                  {{ sales.status }}
                </span>
                <small>Direct website order</small>
              </div>

            </div>

            <div class="rwb-margins-float">
              <i class="fa-solid fa-link"></i>
              Your website. Your customers.
            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
