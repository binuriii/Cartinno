<script setup>
import { ref, onMounted } from 'vue'
import './Statsbar.css'
import { statsbarContent } from './StatsbarData.js'

const statsSection = ref(null)

// Data tika reactive array ekakata danawa, currentValue 0 idan patan ganna
const displayStats = ref(
  statsbarContent.stats.map(stat => ({
    ...stat,
    currentValue: 0 
  }))
)

let hasAnimated = false

const animateCounters = () => {
  if (hasAnimated) return
  hasAnimated = true

  const duration = 2000 // Thappara 2k athulatha animation eka iwara wenawa
  const steps = 60
  const interval = duration / steps

  displayStats.value.forEach((stat) => {
    let currentStep = 0
    const increment = stat.target / steps

    const timer = setInterval(() => {
      currentStep++
      stat.currentValue = Math.ceil(increment * currentStep)
      
      if (currentStep >= steps) {
        stat.currentValue = stat.target // Anthimata hariyatama target eke nawathinawa
        clearInterval(timer)
      }
    }, interval)
  })
}

onMounted(() => {
  // Intersection Observer eken user section eka dakkada kiyala check karanawa
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters()
      observer.disconnect()
    }
  }, { threshold: 0.3 }) // Section eken 30% k penunama animation eka start wenawa

  if (statsSection.value) {
    observer.observe(statsSection.value)
  }
})
</script>

<template>
  <!-- ref="statsSection" kiyana eka animation trigger wenna identify karanna damma -->
  <section class="stats-section" ref="statsSection">
    <div class="stats-container">
      <div class="stats-grid">
        
        <div class="stats-left">
          <h2 class="stats-heading">
            <span class="stats-text-gray">{{ statsbarContent.heading.grayText }}</span>
            <br />
            <span class="stats-text-black">{{ statsbarContent.heading.blackText }}</span>
          </h2>
          
          <div class="stats-numbers-row">
            <div v-for="stat in displayStats" :key="stat.id" class="stat-item">
              <h4 class="stat-value">
                <!-- Symbols saha animate wena number eka ekata join karanawa -->
                {{ stat.prefix }}{{ stat.currentValue }}{{ stat.suffix }}
              </h4>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <div class="stats-right">
          <p class="stats-quote">"{{ statsbarContent.quote }}"</p>
          
          <div class="stats-profile-wrapper">
            <div class="stats-profile-info">
              <img :src="statsbarContent.profile.image" :alt="statsbarContent.profile.name" class="stats-profile-img" />
              <div class="stats-profile-text">
                <h5 class="stats-profile-name">{{ statsbarContent.profile.name }}</h5>
                <p class="stats-profile-role">{{ statsbarContent.profile.role }}</p>
              </div>
            </div>
            <a :href="statsbarContent.link.url" class="stats-link">
              {{ statsbarContent.link.text }} <span class="stats-arrow">›</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>