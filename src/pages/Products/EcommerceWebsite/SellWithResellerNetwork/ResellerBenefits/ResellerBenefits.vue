
<script setup>
import { ref } from 'vue'

import {
  resellerBenefitsContent,
  resellerBenefits
} from './ResellerBenefitsData.js'

import './ResellerBenefits.css'

const failedImages = ref(new Set())

const hasImage = (card) => {
  return Boolean(card.image) &&
    !failedImages.value.has(card.id)
}

const onImageError = (id) => {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

const benefitOne = resellerBenefits.find(card => card.id === 1)
const benefitTwo = resellerBenefits.find(card => card.id === 2)
const benefitThree = resellerBenefits.find(card => card.id === 3)
const benefitFour = resellerBenefits.find(card => card.id === 4)
</script>

<template>
  <section
    class="rben-section"
    id="reseller-benefits"
  >
    <div class="rben-container">

      <!-- SECTION HEADING -->
      <header class="rben-header">
        <h2 class="rben-heading">
          {{ resellerBenefitsContent.title }}
        </h2>
      </header>

      <!-- BENEFITS GRID -->
      <div class="rben-grid">

        <!-- CARD 01 - TOP LEFT -->
        <article
          v-if="benefitOne"
          class="rben-card rben-card-one"
        >
          <div class="rben-card-content">
            <span class="rben-eyebrow">
              {{ benefitOne.eyebrow }}
            </span>

            <h3 class="rben-card-title">
              {{ benefitOne.title }}
            </h3>

            <p class="rben-card-description">
              {{ benefitOne.description }}
            </p>
          </div>
        </article>

        <!-- CARD 02 - BOTTOM LEFT -->
        <article
          v-if="benefitTwo"
          class="rben-card rben-card-two"
        >
          <img
            v-if="hasImage(benefitTwo)"
            :src="benefitTwo.image"
            :alt="benefitTwo.imageAlt"
            class="rben-card-image"
            loading="lazy"
            @error="onImageError(benefitTwo.id)"
          />

          <div
            v-else
            class="rben-image-fallback"
          ></div>

          <div class="rben-card-overlay"></div>

          <div class="rben-card-content">
            <span class="rben-eyebrow">
              {{ benefitTwo.eyebrow }}
            </span>

            <h3 class="rben-card-title">
              {{ benefitTwo.title }}
            </h3>

            <p class="rben-card-description">
              {{ benefitTwo.description }}
            </p>
          </div>
        </article>

        <!-- CARD 03 - BOTTOM MIDDLE -->
        <article
          v-if="benefitThree"
          class="rben-card rben-card-three"
        >
          <img
            v-if="hasImage(benefitThree)"
            :src="benefitThree.image"
            :alt="benefitThree.imageAlt"
            class="rben-card-image"
            loading="lazy"
            @error="onImageError(benefitThree.id)"
          />

          <div
            v-else
            class="rben-image-fallback"
          ></div>

          <div class="rben-card-overlay"></div>

          <div class="rben-card-content">
            <span class="rben-eyebrow">
              {{ benefitThree.eyebrow }}
            </span>

            <h3 class="rben-card-title">
              {{ benefitThree.title }}
            </h3>

            <p class="rben-card-description">
              {{ benefitThree.description }}
            </p>
          </div>
        </article>

        <!-- CARD 04 - TALL RIGHT -->
        <article
          v-if="benefitFour"
          class="rben-card rben-card-four"
        >
          <img
            v-if="hasImage(benefitFour)"
            :src="benefitFour.image"
            :alt="benefitFour.imageAlt"
            class="rben-card-image"
            loading="lazy"
            @error="onImageError(benefitFour.id)"
          />

          <div
            v-else
            class="rben-image-fallback"
          ></div>

          <div class="rben-card-overlay"></div>

          <div class="rben-card-content">
            <span class="rben-eyebrow">
              {{ benefitFour.eyebrow }}
            </span>

            <h3 class="rben-card-title">
              {{ benefitFour.title }}
            </h3>

            <p class="rben-card-description">
              {{ benefitFour.description }}
            </p>
          </div>
        </article>

      </div>

    </div>
  </section>
</template>
