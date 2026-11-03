<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  benefitsSectionContent as content,
  benefitsSection
} from './BenefitsSectionData.js'

import './BenefitsSection.css'

const sectionRef = ref(null)
const visible = ref(false)
const failedImages = ref(new Set())

const benefitOne = benefitsSection[0]
const benefitTwo = benefitsSection[1]
const benefitThree = benefitsSection[2]

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
    id="business-benefits"
    class="ben-section"
    :class="{ 'ben-visible': visible }"
  >
    <div class="ben-container">

      <!-- SECTION HEADER -->
      <header class="ben-header">
        <h2 class="ben-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- FOUR-CARD BENTO GRID -->
      <div class="ben-grid">

        <!-- CARD 01: WIDE TOP LEFT -->
        <article class="ben-card ben-card-one">

          <div class="ben-card-content">

            <h3 class="ben-card-title">
              {{ content.introTitle }}
            </h3>

            <p class="ben-card-description">
              {{ content.introDescription }}
            </p>

          </div>

        </article>

        <!-- CARD 02: SMALL BOTTOM LEFT -->
        <article
          v-if="benefitOne"
          class="ben-card ben-card-two"
        >
          <img
            v-if="hasImage(benefitOne)"
            :src="benefitOne.image"
            :alt="benefitOne.imageAlt"
            class="ben-card-image"
            loading="lazy"
            @error="onImageError(benefitOne.id)"
          />

          <div
            v-else
            class="ben-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-bolt"></i>
          </div>

          <div
            class="ben-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="ben-card-content">

            <h3 class="ben-card-title">
              {{ benefitOne.title }}
            </h3>

            <p class="ben-card-description">
              {{ benefitOne.description }}
            </p>

          </div>
        </article>

        <!-- CARD 03: SMALL BOTTOM MIDDLE -->
        <article
          v-if="benefitTwo"
          class="ben-card ben-card-three"
        >
          <img
            v-if="hasImage(benefitTwo)"
            :src="benefitTwo.image"
            :alt="benefitTwo.imageAlt"
            class="ben-card-image"
            loading="lazy"
            @error="onImageError(benefitTwo.id)"
          />

          <div
            v-else
            class="ben-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-layer-group"></i>
          </div>

          <div
            class="ben-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="ben-card-content">

            <h3 class="ben-card-title">
              {{ benefitTwo.title }}
            </h3>

            <p class="ben-card-description">
              {{ benefitTwo.description }}
            </p>

          </div>
        </article>

        <!-- CARD 04: TALL RIGHT -->
        <article
          v-if="benefitThree"
          class="ben-card ben-card-four"
        >
          <img
            v-if="hasImage(benefitThree)"
            :src="benefitThree.image"
            :alt="benefitThree.imageAlt"
            class="ben-card-image"
            loading="lazy"
            @error="onImageError(benefitThree.id)"
          />

          <div
            v-else
            class="ben-image-fallback"
            aria-hidden="true"
          >
            <i class="fa-solid fa-chart-line"></i>
          </div>

          <div
            class="ben-card-overlay"
            aria-hidden="true"
          ></div>

          <div class="ben-card-content">

            <h3 class="ben-card-title">
              {{ benefitThree.title }}
            </h3>

            <p class="ben-card-description">
              {{ benefitThree.description }}
            </p>

          </div>
        </article>

      </div>

    </div>
  </section>
</template>
