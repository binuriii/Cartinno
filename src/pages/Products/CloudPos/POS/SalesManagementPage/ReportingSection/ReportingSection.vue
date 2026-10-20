<script setup>
import { ref } from 'vue'
import './ReportingSection.css'
import { reportingContent } from './ReportingSectionData.js'

// Chart kosam bars data (heights mariyu colors)
const chartBars = ref([
  { id: 1, height: '30%', type: 'light' },
  { id: 2, height: '20%', type: 'blue' },
  { id: 3, height: '45%', type: 'light' },
  { id: 4, height: '60%', type: 'blue' },
  { id: 5, height: '40%', type: 'light' },
  { id: 6, height: '55%', type: 'blue' },
  { id: 7, height: '35%', type: 'light' },
  { id: 8, height: '45%', type: 'blue' },
  { id: 9, height: '65%', type: 'light' },
  { id: 10, height: '80%', type: 'blue' },
  { id: 11, height: '45%', type: 'light' },
  { id: 12, height: '40%', type: 'blue' },
  { id: 13, height: '50%', type: 'light' },
  { id: 14, height: '55%', type: 'blue' },
  { id: 15, height: '75%', type: 'light' },
  { id: 16, height: '90%', type: 'blue' },
  { id: 17, height: '45%', type: 'blue' },
  { id: 18, height: '35%', type: 'light' },
  { id: 19, height: '50%', type: 'blue' },
  { id: 20, height: '40%', type: 'light' },
  { id: 21, height: '30%', type: 'blue' },
  { id: 22, height: '25%', type: 'light' },
  { id: 23, height: '25%', type: 'light' },
  { id: 24, height: '15%', type: 'light' }
])
</script>

<template>
  <section class="rs-section">
    <div class="rs-container">
      
      <!-- Section Heading -->
      <div class="rs-header">
        <h2 class="rs-title">
          {{ reportingContent.headingPart1 }}<br/>
          {{ reportingContent.headingPart2 }}
        </h2>
      </div>

      <!-- Bento Grid -->
      <div class="rs-grid">
        
       <!-- Top Large Card -->
        <div class="rs-card rs-card-top">
          <div class="rs-card-visual rs-top-visual">
            
            <!-- TRANSLUCENT WRAPPER ADDED HERE -->
            <div class="rs-chart-widget-wrapper">
              
              <!-- LIVE CHART WIDGET START -->
              <div class="rs-chart-widget">
                <!-- Overall Sales -->
                <div class="rs-cw-header">
                  <div class="rs-cw-title">
                    <i class="fa-solid fa-chart-pie"></i>
                    <span>Overall sales</span>
                  </div>
                  <div class="rs-cw-metrics">
                    <span class="rs-cw-value">$1,234</span>
                    <span class="rs-cw-badge"><i class="fa-solid fa-arrow-up"></i> 11%</span>
                  </div>
                </div>

                <!-- Bar Chart -->
                <div class="rs-cw-chart-container">
                  <div class="rs-cw-bars">
                    <div 
                      v-for="bar in chartBars" 
                      :key="bar.id" 
                      class="rs-cw-bar" 
                      :class="bar.type === 'blue' ? 'rs-cw-bar-blue' : 'rs-cw-bar-light'"
                      :style="{ height: bar.height }"
                    ></div>
                  </div>
                  <div class="rs-cw-x-axis">
                    <span>9AM</span>
                    <span>9PM</span>
                  </div>
                </div>

                <div class="rs-cw-divider"></div>

                <!-- Total Orders -->
                <div class="rs-cw-footer">
                  <div class="rs-cw-footer-top">
                    <div class="rs-cw-title">
                      <i class="fa-solid fa-bell-concierge"></i>
                      <span>Total orders</span>
                    </div>
                    <i class="fa-solid fa-chevron-right rs-cw-chevron"></i>
                  </div>
                  <div class="rs-cw-metrics">
                    <span class="rs-cw-value">67</span>
                    <span class="rs-cw-badge"><i class="fa-solid fa-arrow-up"></i> 8%</span>
                  </div>
                </div>
              </div>
              <!-- LIVE CHART WIDGET END -->

            </div>
          </div>
          
          <div class="rs-card-content rs-top-content">
            <span class="rs-label">{{ reportingContent.cards.top.label }}</span>
            <h3>{{ reportingContent.cards.top.title }}</h3>
          </div>
        </div>

        <!-- Bottom Left Card (Green) -->
        <div class="rs-card rs-card-green">
          <div class="rs-card-content">
            <span class="rs-label">{{ reportingContent.cards.bottomLeft.label }}</span>
            <h3>{{ reportingContent.cards.bottomLeft.title }}</h3>
          </div>
          <div class="rs-card-visual rs-bottom-visual">
            <img :src="reportingContent.cards.bottomLeft.image.src" :alt="reportingContent.cards.bottomLeft.image.alt" loading="lazy" />
          </div>
        </div>

        <!-- Bottom Right Card (Dark Blue) -->
        <div class="rs-card rs-card-blue">
          <div class="rs-card-content">
            <span class="rs-label">{{ reportingContent.cards.bottomRight.label }}</span>
            <h3>{{ reportingContent.cards.bottomRight.title }}</h3>
          </div>
          <div class="rs-card-visual rs-bottom-visual">
            <img :src="reportingContent.cards.bottomRight.image.src" :alt="reportingContent.cards.bottomRight.image.alt" loading="lazy" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>