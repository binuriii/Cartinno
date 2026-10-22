
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './RestaurantFeatures.css'

import {
  restaurantFeaturesContent as content,
  restaurantFeatures as features,
  restaurantWebsitePreview as preview
} from './RestaurantFeaturesData.js'

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
    id="restaurant-features"
    class="rwf-section"
    :class="{ 'rwf-visible': visible }"
  >
    <div class="rwf-container">

      <!-- SECTION HEADING -->
      <header class="rwf-header">

        <h2 class="rwf-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>

      </header>

      <!-- TWO-COLUMN LAYOUT -->
      <div class="rwf-layout">

        <!-- LEFT RESTAURANT WEBSITE PREVIEW -->
        <div class="rwf-image-card">

          <div class="rwf-browser">

            <div class="rwf-browser-topbar">
              <div class="rwf-browser-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>

              <div class="rwf-browser-address">
                <i class="fa-solid fa-lock"></i>
                yourrestaurant.com
              </div>
            </div>

            <div class="rwf-website">

              <!-- NAVIGATION -->
              <div class="rwf-website-nav">

                <strong>
                  {{ preview.restaurantName }}
                </strong>

                <div class="rwf-nav-links">
                  <span
                    v-for="item in preview.navigation"
                    :key="item"
                  >
                    {{ item }}
                  </span>
                </div>

                <span class="rwf-nav-button">
                  Order Now
                </span>

              </div>

              <!-- RESTAURANT HERO -->
              <div class="rwf-website-hero">

                <img
                  v-if="content.image && !imageFailed"
                  :src="content.image"
                  :alt="content.imageAlt"
                  @error="imageFailed = true"
                />

                <div
                  v-else
                  class="rwf-image-fallback"
                >
                  <i class="fa-solid fa-utensils"></i>
                </div>

                <div class="rwf-website-overlay"></div>

                <div class="rwf-website-hero-content">

                  <span>{{ preview.eyebrow }}</span>

                  <h3>{{ preview.headline }}</h3>

                  <p>{{ preview.description }}</p>

                  <div class="rwf-website-order-btn">
                    {{ preview.buttonText }}
                  </div>

                </div>

              </div>

              <!-- MENU PREVIEW -->
              <div class="rwf-website-menu">

                <div class="rwf-menu-heading">
                  <strong>Popular on the menu</strong>
                  <span>Explore menu</span>
                </div>

                <div class="rwf-menu-items">

                  <div
                    v-for="item in preview.menuItems"
                    :key="item.id"
                    class="rwf-menu-item"
                  >
                    
                        <div class="rwf-menu-image">
                        <img
                            :src="item.image"
                            :alt="item.name"
                            loading="lazy"
                        />
                        </div>


                    <div>
                      <strong>{{ item.name }}</strong>
                      <small>{{ item.price }}</small>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

          <!-- FLOATING ORDER CONFIRMATION -->
          <div class="rwf-order-notice">

            <span class="rwf-order-icon">
              <i class="fa-solid fa-circle-check"></i>
            </span>

            <div>
              <strong>Order placed successfully</strong>
              <small>Direct online ordering</small>
            </div>

          </div>

        </div>

        <!-- RIGHT BENEFITS -->
        <div class="rwf-benefits">

          <article
            v-for="(feature, index) in features"
            :key="feature.id"
            class="rwf-benefit"
            :style="{ '--rwf-index': index }"
          >

            <div class="rwf-benefit-content">

              <h3 class="rwf-benefit-title">
                {{ feature.title }}
              </h3>

              <p class="rwf-benefit-description">
                {{ feature.description }}
              </p>

            </div>

          </article>

        </div>

      </div>

    </div>
  </section>
</template>
