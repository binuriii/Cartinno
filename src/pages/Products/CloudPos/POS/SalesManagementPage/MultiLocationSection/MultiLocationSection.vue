<script setup>
import './MultiLocationSection.css'
import { multiLocationContent } from './MultiLocationSectionData.js'
</script>

<template>
  <section class="ml-section">
    <div class="ml-container">
      <div class="ml-grid">
        <!-- Left Image -->
        <div class="ml-visual">
          <img :src="multiLocationContent.image.src" :alt="multiLocationContent.image.alt" loading="lazy" />
        </div>
        
        <!-- Right Text Content -->
        <div class="ml-content">
          <h2 class="ml-title">{{ multiLocationContent.title }}</h2>
          <p class="ml-description">{{ multiLocationContent.description }}</p>
          
          <ul class="ml-features">
            <li v-for="feature in multiLocationContent.features" :key="feature.id">
              <i class="fa-solid fa-check ml-check"></i>
              {{ feature.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>