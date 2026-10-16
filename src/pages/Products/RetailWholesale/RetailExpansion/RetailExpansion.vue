
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './RetailExpansion.css'

import {
  retailExpansionContent,
  retailExpansionCards
} from './RetailExpansionData.js'

const sectionRef = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reduceMotion ||
    !('IntersectionObserver' in window)
  ) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    {
      threshold: 0.12
    }
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
    id="retail-expansion"
    class="re-section"
    :class="{ 're-visible': isVisible }"
  >
    <div class="re-container">

      <!-- LEFT-ALIGNED HEADING -->
      <header class="re-header">

        <h2 class="re-heading">
          {{ retailExpansionContent.title1 }}
            <br/>
            {{ retailExpansionContent.title2 }}
        </h2>

        <p class="re-description">
          {{ retailExpansionContent.description }}
        </p>

      </header>

      <!-- THREE STAGGERED CARDS -->
      <div class="re-grid">

        <article
          v-for="(card, index) in retailExpansionCards"
          :key="card.id"
          class="re-card"
          :class="[
            `re-card-${card.theme}`,
            { 're-card-middle': index === 1 }
          ]"
          :style="{ '--re-index': index }"
        >

          <!-- IMAGE -->
          <div class="re-card-image-wrapper">

            <img
              class="re-card-image"
              :src="card.image"
              :alt="card.imageAlt"
              loading="lazy"
            />

            <div
              class="re-card-overlay"
              aria-hidden="true"
            ></div>

          </div>

          <!-- NUMBER -->
          <span class="re-card-number">
            {{ card.number }}
          </span>

          <!-- FLOATING CONTENT PANEL -->
          <div class="re-card-panel">

            <div class="re-card-text">

              <h3 class="re-card-title">
                {{ card.title }}
              </h3>

              <p class="re-card-description">
                {{ card.description }}
              </p>

            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
