
<script setup>
import { ref } from 'vue'

import {
  cloudPOSBenefitsContent,
  cloudPOSBenefits
} from './CloudPOSBenefitsData.js'

import './CloudPOSBenefits.css'

const failedImages = ref(new Set())

const hasImage = card => {
  return Boolean(card.image) &&
    !failedImages.value.has(card.id)
}

const onImageError = id => {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

const benefitOne = cloudPOSBenefits.find(
  card => card.id === 1
)

const benefitTwo = cloudPOSBenefits.find(
  card => card.id === 2
)

const benefitThree = cloudPOSBenefits.find(
  card => card.id === 3
)

const benefitFour = cloudPOSBenefits.find(
  card => card.id === 4
)
</script>

<template>
  <section
    class="cpben-section"
    id="cloud-pos-benefits"
  >
    <div class="cpben-container">

      <!-- SECTION HEADER -->
      <header class="cpben-header">

        <h2 class="cpben-heading">
          {{ cloudPOSBenefitsContent.title }}
        </h2>
      </header>

      <!-- BENEFITS GRID -->
      <div class="cpben-grid">

        <!-- CARD 01: TOP LEFT -->
        <article
          v-if="benefitOne"
          class="cpben-card cpben-card-one"
        >
          <div class="cpben-card-content">
            <span class="cpben-eyebrow">
              {{ benefitOne.eyebrow }}
            </span>

            <h3 class="cpben-card-title">
              {{ benefitOne.title }}
            </h3>

            <p class="cpben-card-description">
              {{ benefitOne.description }}
            </p>
          </div>
        </article>

        <!-- CARD 02: BOTTOM LEFT -->
        <article
          v-if="benefitTwo"
          class="cpben-card cpben-card-two"
        >
          <img
            v-if="hasImage(benefitTwo)"
            :src="benefitTwo.image"
            :alt="benefitTwo.imageAlt"
            class="cpben-card-image"
            loading="lazy"
            @error="onImageError(benefitTwo.id)"
          />

          <div
            v-else
            class="cpben-image-fallback"
          ></div>

          <div class="cpben-card-overlay"></div>

          <div class="cpben-card-content">
            <span class="cpben-eyebrow">
              {{ benefitTwo.eyebrow }}
            </span>

            <h3 class="cpben-card-title">
              {{ benefitTwo.title }}
            </h3>

            <p class="cpben-card-description">
              {{ benefitTwo.description }}
            </p>
          </div>
        </article>

        <!-- CARD 03: BOTTOM MIDDLE -->
        <article
          v-if="benefitThree"
          class="cpben-card cpben-card-three"
        >
          <img
            v-if="hasImage(benefitThree)"
            :src="benefitThree.image"
            :alt="benefitThree.imageAlt"
            class="cpben-card-image"
            loading="lazy"
            @error="onImageError(benefitThree.id)"
          />

          <div
            v-else
            class="cpben-image-fallback"
          ></div>

          <div class="cpben-card-overlay"></div>

          <div class="cpben-card-content">
            <span class="cpben-eyebrow">
              {{ benefitThree.eyebrow }}
            </span>

            <h3 class="cpben-card-title">
              {{ benefitThree.title }}
            </h3>

            <p class="cpben-card-description">
              {{ benefitThree.description }}
            </p>
          </div>
        </article>

        <!-- CARD 04: TALL RIGHT -->
        <article
          v-if="benefitFour"
          class="cpben-card cpben-card-four"
        >
          <img
            v-if="hasImage(benefitFour)"
            :src="benefitFour.image"
            :alt="benefitFour.imageAlt"
            class="cpben-card-image"
            loading="lazy"
            @error="onImageError(benefitFour.id)"
          />

          <div
            v-else
            class="cpben-image-fallback"
          ></div>

          <div class="cpben-card-overlay"></div>

          <div class="cpben-card-content">
            <span class="cpben-eyebrow">
              {{ benefitFour.eyebrow }}
            </span>

            <h3 class="cpben-card-title">
              {{ benefitFour.title }}
            </h3>

            <p class="cpben-card-description">
              {{ benefitFour.description }}
            </p>
          </div>
        </article>

      </div>
    </div>
  </section>
</template>
