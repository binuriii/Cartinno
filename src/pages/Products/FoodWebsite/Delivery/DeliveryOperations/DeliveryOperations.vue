<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { operationsContent, operationsCards } from './DeliveryOperationsData.js'

const sectionRef = ref(null)
let revealObserver = null

onMounted(() => {
  const section = sectionRef.value
  if (!section) return
  const items = [...section.querySelectorAll('.do-reveal')]
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('do-visible')
      revealObserver?.unobserve(entry.target)
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' })

  items.forEach((item) => revealObserver.observe(item))
  section.classList.add('do-ready')
})

onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="do-section" aria-labelledby="do-heading">
    <div class="do-container">
      <div class="do-layout">
        <div class="do-left">
          <header class="do-head do-reveal">
            <p v-if="operationsContent.eyebrow" class="do-eyebrow">{{ operationsContent.eyebrow }}</p>
            <h2 id="do-heading" class="do-title">{{ operationsContent.title }}</h2>
            <p class="do-description">{{ operationsContent.description }}</p>
          </header>
          <article v-if="operationsCards[0]" class="do-photo do-photo-left do-reveal">
            <img :src="operationsCards[0].image" :alt="operationsCards[0].alt" loading="lazy" decoding="async" />
            <div class="do-photo-content">

              <h3 class="do-photo-title">{{ operationsCards[0].title }}</h3>
              <p class="do-photo-description">{{ operationsCards[0].description }}</p>
            </div>
          </article>
        </div>
        <div class="do-right">
          <article v-if="operationsCards[1]" class="do-photo do-photo-main do-reveal">
            <img :src="operationsCards[1].image" :alt="operationsCards[1].alt" loading="lazy" decoding="async" />
            <div class="do-photo-content">
          
              <h3 class="do-photo-title">{{ operationsCards[1].title }}</h3>
              <p class="do-photo-description">{{ operationsCards[1].description }}</p>
            </div>
          </article>
          <div class="do-bottom-row">
            <article v-if="operationsCards[2]" class="do-photo do-photo-bottom do-reveal">
              <img :src="operationsCards[2].image" :alt="operationsCards[2].alt" loading="lazy" decoding="async" />
              <div class="do-photo-content">

                <h3 class="do-photo-title">{{ operationsCards[2].title }}</h3>
                <p class="do-photo-description">{{ operationsCards[2].description }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./DeliveryOperations.css"></style>
