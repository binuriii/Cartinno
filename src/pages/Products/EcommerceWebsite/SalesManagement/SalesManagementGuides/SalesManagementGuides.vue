<script setup>
import { RouterLink } from 'vue-router'
import { salesGuidesHeading, salesGuides, salesGuidesBanner } from './SalesManagementGuidesData.js'
import './SalesManagementGuides.css'

const base = import.meta.env.BASE_URL || '/'
const imageUrl = (path) => {
  if (!path) return ''
  if (/^(https?:\/\/|\/\/|data:|blob:)/i.test(path)) return path
  const cleanPath = path.replace(/^\/+/, '').replace(/^public\//i, '')
  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`
}
const isInternalLink = (href) => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
const cardComponent = (href) => !href ? 'article' : (isInternalLink(href) ? RouterLink : 'a')
const linkProps = (href) => !href ? {} : (isInternalLink(href) ? { to: href } : { href })
</script>

<template>
  <section class="sm-guides sm-section" aria-labelledby="sm-guides-heading">
    <div class="sm-guides-container">
      <header class="sm-guides-header">
        <h2 id="sm-guides-heading" class="sm-guides-heading">
          <span>{{ salesGuidesHeading.first }}</span>
          <span>{{ salesGuidesHeading.second }}</span>
        </h2>
      </header>

      <div class="sm-guides-grid">
        <component
          :is="cardComponent(guide.href)"
          v-for="(guide, index) in salesGuides"
          :key="guide.id"
          v-bind="linkProps(guide.href)"
          class="sm-guides-card"
          :class="{
            'sm-guides-card--featured': index === 0,
            'sm-guides-card--linked': Boolean(guide.href)
          }"
        >
          <img
            class="sm-guides-image"
            :src="imageUrl(guide.image)"
            :alt="guide.alt"
            :style="{ objectPosition: guide.imagePosition || 'center' }"
            loading="lazy"
            decoding="async"
          />
          <div class="sm-guides-overlay" aria-hidden="true"></div>
          <div class="sm-guides-card-content">
            <h3 class="sm-guides-card-title">{{ guide.title }}</h3>
            <span v-if="guide.href" class="sm-guides-card-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </component>

        <RouterLink :to="salesGuidesBanner.href" class="sm-guides-banner">
          <div class="sm-guides-banner-copy">
            <h3>{{ salesGuidesBanner.title }}</h3>
            <p>{{ salesGuidesBanner.description }}</p>
          </div>
          <span class="sm-guides-banner-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
