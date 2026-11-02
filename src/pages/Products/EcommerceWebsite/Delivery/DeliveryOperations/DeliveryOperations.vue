<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { peopleContent, peopleCards } from './DeliveryOperationsData.js'

const sectionRef = ref(null)
let revealObserver = null

onMounted(() => {
  const section = sectionRef.value
  if (!section) return

  const items = [...section.querySelectorAll('.do-reveal')]
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion || !('IntersectionObserver' in window)) return

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('do-visible')
        revealObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -3% 0px' }
  )

  items.forEach((item) => revealObserver.observe(item))
  section.classList.add('do-ready')
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="do-section"
    aria-labelledby="do-heading"
  >
    <div class="do-container">
      <div class="do-layout">
        <!-- LEFT: heading/description above first image -->
        <div class="do-left">
          <header class="do-head do-reveal">
            <p v-if="peopleContent.eyebrow" class="do-eyebrow">
              {{ peopleContent.eyebrow }}
            </p>

            <h2 id="do-heading" class="do-title">
              {{ peopleContent.title }}
            </h2>

            <p class="do-description">
              {{ peopleContent.description }}
            </p>
          </header>

          <article
            v-if="peopleCards[0]"
            class="do-photo do-photo-left do-reveal"
          >
            <img
              :src="peopleCards[0].image"
              :alt="peopleCards[0].alt"
              loading="lazy"
              decoding="async"
            />
            <div class="do-photo-content">
              <span class="do-photo-number">01</span>
              <h3 class="do-photo-title">{{ peopleCards[0].title }}</h3>
              <p class="do-photo-description">{{ peopleCards[0].description }}</p>
            </div>
          </article>
        </div>

        <!-- RIGHT: large photo and offset bottom photo -->
        <div class="do-right">
          <article
            v-if="peopleCards[1]"
            class="do-photo do-photo-main do-reveal"
          >
            <img
              :src="peopleCards[1].image"
              :alt="peopleCards[1].alt"
              loading="lazy"
              decoding="async"
            />
            <div class="do-photo-content">
              <span class="do-photo-number">02</span>
              <h3 class="do-photo-title">{{ peopleCards[1].title }}</h3>
              <p class="do-photo-description">{{ peopleCards[1].description }}</p>
            </div>
          </article>

          <div class="do-bottom-row">
            <article
              v-if="peopleCards[2]"
              class="do-photo do-photo-bottom do-reveal"
            >
              <img
                :src="peopleCards[2].image"
                :alt="peopleCards[2].alt"
                loading="lazy"
                decoding="async"
              />
              <div class="do-photo-content">
                <span class="do-photo-number">03</span>
                <h3 class="do-photo-title">{{ peopleCards[2].title }}</h3>
                <p class="do-photo-description">{{ peopleCards[2].description }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./DeliveryOperations.css"></style>
