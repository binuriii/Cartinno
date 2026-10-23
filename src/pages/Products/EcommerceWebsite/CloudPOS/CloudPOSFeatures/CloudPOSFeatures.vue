
<script setup>
import { ref } from 'vue'

import {
  cloudPOSFeaturesContent,
  cloudPOSFeatures
} from './CloudPOSFeaturesData.js'

import './CloudPOSFeatures.css'

const failedImages = ref(new Set())

function imageFailed(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

function hasImage(feature) {
  return Boolean(feature?.image) &&
    !failedImages.value.has(feature.id)
}
</script>

<template>
  <section class="cpf-section" id="cloud-pos-features">
    <div class="cpf-container">

      <!-- LEFT ALIGNED HEADING AND PARAGRAPH -->
      <header class="cpf-header">
        <h2 class="cpf-heading">
          {{ cloudPOSFeaturesContent.title1 }} <br/>
          {{ cloudPOSFeaturesContent.title2 }}
        </h2>

        <p class="cpf-intro">
          {{ cloudPOSFeaturesContent.description }}
        </p>
      </header>

      <!-- THREE FEATURE PANELS -->
      <div class="cpf-grid">

        <article
          v-for="(feature, index) in cloudPOSFeatures"
          :key="feature.id"
          class="cpf-card"
          :class="`cpf-card-${feature.id}`"
        >

          <!-- FEATURE ONE: SPLIT CARD -->
          <template v-if="index === 0">

            <div class="cpf-split-content">
              <div class="cpf-card-meta">
                <span class="cpf-card-number">
                  {{ feature.number }}
                </span>

                <span class="cpf-card-label">
                  {{ feature.label }}
                </span>
              </div>

              <div class="cpf-split-copy">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>

            <div class="cpf-split-media">
              <img
                v-if="hasImage(feature)"
                :src="feature.image"
                :alt="feature.imageAlt"
                loading="lazy"
                @error="imageFailed(feature.id)"
              />

              <div
                v-else
                class="cpf-media-fallback"
                aria-hidden="true"
              >
                <i class="fa-solid fa-cash-register"></i>
              </div>
            </div>

          </template>

          <!-- FEATURE TWO AND THREE: DARK CARDS -->
          <template v-else>

            <img
              v-if="hasImage(feature)"
              :src="feature.image"
              :alt="feature.imageAlt"
              class="cpf-dark-image"
              loading="lazy"
              @error="imageFailed(feature.id)"
            />

            <div class="cpf-dark-overlay"></div>

            <div class="cpf-dark-inner">
              <div class="cpf-card-meta">
                <span class="cpf-card-number">
                  {{ feature.number }}
                </span>

                <span class="cpf-card-label">
                  {{ feature.label }}
                </span>
              </div>

              <div class="cpf-dark-copy">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>

          </template>

        </article>

      </div>

    </div>
  </section>
</template>
