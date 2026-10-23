<script setup>
import {
  seoFeaturesContent,
  seoFeatures
} from './SEOFeaturesData.js'

import './SEOFeatures.css'
</script>

<template>
  <section
    class="seo-features"
    aria-labelledby="seo-features-heading"
  >
    <div class="seo-features-container">
      <!-- SECTION HEADING -->
      <header class="seo-features-header">
        <h2
          id="seo-features-heading"
          class="seo-features-heading"
        >
          <span>{{ seoFeaturesContent.title }}</span>
          <span>{{ seoFeaturesContent.secondLine }}</span>
        </h2>

        <p class="seo-features-intro">
          {{ seoFeaturesContent.description }}
        </p>
      </header>

      <!-- FEATURE CARDS -->
      <div class="seo-features-grid">
        <article
          v-for="item in seoFeatures"
          :key="item.id"
          class="seo-feature-card"
          :aria-labelledby="`seo-feature-${item.id}`"
        >
          <img
            :src="item.image"
            :alt="item.imageAlt"
            :style="{
              objectPosition: item.imagePosition || 'center'
            }"
            class="seo-feature-image"
            loading="lazy"
            decoding="async"
          />

          <div
            class="seo-feature-shade"
            aria-hidden="true"
          ></div>

          <div class="seo-feature-content">
            <span class="seo-feature-category">
              {{ item.category }}
            </span>

            <h3
              :id="`seo-feature-${item.id}`"
              class="seo-feature-title"
            >
              {{ item.title }}
            </h3>

            <p class="seo-feature-description">
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>