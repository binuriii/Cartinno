<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './PosIntegrationGrid.css'
import { posGridContent } from './PosIntegrationGridData.js'

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
  <section ref="sectionRef" class="pig-section" :class="{ 'is-visible': isVisible }">
    <div class="pig-wrapper">
      
      <!-- Section Heading -->
      <div class="pig-header">
        <h2 class="pig-title">{{ posGridContent.heading }}</h2>
      </div>

      <!-- Bento Grid -->
      <div class="pig-grid">
        
        <!-- Top Large Card (Full Width) -->
        <div class="pig-card pig-card-top">
          <div class="pig-top-visual">
            <img 
              :src="posGridContent.cards.top.image.src" 
              :alt="posGridContent.cards.top.image.alt" 
              loading="lazy" 
            />
          </div>
          <div class="pig-top-content">
            <span class="pig-label">{{ posGridContent.cards.top.label }}</span>
            <h3>{{ posGridContent.cards.top.title }}</h3>
          </div>
        </div>

        <!-- Bottom Left Card (Dark Image Background) -->
        <div class="pig-card pig-card-bottom-left">
          <div class="pig-bg-image" :style="{ backgroundImage: `url(${posGridContent.cards.bottomLeft.image.src})` }"></div>
          <div class="pig-overlay"></div>
          
          <div class="pig-bl-content">
            <span class="pig-label pig-label-light">{{ posGridContent.cards.bottomLeft.label }}</span>
            <h3>{{ posGridContent.cards.bottomLeft.title }}</h3>
          </div>
        </div>

        <!-- Bottom Right Card (White Background) -->
        <div class="pig-card pig-card-bottom-right">
          <div class="pig-br-content">
            <span class="pig-label">{{ posGridContent.cards.bottomRight.label }}</span>
            <h3>{{ posGridContent.cards.bottomRight.title }}</h3>
          </div>
          <div class="pig-br-visual">
            <img 
              :src="posGridContent.cards.bottomRight.image.src" 
              :alt="posGridContent.cards.bottomRight.image.alt" 
              loading="lazy" 
            />
          </div>
        </div>

      </div>
      
    </div>
  </section>
</template>