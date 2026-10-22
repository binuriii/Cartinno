<script setup>
import { content } from './IntegrationAutomationData.js'
import './IntegrationAutomation.css'

// Preserve readable cards if an external image is unavailable.
function hideFailedImage(event) {
  event.currentTarget.hidden = true
}
</script>

<template>
  <section class="ia-section" aria-labelledby="ia-heading">
    <div class="ia-container">
      <header class="ia-heading">
        <h2 id="ia-heading">
          {{ content.title1 }}<br />
          {{ content.title2 }}
        </h2>
        <p>{{ content.description }}</p>
      </header>

      <div class="ia-bento">
        <article
          v-for="feature in content.features"
          :key="feature.id"
          class="ia-story-card"
          :class="{ 'ia-story-card-featured': feature.featured }"
        >
          <img
            class="ia-card-image"
            :src="feature.image"
            :alt="feature.imageAlt"
            :style="{ objectPosition: feature.imagePosition }"
            loading="lazy"
            decoding="async"
            width="1000"
            height="1000"
            @error="hideFailedImage"
          />
          <div class="ia-card-shade" aria-hidden="true"></div>

          <div class="ia-card-copy">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </article>

        <a
          class="ia-contact-banner"
          :href="content.cta.link"
          :aria-label="content.cta.accessibleLabel"
        >
          <div class="ia-contact-copy">
            <h3>{{ content.cta.title }}</h3>
            <p>{{ content.cta.description }}</p>
          </div>
          <span class="ia-contact-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>

      <p class="ia-compatibility-note">{{ content.note }}</p>
    </div>
  </section>
</template>
