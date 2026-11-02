<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { appIntroContent } from './AppIntroData.js'
import './AppIntro.css'

const sectionRef = ref(null)
const isVisible = ref(false)
const imageFailed = ref(false)

let observer = null

onMounted(() => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    entries => {
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
    class="ai-section"
    :class="{ 'ai-visible': isVisible }"
    id="app-intro"
  >
    <div class="ai-container">

      <!-- =====================================
           HERO BLUE CARD (Based on Push Notifications)
      ====================================== -->
      <article class="ai-hero-card">

        <!-- LEFT: MAIN CONTENT -->
        <div class="ai-main-content">

          <span class="ai-label">
            {{ appIntroContent.label }}
          </span>

          <h1>
            {{ appIntroContent.title }}
          </h1>

          <p>
            {{ appIntroContent.description }}
          </p>

          <a :href="appIntroContent.buttonLink" class="ai-button">
            {{ appIntroContent.buttonText }}
            <i class="fa-solid fa-arrow-right"></i>
          </a>

        </div>

        <!-- RIGHT: FLOATING VISUAL -->
        <div class="ai-visual">
          <div class="ai-image-wrapper">
            <img 
              v-if="!imageFailed"
              :src="appIntroContent.image" 
              :alt="appIntroContent.imageAlt"
              class="ai-floating-img"
              @error="imageFailed = true"
            />
            <div v-else class="ai-image-fallback">
              <i class="fa-solid fa-motorcycle"></i>
            </div>
          </div>
        </div>

      </article>

    </div>
  </section>
</template>