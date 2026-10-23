
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  onlineMenuBenefitsContent as content,
  onlineMenuBenefits
} from './OnlineMenuBenefitsData.js'

import './OnlineMenuBenefits.css'

const sectionRef = ref(null)
const visible = ref(false)
const failedImages = ref(new Set())

const benefitOne = onlineMenuBenefits[0]
const benefitTwo = onlineMenuBenefits[1]
const benefitThree = onlineMenuBenefits[2]

let observer = null

function hasImage(card) {
  return Boolean(card?.image) &&
    !failedImages.value.has(card.id)
}

function onImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

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
    id="online-menu-benefits"
    class="omb-section"
    :class="{ 'omb-visible': visible }"
  >
    <div class="omb-container">

      <!-- SECTION HEADER -->
      <header class="omb-header">
        <h2 class="omb-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- EXACT FOUR-CARD GRID -->
      <div class="omb-grid">

        <!-- CARD 01: WIDE TOP LEFT -->
        <article class="omb-card omb-card-one">

          <div class="omb-card-content">

            <h3 class="omb-card-title">
              {{ content.introTitle }}
            </h3>

            <p class="omb-card-description">
              {{ content.introDescription }}
            </p>
          </div>

          <div
            class="omb-intro-decoration"
            aria-hidden="true"
          >
          </div>

        </article>

        <!-- CARD 02: SMALL BOTTOM LEFT -->
        <article
          v-if="benefitOne"
          class="omb-card omb-card-two"
        >
          <img
            v-if="hasImage(benefitOne)"
            :src="benefitOne.image"
            :alt="benefitOne.imageAlt"
            class="omb-card-image"
            loading="lazy"
            @error="onImageError(benefitOne.id)"
          />

          <div
            v-else
            class="omb-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-utensils"></i>
          </div>

          <div
            class="omb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="omb-card-content">

            <h3 class="omb-card-title">
              {{ benefitOne.title }}
            </h3>

            <p class="omb-card-description">
              {{ benefitOne.description }}
            </p>
          </div>
        </article>

        <!-- CARD 03: SMALL BOTTOM MIDDLE -->
        <article
          v-if="benefitTwo"
          class="omb-card omb-card-three"
        >
          <img
            v-if="hasImage(benefitTwo)"
            :src="benefitTwo.image"
            :alt="benefitTwo.imageAlt"
            class="omb-card-image"
            loading="lazy"
            @error="onImageError(benefitTwo.id)"
          />

          <div
            v-else
            class="omb-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-utensils"></i>
          </div>

          <div
            class="omb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="omb-card-content">

            <h3 class="omb-card-title">
              {{ benefitTwo.title }}
            </h3>

            <p class="omb-card-description">
              {{ benefitTwo.description }}
            </p>
          </div>
        </article>

        <!-- CARD 04: TALL RIGHT -->
        <article
          v-if="benefitThree"
          class="omb-card omb-card-four"
        >
          <img
            v-if="hasImage(benefitThree)"
            :src="benefitThree.image"
            :alt="benefitThree.imageAlt"
            class="omb-card-image"
            loading="lazy"
            @error="onImageError(benefitThree.id)"
          />

          <div
            v-else
            class="omb-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-utensils"></i>
          </div>

          <div
            class="omb-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="omb-card-content">

            <h3 class="omb-card-title">
              {{ benefitThree.title }}
            </h3>

            <p class="omb-card-description">
              {{ benefitThree.description }}
            </p>
          </div>
        </article>

      </div>

    </div>
  </section>
</template>
