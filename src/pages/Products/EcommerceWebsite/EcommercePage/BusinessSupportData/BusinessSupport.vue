
<script setup>
import { ref, nextTick } from 'vue'
import './BusinessSupport.css'

import {
  supportContent,
  supportServices
} from './BusinessSupportData.js'

const trackRef = ref(null)
const activeIndex = ref(0)

const scrollToCard = async (index) => {
  const track = trackRef.value

  if (!track || !supportServices.length) return

  const next =
    (index + supportServices.length) %
    supportServices.length

  activeIndex.value = next

  await nextTick()

  const card = track.children[next]
  if (!card) return

  const trackRect = track.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()

  const target =
    track.scrollLeft +
    cardRect.left -
    trackRect.left

  track.scrollTo({
    left: target,
    behavior: 'smooth'
  })
}

const nextSlide = () => {
  scrollToCard(activeIndex.value + 1)
}

const prevSlide = () => {
  scrollToCard(activeIndex.value - 1)
}

const updateActive = () => {
  const track = trackRef.value
  if (!track) return

  const cards = Array.from(track.children)
  const trackLeft = track.getBoundingClientRect().left

  let nearest = 0
  let distance = Infinity

  cards.forEach((card, index) => {
    const currentDistance = Math.abs(
      card.getBoundingClientRect().left - trackLeft
    )

    if (currentDistance < distance) {
      distance = currentDistance
      nearest = index
    }
  })

  activeIndex.value = nearest
}
</script>

<template>
  <section class="bs-section">
    <div class="bs-container">

      <!-- HEADER -->
      <div class="bs-header">
        <div class="bs-heading">
          <h2 class="bs-title">
            {{ supportContent.title }}
          </h2>
        </div>

        <p class="bs-description">
          {{ supportContent.description }}
        </p>
      </div>

      <!-- SERVICE CARDS -->
      <div
        ref="trackRef"
        class="bs-track"
        @scroll.passive="updateActive"
      >
        <article
          v-for="(item, index) in supportServices"
          :key="item.id"
          class="bs-card"
          :class="{
            'bs-card-offset': index % 2 !== 0
          }"
        >
          <img
            :src="item.image"
            :alt="item.imageAlt"
            class="bs-card-image"
            loading="lazy"
          />

          <div class="bs-card-overlay"></div>

          <div class="bs-card-content">
            <span class="bs-card-number">
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <h3>{{ item.title }}</h3>

            <p>{{ item.description }}</p>
          </div>
        </article>
      </div>

      <!-- NAVIGATION -->
      <div
        v-if="supportServices.length > 1"
        class="bs-controls"
      >
        <div class="bs-arrows">
          <button
            type="button"
            class="bs-arrow"
            aria-label="Previous service"
            @click="prevSlide"
          >
            <i class="fa-solid fa-arrow-left"></i>
          </button>

          <button
            type="button"
            class="bs-arrow bs-arrow-next"
            aria-label="Next service"
            @click="nextSlide"
          >
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
