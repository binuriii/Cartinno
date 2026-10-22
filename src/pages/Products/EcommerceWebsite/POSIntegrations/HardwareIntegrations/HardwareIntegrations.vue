<script setup>
import { content } from './HardwareIntegrationsData.js'
import './HardwareIntegrations.css'
</script>

<template>
  <section
    class="pi-section hi-section"
    aria-labelledby="hardware-heading"
  >
    <div class="pi-container">
      <header class="hi-heading">
        <h2 id="hardware-heading">
          {{ content.title1 }}<br />
          {{ content.title2 }}
        </h2>

        <p>{{ content.description }}</p>
      </header>

      <div class="hi-image">
        <img
          :src="content.image"
          :alt="content.imageAlt"
          :style="{ objectPosition: content.imagePosition }"
          loading="lazy"
          width="1536"
          height="1024"
        />

        <div class="hi-badge">
          <span class="hi-dot" aria-hidden="true"></span>
          {{ content.badge }}
        </div>
      </div>

      <div class="hi-grid">
        <article
          v-for="feature in content.features"
          :key="feature.id"
          class="hi-card"
        >
          <span class="hi-number">{{ feature.number }}</span>

          <h3>{{ feature.title }}</h3>

          <p>{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>