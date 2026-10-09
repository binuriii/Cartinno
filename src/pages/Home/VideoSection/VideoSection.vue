<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import './VideoSection.css'
import { showcase } from './VideoSectionData.js'

const showcaseRef = ref(null)
const activeIndex = ref(0)

const activeItem = computed(
  () => showcase.items[activeIndex.value]
)

const base = import.meta.env.BASE_URL

// Handles "public/" prefixes, leading slashes and spaces in file names
const assetUrl = (path) => {
  if (!path) return ''

  if (/^(https?:|data:|blob:|\/\/)/i.test(path)) {
    return path
  }

  const clean = path.replace(/^\/+/, '').replace(/^public\//i, '')
  return `${base}${encodeURI(clean)}`
}

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

let animationFrame = 0
let resizeObserver
let motionQuery
let showcaseRows = []
let showcaseImages = []

const updateShowcaseAnimation = () => {
  animationFrame = 0

  if (!showcaseRows.length) return

  const activationLine = window.innerHeight * 0.5
  let nextIndex = 0

  const measurements = showcaseRows.map((row, index) => {
    const bounds = row.getBoundingClientRect()

    if (bounds.top <= activationLine) {
      nextIndex = index
    }

    return { center: bounds.top + bounds.height / 2 }
  })

  // Text changes immediately, with no transition.
  if (activeIndex.value !== nextIndex) {
    activeIndex.value = nextIndex
  }

  measurements.forEach((measurement, index) => {
    const images = showcaseImages[index]
    if (!images) return

    if (motionQuery?.matches) {
      images.forEach((image) => {
        image.style.transform = 'none'
      })
      return
    }

    const distance = activationLine - measurement.center
    const leftOffset = clamp(distance * 0.045, -14, 14)
    const rightOffset = clamp(distance * 0.085, -24, 24)

    if (images[0]) {
      images[0].style.transform = `translate3d(0, ${leftOffset}px, 0) scale(1.08)`
    }

    if (images[1]) {
      images[1].style.transform = `translate3d(0, ${rightOffset}px, 0) scale(1.08)`
    }
  })
}

const requestUpdate = () => {
  if (animationFrame) return
  animationFrame = window.requestAnimationFrame(updateShowcaseAnimation)
}

// Click an item in the left list to jump to that project
const goToItem = (index) => {
  const row = showcaseRows[index]
  if (!row) return

  const rowTop = row.getBoundingClientRect().top + window.scrollY
  const target = rowTop - window.innerHeight * 0.5 + 8

  window.scrollTo({
    top: target,
    behavior: motionQuery?.matches ? 'auto' : 'smooth'
  })
}

const handleImageError = (event) => {
  const image = event.target
  image.hidden = true
  image
    .closest('.vs-showcase-image-card')
    ?.classList.add('is-missing')
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  showcaseRows = Array.from(
    showcaseRef.value.querySelectorAll('.vs-showcase-project')
  )

  showcaseImages = showcaseRows.map((row) =>
    Array.from(row.querySelectorAll('.vs-showcase-image'))
  )

  motionQuery.addEventListener('change', requestUpdate)

  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate, { passive: true })

  resizeObserver = new ResizeObserver(requestUpdate)
  resizeObserver.observe(showcaseRef.value)

  updateShowcaseAnimation()
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame)
  window.removeEventListener('scroll', requestUpdate)
  window.removeEventListener('resize', requestUpdate)

  motionQuery?.removeEventListener('change', requestUpdate)
  resizeObserver?.disconnect()
})
</script>

<template>
  <!-- id="case-studies" kept so any existing #case-studies links still work -->
  <div id="case-studies" class="vs">
    <!-- SCROLLING PRODUCT SHOWCASE -->
    <section
      ref="showcaseRef"
      class="vs-showcase"
      id="commerce-showcase"
      aria-labelledby="vs-showcase-heading"
    >
      <div class="vs-showcase-container">
        <header class="vs-showcase-header">
          <span class="vs-badge">
            {{ showcase.eyebrow }}
          </span>

          <h2
            id="vs-showcase-heading"
            class="vs-showcase-title"
          >
            {{ showcase.title }}
          </h2>
        </header>

        <div class="vs-showcase-layout">
          <!-- STICKY TEXT: NO TEXT ANIMATION -->
          <div class="vs-showcase-copy-column">
            <div
              class="vs-showcase-copy"
              :style="{ '--accent': activeItem.accent }"
            >
              <span class="vs-showcase-counter">
                {{ String(activeIndex + 1).padStart(2, '0') }}
                <span>
                  / {{ String(showcase.items.length).padStart(2, '0') }}
                </span>
              </span>

              <h3 class="vs-showcase-copy-title">
                {{ activeItem.title }}
              </h3>

              <div class="vs-showcase-divider"></div>

              <p class="vs-showcase-description">
                {{ activeItem.description }}
              </p>

              <RouterLink
                :to="activeItem.href"
                class="vs-showcase-link"
              >
                {{ activeItem.linkText }}

                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12h15M13 5l7 7-7 7"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </RouterLink>

              <!-- Item list: shows which project the images belong to -->
              <ul class="vs-showcase-nav" aria-label="Solutions">
                <li
                  v-for="(item, index) in showcase.items"
                  :key="item.id"
                >
                  <button
                    type="button"
                    class="vs-showcase-nav-button"
                    :class="{ 'is-active': index === activeIndex }"
                    :style="{ '--accent': item.accent }"
                    :aria-current="index === activeIndex ? 'true' : undefined"
                    @click="goToItem(index)"
                  >
                    <span class="vs-showcase-nav-dot" aria-hidden="true"></span>
                    {{ item.title }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- SCROLLING IMAGES -->
          <div class="vs-showcase-projects">
            <article
              v-for="(item, itemIndex) in showcase.items"
              :key="item.id"
              class="vs-showcase-project"
              :aria-label="item.title"
              :style="{ '--accent': item.accent }"
            >
              <!-- STATIC COPY FOR MOBILE / REDUCED MOTION -->
              <div class="vs-showcase-mobile-copy">
                <span class="vs-showcase-counter">
                  {{ String(itemIndex + 1).padStart(2, '0') }}
                  <span>
                    / {{ String(showcase.items.length).padStart(2, '0') }}
                  </span>
                </span>

                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>

                <RouterLink
                  :to="item.href"
                  class="vs-showcase-link"
                >
                  {{ item.linkText }}
                  <span aria-hidden="true">→</span>
                </RouterLink>
              </div>

              <div class="vs-showcase-image-pair">
                <figure
                  v-for="(image, imageIndex) in item.images"
                  :key="image.src + imageIndex"
                  class="vs-showcase-image-card"
                  :class="{
                    'vs-showcase-image-card--second': imageIndex === 1
                  }"
                  :style="{
                    '--image-background': image.background
                  }"
                >
                  <img
                    class="vs-showcase-image"
                    :src="assetUrl(image.src)"
                    :alt="image.alt"
                    :style="{
                      objectPosition: image.position || 'center'
                    }"
                    loading="lazy"
                    decoding="async"
                    @error="handleImageError"
                  />

                  <figcaption class="vs-showcase-image-fallback">
                    {{ image.alt }}
                  </figcaption>
                </figure>
              </div>
            </article>
          </div>
        </div>

        <footer class="vs-showcase-footer">
          <RouterLink
            :to="showcase.ctaHref"
            class="vs-showcase-button"
          >
            {{ showcase.ctaText }}
            <span aria-hidden="true">↗</span>
          </RouterLink>
        </footer>
      </div>
    </section>
  </div>
</template>