<script setup>
import { zappymartVendorsData as data } from './ZappymartVendorsData.js'
import './ZappymartVendors.css'
</script>

<template>
  <section :id="data.id" class="zmv-section" :class="`theme-${data.theme}`">
    <div class="zmv-inner">
      <header class="zmv-heading">
        <span>{{ data.eyebrow }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="zmv-grid">
        <article class="zmv-panel">
          <div class="zmv-panel-copy">
            <span class="zmv-number">01</span>
            <h3>{{ data.benefits?.[0] || data.title }}</h3>
            <p>{{ data.description }}</p>
          </div>
          <div class="zmv-ui">
            <span class="zmv-ui-label">{{ data.eyebrow }}</span>
            <div class="zmv-ui-row">
              <span class="zmv-ui-icon">✓</span>
              <div>
                <b>{{ data.benefits?.[1] }}</b>
                <small>Make it part of your online store</small>
              </div>
            </div>
            <div class="zmv-ui-row">
              <span class="zmv-ui-icon">✓</span>
              <div>
                <b>{{ data.benefits?.[2] }}</b>
                <small>Keep your business moving forward</small>
              </div>
            </div>
          </div>
        </article>

        <article class="zmv-photo">
          <img :src="data.image" :alt="data.title" loading="lazy">
          <div class="zmv-photo-copy">
            <span>{{ data.eyebrow }}</span>
            <h3>{{ data.benefits?.[1] || data.title }}</h3>
            <p>{{ data.lead }}</p>
          </div>
        </article>

        <article class="zmv-panel">
          <div class="zmv-panel-copy">
            <span class="zmv-number">03</span>
            <h3>{{ data.benefits?.[2] || 'More control for your business' }}</h3>
            <p>{{ data.description }}</p>
          </div>
          <div class="zmv-ui">
            <span class="zmv-ui-label">KEY BENEFITS</span>
            <div v-for="(point, index) in data.benefits" :key="point" class="zmv-summary-row">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ point }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
