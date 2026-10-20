<script setup>
import './CashTaxSection.css'
import { cashTaxContent } from './CashTaxSectionData.js'
</script>

<template>
  <section class="ct-section">
    <div class="ct-container">
      <h2 class="ct-title">{{ cashTaxContent.title }}</h2>
      
      <div class="ct-grid">
        <div class="ct-card" v-for="feature in cashTaxContent.features" :key="feature.id">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>