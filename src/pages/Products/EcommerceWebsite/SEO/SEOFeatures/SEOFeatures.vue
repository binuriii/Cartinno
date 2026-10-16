<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

import {
  seoFeaturesContent,
  seoFeatures
} from './SEOFeaturesData.js'

const sectionRef = ref(null)

let observer = null
let motionQuery = null

const animations = new Set()

function stopAnimations() {
  animations.forEach((animation) => animation.cancel())
  animations.clear()
}

function handleMotionChange(event) {
  if (event.matches) stopAnimations()
}

function assetUrl(path) {
  if (!path) return ''

  if (/^(https?:\/\/|\/\/|data:|blob:)/i.test(path)) {
    return path
  }

  const base = import.meta.env.BASE_URL || '/'

  const cleanPath = path
    .replace(/^\/+/, '')
    .replace(/^public\//i, '')

  return `${base.endsWith('/') ? base : `${base}/`}${encodeURI(cleanPath)}`
}

onMounted(() => {
  motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  motionQuery.addEventListener('change', handleMotionChange)

  if (
    motionQuery.matches ||
    !('IntersectionObserver' in window)
  ) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        observer?.unobserve(entry.target)

        if (
          motionQuery.matches ||
          typeof entry.target.animate !== 'function'
        ) {
          return
        }

        const animation = entry.target.animate(
          [
            {
              opacity: 0,
              transform: 'translateY(24px)'
            },
            {
              opacity: 1,
              transform: 'translateY(0)'
            }
          ],
          {
            duration: 800,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
          }
        )

        animations.add(animation)

        animation.onfinish = () => {
          animations.delete(animation)
        }
      })
    },
    { threshold: 0.12 }
  )

  sectionRef.value
    ?.querySelectorAll('[data-seo-reveal]')
    .forEach((element) => observer.observe(element))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  stopAnimations()

  motionQuery?.removeEventListener(
    'change',
    handleMotionChange
  )
})
</script>

<template>
  <section
    id="seo-features"
    ref="sectionRef"
    class="seo-glass"
    aria-label="Cartinno SEO solutions"
  >
    <div class="seo-glass__container">
      <!-- HEADER -->
      <header class="seo-glass__header" data-seo-reveal>
        <h2 class="seo-glass__heading">
          {{ seoFeaturesContent.title }}

          <span>
            {{ seoFeaturesContent.secondLine }}
          </span>
        </h2>

        <p class="seo-glass__intro">
          {{ seoFeaturesContent.description }}
        </p>
      </header>

      <!-- IMAGE CARDS -->
      <div class="seo-glass__grid">
        <article
          v-for="feature in seoFeatures"
          :key="feature.id"
          class="seo-glass__card"
          data-seo-reveal
        >
          <img
            class="seo-glass__image"
            :src="assetUrl(feature.image)"
            :alt="feature.imageAlt"
            :style="{
              objectPosition: feature.imagePosition
            }"
            width="900"
            height="1100"
            loading="lazy"
            decoding="async"
          />

          <div
            class="seo-glass__shade"
            aria-hidden="true"
          ></div>

          <span
            class="seo-glass__number"
            aria-hidden="true"
          >
            {{ feature.number }}
          </span>

          <!-- TRANSPARENT GLASS CONTENT -->
          <div class="seo-glass__panel">
            <div class="seo-glass__panel-top">
              <p class="seo-glass__category">
                {{ feature.category }}
              </p>

              <span
                class="seo-glass__symbol"
                aria-hidden="true"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 18 18 6M6 6h12v12"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>

            <h3 class="seo-glass__title">
              {{ feature.title }}
            </h3>

            <p class="seo-glass__description">
              {{ feature.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./SEOFeatures.css"></style>