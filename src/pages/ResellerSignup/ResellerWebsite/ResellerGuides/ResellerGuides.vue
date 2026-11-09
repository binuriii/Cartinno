<script setup>
import { resellerGuidesData as data } from './ResellerGuidesData.js'
import './ResellerGuides.css'
</script>

<template>
  <section class="rwg-section" aria-labelledby="rwg-title">
    <div class="rwg-inner">
      <header class="rwg-heading">
        <span>{{ data.eyebrow }}</span>
        <h2 id="rwg-title">{{ data.title }}</h2>
      </header>

      <div class="rwg-grid">
        <article class="rwg-card rwg-card-featured">
          <img :src="data.featured.image" :alt="data.featured.alt" loading="lazy">
          <div class="rwg-card-copy">
            <h3>{{ data.featured.title }}</h3>
            <p>{{ data.featured.description }}</p>
          </div>
        </article>

        <div class="rwg-side">
          <article v-for="card in data.cards" :key="card.title" class="rwg-card rwg-card-small">
            <img :src="card.image" :alt="card.alt" loading="lazy">
            <div class="rwg-card-copy">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>
          </article>

          <a class="rwg-cta" :href="data.ctaLink">
            <span class="rwg-cta-copy">
              <strong>{{ data.ctaTitle }}</strong>
              <small>{{ data.ctaDescription }}</small>
            </span>
            <span class="rwg-cta-arrow" aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
