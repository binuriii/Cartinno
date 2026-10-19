<script setup>
import './FeaturesSection.css'
import { featuresContent, featuresList } from './FeaturesSectionData.js'
</script>

<template>
  <section class="fs-section">
    <div class="fs-container">
      
      <!-- HEADER -->
      <h2 class="fs-main-title">{{ featuresContent.title }}</h2>

      <!-- FEATURES LIST -->
      <div class="fs-list-container">
        <!-- Dashed vertical line -->
        <div class="fs-dashed-line"></div>
        
        <div 
          v-for="item in featuresList" 
          :key="item.id" 
          class="fs-row"
        >
          <div class="fs-text-column">
            <h3 class="fs-title">
              <span class="fs-number">{{ item.id }}.</span> 
              {{ item.title }}
            </h3>
            <p class="fs-description">{{ item.description }}</p>
          </div>
          
          <div class="fs-image-column">
            <div class="fs-image-wrapper">
              <img :src="item.image" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>