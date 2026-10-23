
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue'

import {
  giftCardBusinessesContent,
  giftCardBusinesses
} from './GiftCardBusinessesData.js'

import './GiftCardBusinesses.css'

const trackRef = ref(null)

const canPrev = ref(false)
const canNext = ref(false)

let resizeObserver = null

// UPDATE ARROWS BASED ON SCROLL POSITION
function updateArrows() {
  const track = trackRef.value

  if (!track) return

  const maxScroll =
    track.scrollWidth - track.clientWidth

  canPrev.value = track.scrollLeft > 2

  canNext.value =
    track.scrollLeft < maxScroll - 2
}

// SCROLL ONE CARD AT A TIME
function scrollCards(direction) {
  const track = trackRef.value

  if (!track) return

  const firstCard = track.querySelector('.gcb-card')

  if (!firstCard) return

  const gap =
    parseFloat(window.getComputedStyle(track).columnGap) || 0

  const cardWidth =
    firstCard.getBoundingClientRect().width

  const distance = cardWidth + gap

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  track.scrollBy({
    left: distance * direction,
    behavior: reducedMotion ? 'auto' : 'smooth'
  })
}

onMounted(async () => {
  await nextTick()

  updateArrows()

  window.addEventListener('resize', updateArrows)

  if ('ResizeObserver' in window && trackRef.value) {
    resizeObserver = new ResizeObserver(updateArrows)

    resizeObserver.observe(trackRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateArrows)

  resizeObserver?.disconnect()
})
</script>

<template>
  <section
    class="gcb-section"
    id="gift-card-businesses"
  >
    <div class="gcb-container">

      <!-- HEADER WITH ARROWS -->
      <header class="gcb-header">

        <!-- LEFT HEADING -->
        <div class="gcb-header-content">

          <h2 class="gcb-heading">
            {{ giftCardBusinessesContent.title }}
          </h2>

          <p class="gcb-description">
            {{ giftCardBusinessesContent.description }}
          </p>

        </div>

        <!-- RIGHT ARROWS -->
        <div class="gcb-controls">

          <button
            type="button"
            class="gcb-arrow gcb-arrow-prev"
            aria-label="Previous businesses"
            :disabled="!canPrev"
            @click="scrollCards(-1)"
          >
            <i
              class="fa-solid fa-chevron-left"
              aria-hidden="true"
            ></i>
          </button>

          <button
            type="button"
            class="gcb-arrow gcb-arrow-next"
            aria-label="Next businesses"
            :disabled="!canNext"
            @click="scrollCards(1)"
          >
            <i
              class="fa-solid fa-chevron-right"
              aria-hidden="true"
            ></i>
          </button>

        </div>

      </header>

      <!-- CAROUSEL -->
      <div class="gcb-carousel">

        <div
          ref="trackRef"
          class="gcb-track"
          aria-label="Gift card business categories"
          @scroll.passive="updateArrows"
        >

          <article
            v-for="business in giftCardBusinesses"
            :key="business.id"
            class="gcb-card"
          >

            <!-- BUSINESS IMAGE -->
            <img
              v-if="business.image"
              :src="business.image"
              :alt="business.imageAlt"
              class="gcb-card-image"
              loading="lazy"
            />

            <!-- PLACEHOLDER IF NO IMAGE -->
            <div
              v-else
              class="gcb-placeholder"
              aria-hidden="true"
            >
              <i
                class="fa-solid"
                :class="{
                  'fa-utensils': business.id === 1,
                  'fa-spa': business.id === 2,
                  'fa-bag-shopping': business.id === 3,
                  'fa-hotel': business.id === 4,
                  'fa-pump-soap': business.id === 5,
                  'fa-dumbbell': business.id === 6
                }"
              ></i>
            </div>

            <!-- DARK OVERLAY -->
            <div class="gcb-card-overlay"></div>

            <!-- CONTENT -->
            <div class="gcb-card-content">

              <h3 class="gcb-card-title">
                {{ business.title }}
              </h3>

              <p class="gcb-card-description">
                {{ business.description }}
              </p>

            </div>

          </article>

        </div>

      </div>

    </div>
  </section>
</template>
