
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './PosSetupSection.css'
import { posSetupContent } from './PosSetupSectionData.js'

const sectionRef = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -8% 0px'
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
    class="ps-section"
    :class="{ 'ps-visible': isVisible }"
  >
    <div class="ps-container">

      <!-- LEFT-ALIGNED SECTION HEADING -->
      <div class="ps-header">
        <h2 class="ps-title">
          {{ posSetupContent.headingPart1 }}
          <span class="ps-title-bold">
            {{ posSetupContent.headingPart2 }}
          </span>
        </h2>
      </div>

      <!-- TWO-COLUMN LAYOUT -->
      <div class="ps-layout">

        <!-- LEFT IMAGE CARD -->
        <div class="ps-image-column">
          <div class="ps-image-card">
            <img
              :src="posSetupContent.image.src"
              :alt="posSetupContent.image.alt"
              loading="lazy"
            />
          </div>
        </div>

        <!-- RIGHT FEATURES -->
        <div class="ps-features-column">

          <div
            v-for="(feature, idx) in posSetupContent.features"
            :key="feature.id"
            class="ps-feature-item"
            :style="{ '--ps-index': idx }"
          >
            <div class="ps-feature-content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
