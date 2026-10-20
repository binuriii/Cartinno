
<script setup>
import {
  resellerFeaturesContent,
  resellerFeatures
} from './ResellerFeaturesData.js'

import './ResellerFeatures.css'
</script>

<template>
  <section class="rnf-section" id="reseller-features">
    <div class="rnf-container">

      <!-- HEADER -->
      <header class="rnf-header">
        <div class="rnf-heading">
          <h2 class="rnf-title">
            {{ resellerFeaturesContent.title }}
          </h2>
        </div>

        <p class="rnf-description">
          {{ resellerFeaturesContent.description }}
        </p>
      </header>

      <!-- CENTERED FEATURE CARDS -->
      <div class="rnf-grid">

        <article
          v-for="(item, index) in resellerFeatures"
          :key="item.id"
          class="rnf-card"
          :class="{
            'rnf-card-offset': index % 2 !== 0
          }"
        >

          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.imageAlt"
            class="rnf-card-image"
            loading="lazy"
          />

          <div
            v-else
            class="rnf-card-placeholder"
            aria-hidden="true"
          >
            <i
              :class="[
                'fa-solid',
                index === 0
                  ? 'fa-people-arrows-left-right'
                  : index === 1
                    ? 'fa-boxes-stacked'
                    : 'fa-chart-line'
              ]"
            ></i>
          </div>

          <div class="rnf-card-overlay"></div>

          <div class="rnf-card-content">
            <span class="rnf-card-number">
              {{ item.number }}
            </span>

            <h3>{{ item.title }}</h3>

            <p>{{ item.description }}</p>
          </div>

        </article>

      </div>

    </div>
  </section>
</template>
