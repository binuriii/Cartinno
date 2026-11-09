<script setup>
import { resellerGuidesData as data } from './ResellerGuidesData.js'
import './ResellerGuides.css'
</script>

<template>
  <section class="reseller-guides-section" aria-labelledby="reseller-guides-title">
    <div class="reseller-guides-inner">
      <header class="reseller-guides-heading">
        <span>{{ data.eyebrow }}</span>
        <h2 id="reseller-guides-title">{{ data.title }}</h2>
      </header>

      <div class="reseller-guides-layout">
        <article class="reseller-guides-feature">
          <img :src="data.featured.image" :alt="data.featured.alt" loading="lazy">
          <div class="reseller-guides-card-copy">
            <h3>{{ data.featured.title }}</h3>
            <p>{{ data.featured.description }}</p>
          </div>
        </article>

        <div class="reseller-guides-side">
          <article v-for="(card, index) in data.cards" :key="card.title" class="reseller-guides-small-card">
            <img :src="card.image" :alt="card.alt" loading="lazy">
            <div class="reseller-guides-card-copy">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>
          </article>

          <a class="reseller-guides-cta" :href="data.ctaLink">
            <span class="reseller-guides-cta-copy">
              <strong>{{ data.ctaTitle }}</strong>
              <small>{{ data.ctaDescription }}</small>
            </span>
            <span class="reseller-guides-cta-arrow" aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
