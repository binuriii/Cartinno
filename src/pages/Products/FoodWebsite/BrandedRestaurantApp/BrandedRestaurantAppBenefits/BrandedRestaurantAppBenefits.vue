<script setup>
import { ref } from 'vue'

import {
  brandedRestaurantAppBenefitsContent,
  brandedRestaurantAppBenefits
} from './BrandedRestaurantAppBenefitsData.js'

import './BrandedRestaurantAppBenefits.css'

const failedImages = ref(new Set())

const hasImage = (card) => {
  return Boolean(card.image) && !failedImages.value.has(card.id)
}

const onImageError = (id) => {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

const benefitOne = brandedRestaurantAppBenefits.find(
  card => card.id === 1
)

const benefitTwo = brandedRestaurantAppBenefits.find(
  card => card.id === 2
)

const benefitThree = brandedRestaurantAppBenefits.find(
  card => card.id === 3
)
</script>

<template>
  <section
    class="brab-section"
    id="branded-restaurant-app-benefits"
  >
    <div class="brab-container">

      <!-- SECTION HEADING -->
      <header class="brab-header">
        <h2 class="brab-heading">
          {{ brandedRestaurantAppBenefitsContent.title }}
        </h2>
      </header>

      <!-- BENEFITS GRID -->
      <div class="brab-grid">

        <!-- CARD 01 - TOP LEFT -->
        <article
          v-if="benefitOne"
          class="brab-card brab-card-one"
        >
          <div class="brab-card-content">
            
            <h3 class="brab-card-title">
              {{ benefitOne.title }}
            </h3>

            <p class="brab-card-description">
              {{ benefitOne.description }}
            </p>
          </div>
        </article>

        <!-- CARD 02 - BOTTOM LEFT -->
        <article
          v-if="benefitTwo"
          class="brab-card brab-card-two"
        >
          <img
            v-if="hasImage(benefitTwo)"
            :src="benefitTwo.image"
            :alt="benefitTwo.imageAlt"
            class="brab-card-image"
            loading="lazy"
            @error="onImageError(benefitTwo.id)"
          />

          <div
            v-else
            class="brab-image-fallback brab-fallback-two"
          ></div>

          <div class="brab-card-overlay"></div>

          <div class="brab-card-content">

            <h3 class="brab-card-title">
              {{ benefitTwo.title }}
            </h3>

            <p class="brab-card-description">
              {{ benefitTwo.description }}
            </p>
          </div>
        </article>

        <!-- CARD 03 - TALL RIGHT -->
        <article
          v-if="benefitThree"
          class="brab-card brab-card-three"
        >
          <img
            v-if="hasImage(benefitThree)"
            :src="benefitThree.image"
            :alt="benefitThree.imageAlt"
            class="brab-card-image"
            loading="lazy"
            @error="onImageError(benefitThree.id)"
          />

          <div
            v-else
            class="brab-image-fallback brab-fallback-three"
          ></div>

          <div class="brab-card-overlay"></div>

          <div class="brab-card-content">

            <h3 class="brab-card-title">
              {{ benefitThree.title }}
            </h3>

            <p class="brab-card-description">
              {{ benefitThree.description }}
            </p>
          </div>
        </article>

      </div>
    </div>
  </section>
</template>