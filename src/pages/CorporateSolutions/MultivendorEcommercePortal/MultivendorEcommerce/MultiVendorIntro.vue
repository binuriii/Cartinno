<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import {
  multiVendorIntroContent as content
} from './MultiVendorIntroData.js'

import './MultiVendorIntro.css'

const sectionRef = ref(null)
const visible = ref(false)
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
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return

      visible.value = true
      observer?.disconnect()
      observer = null
    },
    { threshold: 0.1 }
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
    class="mvi-section"
    :class="{ 'mvi-visible': visible }"
  >
    <div class="mvi-container">

      <!-- TOP CONTENT -->
      <div class="mvi-top">

        <!-- LEFT HEADING -->
        <div class="mvi-heading-wrap">

          <h1 class="mvi-heading">
            {{ content.title1 }}<br>{{ content.title2 }}
          </h1>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="mvi-details">

          <h2 class="mvi-subtitle">
            {{ content.subTitle }}
          </h2>

          <p class="mvi-description">
            {{ content.description1 }}<br><br>
            {{ content.description2 }}
          </p>

          <div class="mvi-tags">
            <span
              v-for="(tag, index) in content.tags"
              :key="index"
              class="mvi-tag"
            >
              {{ tag }}
            </span>

          </div>

        </div>

      </div>

      <!-- LARGE IMAGE -->
      <div class="mvi-image-wrap">

        <img
          v-if="!imageFailed"
          :src="content.image"
          :alt="content.imageAlt"
          class="mvi-image"
          loading="lazy"
          @error="imageFailed = true"
        />

        <div
          v-else
          class="mvi-image-fallback"
          aria-hidden="true"
        >
          <i class="fa-solid fa-store"></i>
        </div>

      </div>

    </div>
  </section>
</template>
