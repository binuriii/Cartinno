<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './PosSetupSection.css'
import { posSetupContent } from './PosSetupSectionData.js'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

function play() {
  isVisible.value = true
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        play()
        observer?.disconnect()
      }
    },
    { threshold: 0.2 }
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
  <section ref="sectionRef" class="ps-section" :class="{ 'is-visible': isVisible }">
    <div class="ps-container">
      
      <!-- Centered Header -->
      <div class="ps-header">
        <h2 class="ps-title">
          {{ posSetupContent.headingPart1 }}<br/>
          <span class="ps-title-bold">{{ posSetupContent.headingPart2 }}</span>
        </h2>
      </div>

      <!-- 2-Column Grid -->
      <div class="ps-grid">
        
        <!-- Left: Image -->
        <div class="ps-image-column">
          <div class="ps-image-wrapper">
            <img 
              :src="posSetupContent.image.src" 
              :alt="posSetupContent.image.alt" 
              loading="lazy" 
            />
          </div>
        </div>

        <!-- Right: Features List -->
        <div class="ps-features-column">
          <div 
            class="ps-feature-item" 
            v-for="(feature, idx) in posSetupContent.features" 
            :key="feature.id"
            :style="{ '--feature-idx': idx }"
          >
            <div class="ps-icon-wrapper">
              <i :class="feature.icon"></i>
            </div>
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