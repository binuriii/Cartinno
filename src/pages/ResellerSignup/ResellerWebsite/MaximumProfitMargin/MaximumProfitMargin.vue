<script setup>
import { maximumProfitMarginData as data } from './MaximumProfitMarginData.js'
import './MaximumProfitMargin.css'
</script>

<template>
  <section :id="data.id" class="mpm-section" :class="`theme-${data.theme}`">
    <div class="mpm-inner">
      <header class="mpm-heading">
        <span>{{ data.eyebrow }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="mpm-grid">
        <article class="mpm-panel">
          <div class="mpm-panel-copy">
            <span class="mpm-number">01</span>
            <h3>{{ data.benefits?.[0] || data.title }}</h3>
            <p>{{ data.description }}</p>
          </div>
          <div class="mpm-ui">
            <span class="mpm-ui-label">{{ data.eyebrow }}</span>
            <div class="mpm-ui-row">
              <span class="mpm-ui-icon">✓</span>
              <div>
                <b>{{ data.benefits?.[1] }}</b>
                <small>Make it part of your online store</small>
              </div>
            </div>
            <div class="mpm-ui-row">
              <span class="mpm-ui-icon">✓</span>
              <div>
                <b>{{ data.benefits?.[2] }}</b>
                <small>Keep your business moving forward</small>
              </div>
            </div>
          </div>
        </article>

        <article class="mpm-photo">
          <img :src="data.image" :alt="data.title" loading="lazy">
          <div class="mpm-photo-copy">
            <span>{{ data.eyebrow }}</span>
            <h3>{{ data.benefits?.[1] || data.title }}</h3>
            <p>{{ data.lead }}</p>
          </div>
        </article>

        <article class="mpm-panel">
          <div class="mpm-panel-copy">
            <span class="mpm-number">03</span>
            <h3>{{ data.benefits?.[2] || 'More control for your business' }}</h3>
            <p>{{ data.description }}</p>
          </div>
          <div class="mpm-ui">
            <span class="mpm-ui-label">KEY BENEFITS</span>
            <div v-for="(point, index) in data.benefits" :key="point" class="mpm-summary-row">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ point }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
