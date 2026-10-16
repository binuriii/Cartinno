
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './UpsellHighlights.css'

import {
  upsellHighlightsContent,
  upsellHighlights
} from './UpsellHighlightsData.js'

const sectionRef = ref(null)
const visibleRows = ref(new Set())
let observer = null

onMounted(() => {
  const rows = sectionRef.value?.querySelectorAll('.uh-row')
  if (!rows?.length) return

  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    visibleRows.value = new Set(upsellHighlights.map(item => item.id))
    return
  }

  observer = new IntersectionObserver(
    entries => {
      const next = new Set(visibleRows.value)

      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        next.add(Number(entry.target.dataset.rowId))
        observer.unobserve(entry.target)
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
    class="uh-section"
    id="upsell-highlights"
  >
    <div class="uh-container">

      <!-- CENTERED HEADING -->
      <header class="uh-header">
        <h2 class="uh-heading">
          {{ upsellHighlightsContent.title }}
        </h2>
      </header>

      <!-- ALTERNATING FEATURE ROWS -->
      <div class="uh-list">

        <article
          v-for="(item, index) in upsellHighlights"
          :key="item.id"
          class="uh-row"
          :class="[
            { 'uh-row-reverse': index % 2 === 1 },
            { 'uh-row-visible': visibleRows.has(item.id) },
            `uh-theme-${item.theme}`
          ]"
          :data-row-id="item.id"
        >

          <!-- IMAGE -->
          <div class="uh-media">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.imageAlt"
              loading="lazy"
              class="uh-image"
            />

            <div v-else class="uh-image-placeholder">
              <div class="uh-placeholder-window">

                <div class="uh-window-top">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div class="uh-placeholder-icon">
                  <i
                    :class="index === 0
                      ? 'fa-solid fa-cart-plus'
                      : index === 1
                        ? 'fa-solid fa-tags'
                        : 'fa-solid fa-layer-group'"
                    aria-hidden="true"
                  ></i>
                </div>

                <strong>{{ item.title }}</strong>
                <small>Cartinno Smart Upsells</small>

              </div>
            </div>
          </div>

          <!-- TEXT -->
          <div class="uh-content">
            <span class="uh-number">
              0{{ index + 1 }}
            </span>

            <h3 class="uh-title">
              {{ item.title }}
            </h3>

            <p class="uh-description">
              {{ item.description }}
            </p>
          </div>

        </article>

      </div>
    </div>
  </section>
</template>
