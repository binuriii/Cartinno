<script setup>
import { yourOwnMarketplaceData as data } from './YourOwnMarketplaceData.js'
import './YourOwnMarketplace.css'
</script>

<template>
  <section :id="data.id" class="ymp-section" :class="`theme-${data.theme}`">
    <div class="ymp-inner">
      <header class="ymp-heading">
        <span>{{ data.eyebrow }}</span>
        <h2>
          {{ data.title1 }}<br />
          {{ data.title2 }}
        </h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="ymp-grid">
        <article class="ymp-panel">
          <div class="ymp-panel-copy">
            <span class="ymp-number">01</span>
            <h3>{{ data.benefits?.[0] || 'Your Online Store' }}</h3>
            <p>{{ data.description }}</p>
          </div>
          <div class="ymp-ui">
            <span class="ymp-ui-label">{{ data.eyebrow }}</span>
            <div class="ymp-ui-row">
              <span class="ymp-ui-icon">✓</span>
              <div>
                <b>{{ data.benefits?.[1] }}</b>
                <small>Make it part of your own business</small>
              </div>
            </div>
            <div class="ymp-ui-row">
              <span class="ymp-ui-icon">✓</span>
              <div>
                <b>{{ data.benefits?.[2] }}</b>
                <small>Keep your business moving forward</small>
              </div>
            </div>
          </div>
        </article>

        <article class="ymp-photo">
          <img :src="data.image" :alt="data.title1 + ' ' + data.title2" loading="lazy">
          <div class="ymp-photo-copy">
            <span>{{ data.eyebrow }}</span>
            <h3>{{ data.benefits?.[1] || 'Your Own Online Store' }}</h3>
            <p>{{ data.lead }}</p>
          </div>
        </article>

        <article class="ymp-panel">
          <div class="ymp-panel-copy">
            <span class="ymp-number">03</span>
            <h3>{{ data.benefits?.[2] || 'More Control for Your Business' }}</h3>
            <p>{{ data.description }}</p>
          </div>
          <div class="ymp-ui">
            <span class="ymp-ui-label">KEY BENEFITS</span>
            <div v-for="(point, index) in data.benefits" :key="point" class="ymp-summary-row">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ point }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
