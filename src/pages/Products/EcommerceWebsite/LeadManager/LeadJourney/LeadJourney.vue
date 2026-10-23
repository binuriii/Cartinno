<script setup>
import { leadJourneyContent, leadJourneyFeatures } from './LeadJourneyData.js'
import './LeadJourney.css'
</script>

<template>
  <section id="lead-journey" class="lmj-section" aria-labelledby="lmj-heading">
    <div class="lm-container lmj-layout">
      <!-- Clean photo only: no floating cards, labels, captions, or overlay UI. -->
      <div class="lmj-photo" data-lead-reveal>
        <img
          class="lmj-photo-image"
          :src="leadJourneyContent.image"
          :alt="leadJourneyContent.imageAlt"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="lmj-content" data-lead-reveal>
        <h2 id="lmj-heading">
          {{ leadJourneyContent.title1 }}<br />
          {{ leadJourneyContent.title2 }}
        </h2>

        <p class="lmj-description">{{ leadJourneyContent.description }}</p>

        <div class="lmj-features">
          <article
            v-for="feature in leadJourneyFeatures"
            :key="feature.id"
            class="lmj-feature"
          >
            <span class="lmj-number">{{ feature.number }}</span>
            <div class="lmj-feature-copy">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
