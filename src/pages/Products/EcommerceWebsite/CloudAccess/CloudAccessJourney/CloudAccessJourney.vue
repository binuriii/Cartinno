<script setup>
import { cloudAccessJourneyContent, cloudAccessJourneyFeatures } from './CloudAccessJourneyData.js'
import './CloudAccessJourney.css'
</script>

<template>
  <section id="cloud-access-journey" class="caj-section" aria-labelledby="caj-heading">
    <div class="lm-container caj-layout">
      <div class="caj-photo" data-cloud-reveal>
        <img class="caj-photo-image" :src="cloudAccessJourneyContent.image" :alt="cloudAccessJourneyContent.imageAlt" loading="lazy" decoding="async" />
      </div>

      <div class="caj-content" data-cloud-reveal>
        <h2 id="caj-heading">{{ cloudAccessJourneyContent.title1 }}<br />{{ cloudAccessJourneyContent.title2 }}</h2>
        <p class="caj-description">{{ cloudAccessJourneyContent.description }}</p>

        <div class="caj-features">
          <article v-for="feature in cloudAccessJourneyFeatures" :key="feature.id" class="caj-feature">
            <span class="caj-number">{{ feature.number }}</span>
            <div class="caj-feature-copy">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
