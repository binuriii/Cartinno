<script setup>
import { RouterLink } from 'vue-router'

import {
  seoGuidesHeading,
  seoGuides,
  seoGuidesBanner,
} from './SEOGuidesData.js'

const base = import.meta.env.BASE_URL

const imageUrl = (path) => {
  if (!path) return ''

  if (/^(https?:\/\/|\/\/|data:|blob:)/i.test(path)) {
    return path
  }

  // Files inside public/ are served without "public/" in the URL.
  const cleanPath = path
    .replace(/^\/+/, '')
    .replace(/^public\//, '')

  return `${base.replace(/\/?$/, '/')}${cleanPath}`
}

const isInternalLink = (href) =>
  typeof href === 'string' &&
  href.startsWith('/') &&
  !href.startsWith('//')

const cardComponent = (href) => {
  if (!href) return 'article'

  return isInternalLink(href) ? RouterLink : 'a'
}

const linkProps = (href) => {
  if (!href) return {}

  return isInternalLink(href)
    ? { to: href }
    : { href }
}
</script>

<template>
  <section
    class="seo-guides"
    aria-labelledby="seo-guides-heading"
  >
    <div class="seo-guides__container">
      <!-- SECTION HEADING -->
      <header class="seo-guides__header">
        <h2
          id="seo-guides-heading"
          class="seo-guides__heading"
        >
          <span>{{ seoGuidesHeading.first }}</span>
          <span>{{ seoGuidesHeading.second }}</span>
        </h2>
      </header>

      <div class="seo-guides__grid">
        <!-- IMAGE CARDS -->
        <component
          :is="cardComponent(guide.href)"
          v-for="(guide, index) in seoGuides"
          :key="guide.id"
          v-bind="linkProps(guide.href)"
          class="seo-guides__card"
          :class="{
            'seo-guides__card--featured': index === 0,
            'seo-guides__card--linked': Boolean(guide.href),
          }"
        >
          <img
            class="seo-guides__image"
            :src="imageUrl(guide.image)"
            :alt="guide.alt"
            :style="{
              objectPosition: guide.imagePosition || 'center',
            }"
            loading="lazy"
            decoding="async"
          />

          <div
            class="seo-guides__overlay"
            aria-hidden="true"
          ></div>

          <div class="seo-guides__card-content">
            <h3 class="seo-guides__card-title">
              {{ guide.title }}
            </h3>

            <span
              v-if="guide.href"
              class="seo-guides__card-arrow"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </component>

        <!-- GREEN BANNER -->
        <RouterLink
          :to="seoGuidesBanner.href"
          class="seo-guides__banner"
        >
          <div class="seo-guides__banner-copy">
            <h3>{{ seoGuidesBanner.title }}</h3>
            <p>{{ seoGuidesBanner.description }}</p>
          </div>

          <span
            class="seo-guides__banner-arrow"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="m9 5 7 7-7 7"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped src="./SEOGuides.css"></style>