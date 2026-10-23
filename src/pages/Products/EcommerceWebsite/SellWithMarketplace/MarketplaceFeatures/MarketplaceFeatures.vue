
<script setup>
import { ref, computed } from 'vue'

import {
  marketplaceFeaturesContent,
  marketplaceFeatures
} from './MarketplaceFeaturesData.js'

import './MarketplaceFeatures.css'

const activeIndex = ref(0)
const failedImages = ref(new Set())

const activeFeature = computed(
  () => marketplaceFeatures[activeIndex.value]
)

function setActive(index) {
  activeIndex.value = index
}

function handleImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

function hasImage(feature) {
  return (
    Boolean(feature?.image) &&
    !failedImages.value.has(feature.id)
  )
}
</script>

<template>
  <section
    class="mpf-section"
    id="marketplace-features"
  >
    <div class="mpf-container">

      <!-- SECTION HEADER -->
      <header class="mpf-header">
        <div class="mpf-heading-group">

          <h2 class="mpf-heading">
            {{ marketplaceFeaturesContent.title }}
          </h2>
        </div>

        <p class="mpf-description">
          {{ marketplaceFeaturesContent.description }}
        </p>
      </header>

      <!-- FEATURE PANEL -->
      <div class="mpf-panel">

        <!-- LEFT FEATURE LIST -->
        <div class="mpf-feature-list">
          <button
            v-for="(feature, index) in marketplaceFeatures"
            :key="feature.id"
            type="button"
            class="mpf-feature"
            :class="{
              'mpf-feature-active': activeIndex === index
            }"
            :aria-pressed="activeIndex === index"
            @click="setActive(index)"
          >
            <span class="mpf-feature-number">
              {{ feature.number }}
            </span>

            <span class="mpf-feature-copy">
              <strong class="mpf-feature-title">
                {{ feature.title }}
              </strong>

              <span class="mpf-feature-description">
                {{ feature.shortDescription }}
              </span>
            </span>

            <span class="mpf-feature-arrow" aria-hidden="true">
              <i class="fa-solid fa-arrow-up-right"></i>
            </span>
          </button>
        </div>

        <!-- RIGHT IMAGE PREVIEW -->
        <div class="mpf-preview">
          <Transition name="mpf-image-switch" mode="out-in">
            <div
              :key="activeFeature.id"
              class="mpf-preview-inner"
            >
              <img
                v-if="hasImage(activeFeature)"
                :src="activeFeature.image"
                :alt="activeFeature.imageAlt"
                class="mpf-preview-image"
                @error="handleImageError(activeFeature.id)"
              />

              <div
                v-else
                class="mpf-preview-fallback"
              >
                <i class="fa-solid fa-store"></i>
              </div>

              <div class="mpf-preview-gradient"></div>

              <!-- GLASS STAT CARD -->
              <div class="mpf-preview-stat">
                <span class="mpf-preview-stat-value">
                  {{ activeFeature.highlight }}
                </span>

                <span class="mpf-preview-stat-description">
                  {{ activeFeature.highlightText }}
                </span>
              </div>
            </div>
          </Transition>
        </div>

      </div>

    </div>
  </section>
</template>
