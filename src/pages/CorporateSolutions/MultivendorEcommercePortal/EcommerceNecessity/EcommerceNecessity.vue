
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  ecommerceNecessityContent as content,
  ecommerceNecessityBenefits as benefits
} from './EcommerceNecessityData.js'

import './EcommerceNecessity.css'

const sectionRef = ref(null)
const visible = ref(false)
const failedImages = ref(new Set())

let observer = null

function hasImage(key) {
  return Boolean(content.images[key]) &&
    !failedImages.value.has(key)
}

function onImageError(key) {
  failedImages.value = new Set([
    ...failedImages.value,
    key
  ])
}

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
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
    id="ecommerce-necessity"
    class="ecn-section"
    :class="{ 'ecn-visible': visible }"
  >
    <div class="ecn-container">

      <!-- CENTERED SECTION HEADER -->
      <header class="ecn-header">

        <h2 class="ecn-heading">
          {{ content.title1 }}<br>{{ content.title2 }}
        </h2>

        <p class="ecn-description">
          {{ content.description }}
        </p>

      </header>

      <!-- EDITORIAL GRID -->
      <div class="ecn-grid">

        <!-- LARGE LEFT IMAGE -->
        <div class="ecn-main-image ecn-image-card">

          <img
            v-if="hasImage('main')"
            :src="content.images.main"
            :alt="content.imageAlts.main"
            loading="lazy"
            @error="onImageError('main')"
          />

          <div
            v-else
            class="ecn-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-cart-shopping"></i>
          </div>

        </div>

        <!-- TOP MIDDLE IMAGE -->
        <div class="ecn-top-image ecn-image-card">

          <img
            v-if="hasImage('top')"
            :src="content.images.top"
            :alt="content.imageAlts.top"
            loading="lazy"
            @error="onImageError('top')"
          />

          <div
            v-else
            class="ecn-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-store"></i>
          </div>

        </div>

        <!-- FEATURED RED CARD -->
        <div class="ecn-highlight-card">

          <h3>
            {{ content.highlightTitle }}
          </h3>

          <p>
            {{ content.highlightDescription }}
          </p>

        </div>

        <!-- RIGHT IMAGE -->
        <div class="ecn-right-image ecn-image-card">

          <img
            v-if="hasImage('right')"
            :src="content.images.right"
            :alt="content.imageAlts.right"
            loading="lazy"
            @error="onImageError('right')"
          />

          <div
            v-else
            class="ecn-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-globe"></i>
          </div>

        </div>

        <!-- FIVE BENEFITS -->
        <div class="ecn-benefits">

          <article
            v-for="(benefit, index) in benefits"
            :key="benefit.id"
            class="ecn-benefit"
            :style="{ '--ecn-index': index }"
          >

            <div class="ecn-benefit-heading">

              <span class="ecn-benefit-number">
                {{ benefit.number }}
              </span>

              <h3>
                {{ benefit.title }}
              </h3>

            </div>

          </article>

        </div>

      </div>

    </div>
  </section>
</template>
