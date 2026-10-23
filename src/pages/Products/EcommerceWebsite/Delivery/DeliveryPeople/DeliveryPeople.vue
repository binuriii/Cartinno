<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  peopleContent,
  peopleCards
} from './DeliveryPeopleData.js'

const track = ref(null)
const canPrev = ref(false)
const canNext = ref(true)

function updateButtons() {
  const el = track.value
  if (!el) return

  canPrev.value = el.scrollLeft > 4
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
}

function scrollByCard(direction) {
  const el = track.value
  if (!el) return

  const card = el.querySelector('.dp-card')
  if (!card) return

  const gap = parseFloat(getComputedStyle(el).columnGap) || 0

  el.scrollBy({ left: direction * (card.offsetWidth + gap) })
}

onMounted(() => {
  updateButtons()
  window.addEventListener('resize', updateButtons)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateButtons)
})
</script>

<template>
  <section
    class="dp-section"
    aria-labelledby="dp-heading"
  >
    <div class="delivery-container dp-container">
      <!-- HEADING (left) + PARAGRAPH (right) -->
      <header class="delivery-heading dp-head">
        <div class="dp-head-title">
          <p
            v-if="peopleContent.eyebrow"
            class="delivery-eyebrow"
          >
            {{ peopleContent.eyebrow }}
          </p>

          <h2 id="dp-heading">
            {{ peopleContent.title }}
          </h2>
        </div>

        <p class="dp-head-desc">
          {{ peopleContent.description }}
        </p>
      </header>

      <!-- CARD CAROUSEL -->
      <div class="dp-carousel">
        <div
          ref="track"
          class="dp-track"
          role="list"
          tabindex="0"
          aria-label="People cards"
          @scroll.passive="updateButtons"
        >
          <article
            v-for="(card, index) in peopleCards"
            :key="card.id"
            class="dp-card"
            role="listitem"
          >
            <img
              class="dp-card-img"
              :src="card.image"
              :alt="card.alt"
              width="800"
              height="800"
              loading="lazy"
              decoding="async"
              draggable="false"
            />

            <div class="dp-card-body">
              <span class="dp-card-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <h3>
                {{ card.title }}
              </h3>

              <p>
                {{ card.description }}
              </p>
            </div>
          </article>
        </div>

        <!-- ARROWS -->
        <div class="dp-nav">
          <button
            type="button"
            class="dp-nav-btn dp-nav-prev"
            aria-label="Previous"
            :disabled="!canPrev"
            @click="scrollByCard(-1)"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            class="dp-nav-btn dp-nav-next"
            aria-label="Next"
            :disabled="!canNext"
            @click="scrollByCard(1)"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./DeliveryPeople.css"></style>