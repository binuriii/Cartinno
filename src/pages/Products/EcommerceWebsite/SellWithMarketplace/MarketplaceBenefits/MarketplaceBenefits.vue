<script setup>
import { RouterLink } from 'vue-router'
import './MarketplaceBenefits.css'

import {
  marketplaceBenefitsContent,
  marketplaceBenefitsItems
} from './MarketplaceBenefitsData.js'

const featuredCard = marketplaceBenefitsItems.find(
  item => item.id === 1
)

const sideImageCard = marketplaceBenefitsItems.find(
  item => item.id === 2
)

const textCards = marketplaceBenefitsItems.filter(
  item => item.id === 3 || item.id === 4
)

const isInternalLink = (link) =>
  typeof link === 'string' &&
  link.startsWith('/') &&
  !link.startsWith('//')
</script>

<template>
  <section class="mbn-section" id="marketplace-benefits">
    <div class="mbn-container">

      <div class="mbn-layout">

        <div class="mbn-header-left">
          <h2 class="mbn-title">
            {{ marketplaceBenefitsContent.title }}
          </h2>
        </div>

        <article
          v-if="featuredCard"
          class="mbn-card mbn-card-featured"
        >
          <img
            :src="featuredCard.image"
            :alt="featuredCard.imageAlt"
            class="mbn-card-image"
            loading="lazy"
          />

          <div class="mbn-card-overlay"></div>

          <div class="mbn-card-content mbn-card-content-light">
            <span class="mbn-card-label">
              {{ featuredCard.label }}
            </span>

            <h3 class="mbn-card-title">
              {{ featuredCard.title }}
            </h3>

            <p class="mbn-card-text">
              {{ featuredCard.description }}
            </p>

          </div>
        </article>

        <article
          v-if="sideImageCard"
          class="mbn-card mbn-card-side-image"
        >
          <img
            :src="sideImageCard.image"
            :alt="sideImageCard.imageAlt"
            class="mbn-card-image"
            loading="lazy"
          />
        </article>

        <div class="mbn-bottom-right">
          <div class="mbn-info-list">
            <article
              v-for="item in textCards"
              :key="item.id"
              class="mbn-info-item"
            >
              <span class="mbn-info-label">
                {{ item.label }}
              </span>

              <h3 class="mbn-info-title">
                {{ item.title }}
              </h3>

              <p class="mbn-info-text">
                {{ item.description }}
              </p>
            </article>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>