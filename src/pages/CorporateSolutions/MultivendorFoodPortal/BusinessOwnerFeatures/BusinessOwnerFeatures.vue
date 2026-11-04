
<script setup>
import {
  computed,
  nextTick,
  ref
} from 'vue'

import {
  businessOwnerFeaturesContent as content,
  businessOwnerFeatures as features
} from './BusinessOwnerFeaturesData.js'

import './BusinessOwnerFeatures.css'

const track = ref(null)
const activeIndex = ref(0)

const total = features.length

const activeFeature = computed(() => features[activeIndex.value])

const formattedIndex = computed(() =>
  String(activeIndex.value + 1).padStart(2, '0')
)

const formattedTotal = computed(() =>
  String(total).padStart(2, '0')
)

const featureNumber = (index) =>
  String(index + 1).padStart(2, '0')

const scrollToFeature = async (index) => {
  const safeIndex = Math.max(0, Math.min(index, total - 1))

  activeIndex.value = safeIndex

  await nextTick()

  const container = track.value
  if (!container) return

  const cards = container.querySelectorAll('.bof-card')
  const target = cards[safeIndex]

  if (!target) return

  container.scrollTo({
    left: target.offsetLeft - cards[0].offsetLeft,
    behavior: 'smooth'
  })
}

const previousFeature = () => {
  scrollToFeature(
    activeIndex.value <= 0
      ? total - 1
      : activeIndex.value - 1
  )
}

const nextFeature = () => {
  scrollToFeature(
    activeIndex.value >= total - 1
      ? 0
      : activeIndex.value + 1
  )
}

const handleScroll = () => {
  const container = track.value
  if (!container) return

  const cards = [...container.querySelectorAll('.bof-card')]
  if (!cards.length) return

  const containerLeft = container.getBoundingClientRect().left

  let closestIndex = 0
  let closestDistance = Infinity

  cards.forEach((card, index) => {
    const distance = Math.abs(
      card.getBoundingClientRect().left - containerLeft
    )

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeIndex.value = closestIndex
}
</script>

<template>
  <section
    id="business-owner-features"
    class="bof-section"
  >
    <div class="bof-container">

      <!-- HEADER -->
      <header class="bof-header">
        <div class="bof-header-copy">
          <h2>{{ content.title }}</h2>
          <p>{{ content.description }}</p>
        </div>
      </header>

      <!-- MAIN LAYOUT -->
      <div class="bof-layout">

        <!-- LEFT INFORMATION -->
        <aside class="bof-info">
          <div class="bof-info-copy">

            <div class="bof-counter">
              <span class="bof-counter-current">
                {{ formattedIndex }}
              </span>

              <span class="bof-counter-total">
                /{{ formattedTotal }}
              </span>
            </div>

            <div class="bof-active-copy">
              <h3>{{ activeFeature.title }}</h3>

              <p class="bof-description">
                {{ activeFeature.text }}
              </p>
            </div>

          </div>

          <!-- CAROUSEL CONTROLS -->
          <div class="bof-arrows">

            <button
              type="button"
              class="bof-arrow"
              aria-label="Previous feature"
              @click="previousFeature"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14 7l-5 5 5 5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12h8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <button
              type="button"
              class="bof-arrow bof-arrow-dark"
              aria-label="Next feature"
              @click="nextFeature"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M10 7l5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 12H7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </button>

          </div>
        </aside>

        <!-- FEATURE CAROUSEL -->
        <div class="bof-carousel">
          <div
            ref="track"
            class="bof-track"
            @scroll.passive="handleScroll"
          >

            <article
              v-for="(feature, index) in features"
              :key="feature.id"
              class="bof-card"
              :class="{
                'bof-card-active': activeIndex === index
              }"
              :style="{
                '--bof-color-one': feature.c1,
                '--bof-color-two': feature.c2
              }"
              @click="scrollToFeature(index)"
            >

              <!-- CARD BACKGROUND -->
              <div class="bof-card-background"></div>

              <!-- CARD IMAGE -->
              <img
                v-if="feature.image"
                :src="feature.image"
                :alt="feature.title"
                class="bof-card-image"
                loading="lazy"
              />

              <!-- TOP -->
              <div class="bof-card-top">
                <span class="bof-card-chip">
                  <i
                    class="fa-solid"
                    :class="feature.icon"
                    aria-hidden="true"
                  ></i>
                </span>

                <span class="bof-card-number">
                  {{ featureNumber(index) }}
                </span>
              </div>



              <!-- BOTTOM CONTENT -->
              <div class="bof-card-content">
                <h3>{{ feature.title }}</h3>

                <p>{{ feature.text }}</p>

                <div class="bof-card-progress">
                  <span class="bof-card-progress-line"></span>
                  <span>
                    {{ featureNumber(index) }} / {{ formattedTotal }}
                  </span>
                </div>
              </div>

            </article>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
