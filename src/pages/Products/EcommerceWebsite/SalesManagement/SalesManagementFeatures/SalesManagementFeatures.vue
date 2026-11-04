
<script setup>
import {
  salesFeaturesContent,
  salesFeatures
} from './SalesManagementFeaturesData.js'

import './SalesManagementFeatures.css'
</script>

<template>
  <section
    class="sm-features"
    aria-labelledby="sm-features-heading"
  >
    <div class="sm-features-container">

      <!-- SECTION HEADING -->
      <header class="sm-features-header">
        <h2
          id="sm-features-heading"
          class="sm-features-heading"
        >
          <span>{{ salesFeaturesContent.title }}</span>
          <span>{{ salesFeaturesContent.secondLine }}</span>
        </h2>

        <p class="sm-features-intro">
          {{ salesFeaturesContent.description }}
        </p>
      </header>

      <!-- FEATURE CARDS -->
      <div class="sm-features-grid">
        <article
          v-for="item in salesFeatures"
          :key="item.id"
          class="sm-feature-card"
          :aria-labelledby="`sm-feature-${item.id}`"
        >
          <img
            :src="item.image"
            :alt="item.imageAlt"
            :style="{
              objectPosition: item.imagePosition || 'center'
            }"
            class="sm-feature-image"
            loading="lazy"
            decoding="async"
          />

          <div
            class="sm-feature-shade"
            aria-hidden="true"
          ></div>

          <div class="sm-feature-content">
            <span class="sm-feature-category">
              {{ item.category }}
            </span>

            <h3
              :id="`sm-feature-${item.id}`"
              class="sm-feature-title"
            >
              {{ item.title }}
            </h3>

            <p class="sm-feature-description">
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>
