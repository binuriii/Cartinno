<script setup>
import { computed, nextTick, ref } from 'vue'
import './WhatWeDo.css'
import { services } from './WhatWeDoData.js'

const track = ref(null)
const activeIndex = ref(0)

const total = services.length

const activeService = computed(() => {
  return services[activeIndex.value]
})

const formattedIndex = computed(() => {
  return String(activeIndex.value + 1).padStart(2, '0')
})

const formattedTotal = computed(() => {
  return String(total).padStart(2, '0')
})

const serviceNumber = (index) => {
  return String(index + 1).padStart(2, '0')
}

const scrollToService = async (index) => {
  const safeIndex = Math.max(
    0,
    Math.min(index, total - 1)
  )

  activeIndex.value = safeIndex

  await nextTick()

  const container = track.value

  if (!container) return

  const cards = container.querySelectorAll(
    '.wwd-process-card'
  )

  const target = cards[safeIndex]

  if (!target) return

  container.scrollTo({
    left: target.offsetLeft,
    behavior: 'smooth'
  })
}

const previousService = () => {
  if (activeIndex.value <= 0) {
    scrollToService(total - 1)
    return
  }

  scrollToService(
    activeIndex.value - 1
  )
}

const nextService = () => {
  if (
    activeIndex.value >=
    total - 1
  ) {
    scrollToService(0)
    return
  }

  scrollToService(
    activeIndex.value + 1
  )
}

const handleScroll = () => {
  const container = track.value

  if (!container) return

  const cards = [
    ...container.querySelectorAll(
      '.wwd-process-card'
    )
  ]

  if (!cards.length) return

  const containerLeft =
    container.getBoundingClientRect().left

  let closestIndex = 0
  let closestDistance = Infinity

  cards.forEach(
    (card, index) => {
      const cardLeft =
        card.getBoundingClientRect().left

      const distance =
        Math.abs(
          cardLeft -
          containerLeft
        )

      if (
        distance <
        closestDistance
      ) {
        closestDistance =
          distance

        closestIndex =
          index
      }
    }
  )

  activeIndex.value =
    closestIndex
}
</script>

<template>
  <section
    id="services"
    class="wwd-process"
  >
    <div class="wwd-process-container">

      <!-- HEADER -->
      <div class="wwd-process-header">
        <h2>What We Do</h2>
      </div>

      <!-- MAIN -->
      <div class="wwd-process-layout">

        <!-- LEFT INFO -->
        <aside class="wwd-process-info">

          <div class="wwd-process-info-copy">

            <div class="wwd-process-counter">
              <span
                class="wwd-process-counter-current"
              >
                {{ formattedIndex }}
              </span>

              <span
                class="wwd-process-counter-total"
              >
                /{{ formattedTotal }}
              </span>
            </div>

            <p class="wwd-process-description">
              {{ activeService.text }}
            </p>

          </div>

          <!-- CONTROLS -->
          <div class="wwd-process-arrows">

            <button
              type="button"
              class="wwd-process-arrow"
              aria-label="Previous service"
              @click="previousService"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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
              class="
                wwd-process-arrow
                wwd-process-arrow-dark
              "
              aria-label="Next service"
              @click="nextService"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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

        <!-- CAROUSEL -->
        <div class="wwd-process-carousel">

          <div
            ref="track"
            class="wwd-process-track"
            @scroll.passive="handleScroll"
          >

            <article
              v-for="(service, index) in services"
              :key="service.title"
              class="wwd-process-card"
              :class="{
                'wwd-process-card-active':
                  activeIndex === index
              }"
              @click="scrollToService(index)"
            >

              <!-- IMAGE WRAPPER -->
              <div class="wwd-process-card-media">
                <img
                  :src="service.image"
                  :alt="service.title"
                  loading="lazy"
                  draggable="false"
                  class="wwd-process-card-img"
                />
              </div>

              <!-- OVERLAYS -->
              <div
                class="wwd-process-card-overlay"
              ></div>

              <div
                class="wwd-process-card-brand"
              ></div>

              <!-- TOP -->
              <div
                class="wwd-process-card-top"
              >

                <span
                  class="wwd-process-card-chip"
                >
                  <i
                    class="fa-solid"
                    :class="service.icon"
                    aria-hidden="true"
                  ></i>
                </span>

                <span
                  class="wwd-process-card-number"
                >
                  {{ serviceNumber(index) }}
                </span>

              </div>

              <!-- BOTTOM -->
              <div
                class="wwd-process-card-content"
              >

                <h3>
                  {{ service.title }}
                </h3>

                <p>
                  {{ service.text }}
                </p>

                <p
                  v-if="service.note"
                  class="wwd-process-note"
                >
                  {{ service.note }}
                </p>

                <a
                  :href="service.href"
                  class="wwd-process-link"
                  @click.stop
                >
                  Explore More

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17L17 7"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />

                    <path
                      d="M9 7h8v8"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>

              

              </div>

            </article>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>