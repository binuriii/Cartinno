
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './FoodSmartUpsellsHighlights.css'

import {
  foodSmartUpsellsHighlightsContent as content,
  foodSmartUpsellsHighlights as highlights
} from './FoodSmartUpsellsHighlightsData.js'

const sectionRef = ref(null)
const visibleRows = ref(new Set())
const failedImages = ref(new Set())

let observer = null

function hasImage(item) {
  return Boolean(item.image) &&
    !failedImages.value.has(item.id)
}

function onImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

onMounted(() => {
  const rows = sectionRef.value?.querySelectorAll(
    '.fsh-row'
  )

  if (!rows?.length) return

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    visibleRows.value = new Set(
      highlights.map(item => item.id)
    )
    return
  }

  observer = new IntersectionObserver(
    entries => {
      const next = new Set(visibleRows.value)

      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        next.add(
          Number(entry.target.dataset.rowId)
        )

        observer?.unobserve(entry.target)
      })

      visibleRows.value = next
    },
    { threshold: 0.15 }
  )

  rows.forEach(row => observer.observe(row))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="food-smart-upsells-highlights"
    class="fsh-section"
  >
    <div class="fsh-container">

      <!-- CENTERED HEADING -->
      <header class="fsh-header">

        <h2 class="fsh-heading">
          {{ content.title }}
        </h2>

      </header>

      <!-- ALTERNATING FEATURE ROWS -->
      <div class="fsh-list">

        <article
          v-for="(item, index) in highlights"
          :key="item.id"
          class="fsh-row"
          :class="[
            { 'fsh-row-reverse': index % 2 === 1 },
            { 'fsh-row-visible': visibleRows.has(item.id) },
            `fsh-theme-${item.theme}`
          ]"
          :data-row-id="item.id"
        >

          <!-- IMAGE AREA -->
          <div class="fsh-media">

            <img
              v-if="hasImage(item)"
              :src="item.image"
              :alt="item.imageAlt"
              loading="lazy"
              class="fsh-image"
              @error="onImageError(item.id)"
            />

            <!-- FALLBACK ILLUSTRATION -->
            <div
              v-else
              class="fsh-image-placeholder"
            >
              <div class="fsh-placeholder-window">

                <div class="fsh-window-top">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div class="fsh-placeholder-icon">
                  <i
                    :class="
                      index === 0
                        ? 'fa-solid fa-burger'
                        : index === 1
                          ? 'fa-solid fa-tags'
                          : 'fa-solid fa-layer-group'
                    "
                    aria-hidden="true"
                  ></i>
                </div>

                <strong>
                  {{ item.title }}
                </strong>

                <small>
                  Cartinno Food Smart Upsells
                </small>

              </div>
            </div>

          </div>

          <!-- TEXT CONTENT -->
          <div class="fsh-content">

            <span class="fsh-number">
              0{{ index + 1 }}
            </span>

            <h3 class="fsh-title">
              {{ item.title }}
            </h3>

            <p class="fsh-description">
              {{ item.description }}
            </p>

          </div>

        </article>

      </div>
    </div>
  </section>
</template>
