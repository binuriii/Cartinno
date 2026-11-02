<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  cateringBenefitsContent as content,
  cateringBenefits as benefits,
  cateringBenefitsCTA as cta
} from './CateringBenefitsData.js'
import './CateringBenefits.css'

const sectionRef = ref(null)
const isVisible = ref(false)
const failedImages = ref(new Set())
let observer = null

function hasImage(benefit) {
  return Boolean(benefit.image) && !failedImages.value.has(benefit.id)
}

function onImageError(id) {
  failedImages.value = new Set([...failedImages.value, id])
}

onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = true
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    isVisible.value = true
    observer?.disconnect()
    observer = null
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' })
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" id="catering-benefits" class="cb-section" :class="{ 'cb-visible': isVisible }">
    <div class="cb-container">
      <header class="cb-header">
        <h2 class="cb-heading">{{ content.title1 }}<span>{{ content.title2 }}</span></h2>
      </header>

      <div class="cb-grid">
        <article class="cb-card cb-card-main">
          <img v-if="hasImage(benefits[0])" :src="benefits[0].image" :alt="benefits[0].imageAlt" class="cb-card-image" loading="lazy" @error="onImageError(benefits[0].id)" />
          <div v-else class="cb-image-fallback cb-fallback-main"></div>
          <div class="cb-card-overlay" aria-hidden="true"></div>
          <div class="cb-card-content"><h3>{{ benefits[0].title }}</h3><p>{{ benefits[0].description }}</p></div>
        </article>

        <article class="cb-card cb-card-middle">
          <img v-if="hasImage(benefits[1])" :src="benefits[1].image" :alt="benefits[1].imageAlt" class="cb-card-image" loading="lazy" @error="onImageError(benefits[1].id)" />
          <div v-else class="cb-image-fallback cb-fallback-middle"></div>
          <div class="cb-card-overlay" aria-hidden="true"></div>
          <div class="cb-card-content"><h3>{{ benefits[1].title }}</h3><p>{{ benefits[1].description }}</p></div>
        </article>

        <article class="cb-card cb-card-right">
          <img v-if="hasImage(benefits[2])" :src="benefits[2].image" :alt="benefits[2].imageAlt" class="cb-card-image" loading="lazy" @error="onImageError(benefits[2].id)" />
          <div v-else class="cb-image-fallback cb-fallback-right"></div>
          <div class="cb-card-overlay" aria-hidden="true"></div>
          <div class="cb-card-content"><h3>{{ benefits[2].title }}</h3><p>{{ benefits[2].description }}</p></div>
        </article>

        <div class="cb-cta">
          <div class="cb-cta-content"><h3>{{ cta.title }}</h3><p>{{ cta.description }}</p></div>
          <a :href="cta.buttonLink" class="cb-cta-button" :aria-label="cta.buttonLabel" :title="cta.buttonLabel"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
  </section>
</template>
