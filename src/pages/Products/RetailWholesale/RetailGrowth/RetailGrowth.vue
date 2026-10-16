
<script setup>
import './RetailGrowth.css'

import {
  retailGrowthContent,
  retailGrowthCards
} from './RetailGrowthData.js'
</script>

<template>
  <section class="rg-section" id="retail-growth">
    <div class="rg-container">

      <!-- SECTION HEADER -->
      <header class="rg-header">

        <h2 class="rg-heading">
          {{ retailGrowthContent.title1 }}
            <br/>
            {{ retailGrowthContent.title2 }}
        </h2>

        <p class="rg-intro">
          {{ retailGrowthContent.description }}
        </p>

      </header>

      <!-- THREE FEATURE CARDS -->
      <div class="rg-grid">

        <article
          v-for="card in retailGrowthCards"
          :key="card.id"
          class="rg-card"
          :class="`rg-card-${card.theme}`"
        >

          <!-- IMAGE AREA -->
          <div class="rg-card-media">
            <img
              :src="card.image"
              :alt="card.imageAlt"
              loading="lazy"
            />

          </div>

          <!-- TEXT CONTENT -->
          <div class="rg-card-content">

            <h3 class="rg-card-title">
              {{ card.title }}
            </h3>

            <p class="rg-card-description">
              {{ card.description }}
            </p>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
