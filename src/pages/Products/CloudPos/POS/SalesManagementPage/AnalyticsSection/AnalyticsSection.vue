<template>
  <section class="as-section">
    <div class="as-container">
      
      <!-- Centered Header -->
      <div class="as-header">
        <h2 class="as-main-title">
          {{ analyticsContent.titlePart1 }}<br/>
          {{ analyticsContent.titlePart2 }}
        </h2>
      </div>

      <!-- 2-Column Layout -->
      <div class="as-content-grid">
        
        <!-- Left Column: Animated Dashboard (Replaced Image) -->
        <div class="as-image-column">
          <section class="restaurant-analytics">
            <!-- Background image -->
            <div class="analytics-background"></div>
            <div class="background-shade"></div>

            <!-- Analytics dashboard -->
            <div
              ref="dashboard"
              class="analytics-card"
              :class="{ 'is-visible': isVisible }"
            >
              <div class="analytics-header">
                <h2>Restaurant Analytics</h2>
                <span class="period-label">Last week</span>
              </div>

              <div class="analytics-grid">
                <article
                  v-for="(item, index) in metrics"
                  :key="item.label"
                  class="metric-card"
                  :style="{ '--delay': `${index * 100}ms` }"
                >
                  <div class="metric-value">
                    <span v-if="item.prefix">{{ item.prefix }}</span>
                    <span>{{ formatNumber(item.current, item) }}</span>
                  </div>

                  <p class="metric-label">{{ item.label }}</p>
                </article>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column: Features List -->
        <div class="as-features-column">
          <div class="as-feature-item" v-for="feature in analyticsContent.features" :key="feature.id">
            <div class="as-feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <div class="as-feature-text">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import './AnalyticsSection.css'
import { analyticsContent } from './AnalyticsSectionData.js'

// Dashboard Animation Logic
const dashboard = ref(null)
const isVisible = ref(false)

let observer = null
let animationFrame = null

const metrics = ref([
  { label: 'Sales', target: 3412, current: 0, prefix: '$', decimals: 0 },
  { label: 'Orders', target: 85, current: 0, decimals: 0 },
  { label: 'Top Google Rankings', target: 5, current: 0, decimals: 0 },
  { label: 'New Rewards Members', target: 98, current: 0, decimals: 0 },
  { label: 'New Google Reviews', target: 10, current: 0, decimals: 0 },
  { label: 'Job Applications', target: 6, current: 0, decimals: 0 }
])

function formatNumber(value, item) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: item.decimals,
    maximumFractionDigits: item.decimals
  }).format(value)
}

function animateCounters() {
  cancelAnimationFrame(animationFrame)

  const duration = 1800
  const startTime = performance.now()

  metrics.value.forEach(item => {
    item.current = 0
  })

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 4)

    metrics.value.forEach(item => {
      item.current = Math.round(item.target * eased)
    })

    if (progress < 1) {
      animationFrame = requestAnimationFrame(update)
    } else {
      metrics.value.forEach(item => {
        item.current = item.target
      })
    }
  }

  animationFrame = requestAnimationFrame(update)
}

function revealDashboard() {
  if (isVisible.value) return
  isVisible.value = true
  animateCounters()
}

onMounted(async () => {
  await nextTick()

  if (!dashboard.value) return

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          revealDashboard()
          observer?.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(dashboard.value)
  } else {
    revealDashboard()
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(animationFrame)
})
</script>