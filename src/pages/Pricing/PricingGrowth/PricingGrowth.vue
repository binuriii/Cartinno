<script setup>
import { RouterLink } from 'vue-router'
import {
  pricingGrowthHeading,
  pricingGrowthCards,
  pricingGrowthBanner,
} from './PricingGrowthData.js'

import './PricingGrowth.css'

const cardComponent = (href) => {
  if (!href) return 'article'

  return typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//')
    ? RouterLink
    : 'a'
}

const linkProps = (href) => {
  if (!href) return {}

  return typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('//')
    ? { to: href }
    : { href }
}
</script>

<template>
  <section class="pgs-section" aria-labelledby="pgs-heading">
    <div class="pgs-container">
      <!-- LAST SECTION HEADING -->
      <header class="pgs-header">
        <h2 id="pgs-heading" class="pgs-heading">
          <span>{{ pricingGrowthHeading.first }}</span>
          <span>{{ pricingGrowthHeading.second }}</span>
        </h2>
      </header>

      <div class="pgs-grid">
        <component
          :is="cardComponent(card.href)"
          v-for="(card, index) in pricingGrowthCards"
          :key="card.id"
          v-bind="linkProps(card.href)"
          class="pgs-card"
          :class="{
            'pgs-card--featured': index === 0,
            'pgs-card--linked': Boolean(card.href),
          }"
        >
          <img
            class="pgs-image"
            :src="card.image"
            :alt="card.alt"
            :style="{ objectPosition: card.imagePosition || 'center' }"
            loading="lazy"
            decoding="async"
          />

          <div class="pgs-overlay" aria-hidden="true"></div>

          <div class="pgs-card-content">
            <div class="pgs-card-copy">
              <h3 class="pgs-card-title">{{ card.title }}</h3>
              <p v-if="card.description" class="pgs-card-description">
                {{ card.description }}
              </p>
            </div>

            <span
              v-if="card.href"
              class="pgs-card-arrow"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </component>

        <RouterLink
          :to="pricingGrowthBanner.href"
          class="pgs-banner"
        >
          <div class="pgs-banner-copy">
            <h3>{{ pricingGrowthBanner.title }}</h3>
            <p>{{ pricingGrowthBanner.description }}</p>
          </div>

          <span class="pgs-banner-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="m9 5 7 7-7 7"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
