
<script setup>
import {
  computed,
  ref,
  watch,
  nextTick,
  onMounted
} from 'vue'

import { useRouter } from 'vue-router'
import { testimonials } from './TestimonialsData.js'
import './Testimonials.css'

const props = defineProps({
  title: {
    type: String,
    default: 'Trusted by owners'
  },
  description: {
    type: String,
    default: 'Discover how businesses are growing with Cartinno. Hear real stories from owners who are creating better customer experiences and taking their businesses further.'
  },
  items: {
    type: Array,
    default: () => testimonials
  }
})

const router = useRouter()

const trackRef = ref(null)
const activeIndex = ref(0)

const videoOpen = ref(false)
const videoUrl = ref('')

const total = computed(() => props.items.length)

// SCROLL TO SPECIFIC CARD
const scrollToIndex = async (index) => {
  if (!total.value) return

  const track = trackRef.value
  if (!track) return

  const next = Math.max(
    0,
    Math.min(index, total.value - 1)
  )

  const card = track.children[next]
  if (!card) return

  activeIndex.value = next

  const trackRect = track.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()

  const target =
    track.scrollLeft +
    cardRect.left -
    trackRect.left -
    parseFloat(getComputedStyle(track).paddingLeft)

  track.scrollTo({
    left: target,
    behavior: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches ? 'auto' : 'smooth'
  })
}

// NEXT
const nextSlide = () => {
  scrollToIndex(
    activeIndex.value >= total.value - 1
      ? 0
      : activeIndex.value + 1
  )
}

// PREVIOUS
const prevSlide = () => {
  scrollToIndex(
    activeIndex.value <= 0
      ? total.value - 1
      : activeIndex.value - 1
  )
}

// UPDATE ACTIVE CARD WHEN SWIPING
const updateActiveSlide = () => {
  const track = trackRef.value
  if (!track) return

  const cards = Array.from(track.children)
  if (!cards.length) return

  const trackRect = track.getBoundingClientRect()
  const paddingLeft =
    parseFloat(getComputedStyle(track).paddingLeft) || 0

  const targetLeft = trackRect.left + paddingLeft

  let closestIndex = 0
  let closestDistance = Infinity

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    const distance = Math.abs(rect.left - targetLeft)

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeIndex.value = closestIndex
}

// BUTTON NAVIGATION
const navigateTo = (href) => {
  if (!href) return

  if (/^https?:\/\//i.test(href)) {
    window.open(
      href,
      '_blank',
      'noopener,noreferrer'
    )
    return
  }

  if (href.startsWith('/')) {
    router.push(href)
    return
  }

  window.location.href = href
}

// VIDEO
const playVideo = (url) => {
  if (!url) return
  videoUrl.value = url
  videoOpen.value = true
}

const closeVideo = () => {
  videoOpen.value = false
  videoUrl.value = ''
}

// RESET WHEN DATA CHANGES
watch(
  () => props.items,
  async () => {
    activeIndex.value = 0
    await nextTick()
    trackRef.value?.scrollTo({
      left: 0,
      behavior: 'auto'
    })
  }
)

onMounted(() => {
  activeIndex.value = 0
})
</script>

<template>
  <section class="ts-section">
    <div class="ts-container">

      <!-- HEADING -->
      <div class="ts-header">
        <div class="ts-heading-content">
          <h2>{{ title }}</h2>

          <p class="ts-description">
            {{ description }}
          </p>
        </div>

        <div v-if="total > 1" class="ts-arrows">
          <button
            type="button"
            class="ts-arrow"
            aria-label="Previous testimonial"
            @click="prevSlide"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            class="ts-arrow ts-arrow-next"
            aria-label="Next testimonial"
            @click="nextSlide"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M12 5L19 12L12 19"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- CAROUSEL -->
    <div
      ref="trackRef"
      class="ts-track"
      @scroll.passive="updateActiveSlide"
    >
      <article
        v-for="(item, index) in items"
        :key="item.id ?? index"
        class="ts-card"
      >
        <!-- LEFT CONTENT -->
        <div class="ts-card-content">

          <div class="ts-card-top">
            <h3 class="ts-quote">
              "{{ item.quote }}"
            </h3>

            <p class="ts-author">
              {{ item.author }}
              <span v-if="item.business">
                — {{ item.business }}
              </span>
            </p>

            <button
              v-if="item.link"
              type="button"
              class="ts-learn-btn"
              @click="navigateTo(item.link)"
            >
              Learn more
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <!-- STATS -->
          <div
            v-if="item.stats?.length"
            class="ts-stats"
          >
            <div
              v-for="(stat, statIndex) in item.stats"
              :key="statIndex"
              class="ts-stat"
            >
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- IMAGE -->
        <div class="ts-card-media">
          <img
            :src="item.image"
            :alt="
              item.imageAlt ||
              item.business ||
              'Customer story'
            "
            loading="lazy"
          />

          <button
            v-if="item.video"
            type="button"
            class="ts-play"
            aria-label="Play customer video"
            @click="playVideo(item.video)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M8 5.5L19 12L8 18.5V5.5Z"
              />
            </svg>
          </button>
        </div>
      </article>
    </div>

    <!-- VIDEO MODAL -->
    <div
      v-if="videoOpen"
      class="ts-video-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Customer video"
      @click.self="closeVideo"
    >
      <div class="ts-video-box">
        <button
          type="button"
          class="ts-video-close"
          aria-label="Close video"
          @click="closeVideo"
        >
          ×
        </button>

        <video
          :src="videoUrl"
          controls
          autoplay
          playsinline
        ></video>
      </div>
    </div>
  </section>
</template>
