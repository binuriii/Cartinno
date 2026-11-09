<script setup>
import { yourOwnMarketplaceData as data } from './YourOwnMarketplaceData.js'
import './YourOwnMarketplace.css'
const supportingPoints = data.benefits?.slice(0, 2) || []
</script>

<template>
  <section :id="data.id" class="reseller-feature-section reseller-style-a" :class="`theme-${data.theme}`">
    <div class="reseller-a-inner">
      <header class="reseller-a-heading">
        <span>{{ data.eyebrow }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="reseller-a-grid">
        <article class="reseller-a-panel">
          <div class="reseller-a-panel-copy">
            <span class="reseller-a-number">01</span>
            <h3>{{ data.benefits?.[0] || data.title }}</h3>
            <p>{{ data.description }}</p>
          </div>
          <div class="reseller-a-ui">
            <strong>{{ data.eyebrow }}</strong>
            <div class="reseller-a-ui-row">
              <span class="reseller-a-ui-icon">✓</span>
              <div><b>{{ data.benefits?.[1] || 'Build your reseller business' }}</b><small>Make it part of your online store</small></div>
            </div>
            <div class="reseller-a-ui-row">
              <span class="reseller-a-ui-icon">✓</span>
              <div><b>{{ data.benefits?.[2] || 'Manage your store' }}</b><small>Keep your business moving forward</small></div>
            </div>
          </div>
        </article>

        <article class="reseller-a-photo">
          <img :src="data.image" :alt="data.title" loading="lazy">
          <div class="reseller-a-photo-copy">
            <span>{{ data.eyebrow }}</span>
            <h3>{{ data.benefits?.[1] || data.title }}</h3>
            <p>{{ data.lead }}</p>
          </div>
        </article>

        <article class="reseller-a-panel reseller-a-panel-right">
          <div class="reseller-a-panel-copy">
            <span class="reseller-a-number">03</span>
            <h3>{{ data.benefits?.[2] || 'More control for your business' }}</h3>
            <p>{{ data.lead }}</p>
          </div>
          <div class="reseller-a-ui reseller-a-summary">
            <strong>KEY BENEFITS</strong>
            <div v-for="(point, index) in data.benefits" :key="point" class="reseller-a-summary-row">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ point }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
