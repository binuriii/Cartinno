<script setup>
import { ref } from 'vue'
import { useRegistryMotion } from '../useRegistryMotion.js'
import { registryJourneyContent, registryJourneySteps } from './GiftRegistryJourney.js'

const sectionRef = ref(null)
useRegistryMotion(sectionRef)
</script>

<template>
    <!-- SECTION 04: animated UI, without a cropped photo fragment -->
    <section ref="sectionRef" class="gr-section gr-journey" aria-labelledby="gr-journey-title">
      <div class="gr-shell">
        <header class="gr-heading gr-heading--center" data-gr-reveal>
          <h2 id="gr-journey-title">{{ registryJourneyContent.headingFirst }}<span>{{ registryJourneyContent.headingSecond }}</span></h2>
          <p>{{ registryJourneyContent.description }}</p>
        </header>

        <div class="gr-journey-panel" data-gr-reveal>
          <div class="gr-journey-copy">
            <span class="gr-kicker">MADE FOR MEANINGFUL MOMENTS</span>
            <h3>{{ registryJourneyContent.previewTitle }}</h3>
            <p>{{ registryJourneyContent.previewDescription }}</p>
            <ol class="gr-journey-steps">
              <li v-for="step in registryJourneySteps" :key="step.number">
                <span class="gr-step-number" aria-hidden="true">{{ step.number }}</span>
                <div><h4>{{ step.title }}</h4><p>{{ step.description }}</p></div>
              </li>
            </ol>
          </div>

          <div class="gr-registry-stage" aria-hidden="true" data-gr-motion>
            <div class="gr-registry-demo">
              <div class="gr-registry-top"><span>cartinno</span><small>GIFT REGISTRY</small></div>
              <div class="gr-registry-intro"><small>A CELEBRATION OF US</small><strong>Our new beginning.</strong><span>A few things we would love.</span></div>
              <div class="gr-registry-products">
                <div class="gr-registry-product"><div class="gr-product-art"><span class="gr-cup"></span><span class="gr-saved">♡</span></div><b>Slow morning coffee set</b><small>A little everyday happiness</small></div>
                <div class="gr-registry-product"><div class="gr-product-art gr-product-art--sand"><span class="gr-vase"></span><span class="gr-saved">♡</span></div><b>A home for fresh flowers</b><small>Something lovely for our home</small></div>
              </div>
              <div class="gr-registry-footer"><span>06 favourite things</span><span>Share our wishes ↗</span></div>
            </div>
            <div class="gr-registry-toast"><span>✓</span><div><strong>A little wish, saved.</strong><small>Ready for a wonderful moment.</small></div></div>
            <small class="gr-preview-caption">Illustrative registry preview</small>
          </div>
        </div>
      </div>
    </section>

</template>

<!-- Scoped styles cannot affect the existing four-card section. -->
<style scoped src="../GiftRegistrySections.css"></style>
