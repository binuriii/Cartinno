
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  aboutMissionHeading,
  aboutMissionContent
} from './AboutMissionSectionData.js'

import './AboutMissionSection.css'

const base = import.meta.env.BASE_URL

const imageSrc = computed(() => {
  const image = aboutMissionContent.image

  if (!image) return ''

  // Keep absolute URLs and data URLs unchanged.
  if (/^(https?:)?\/\//i.test(image) || image.startsWith('data:')) {
    return image
  }

  // Support paths with or without a leading slash.
  return `${base}${image.replace(/^\/+/, '')}`
})

const isInternal = (link) =>
  typeof link === 'string' &&
  link.startsWith('/') &&
  !link.startsWith('//')

const buttonComponent = computed(() =>
  isInternal(aboutMissionContent.button?.link)
    ? RouterLink
    : 'a'
)

const buttonProps = computed(() => {
  const link = aboutMissionContent.button?.link

  return isInternal(link)
    ? { to: link }
    : { href: link || '#contact' }
})
</script>

<template>
  <section class="ams-section">
    <div class="ams-container">
      <!-- Centered section heading -->
      <div class="ams-heading">
        <h2 class="ams-heading-title">
          {{ aboutMissionHeading.title }}
        </h2>

        <p class="ams-heading-description">
          {{ aboutMissionHeading.description }}
        </p>
      </div>

      <!-- Main content panel -->
      <div class="ams-panel">
        <!-- Left content -->
        <div class="ams-content">
          <div class="ams-main">
            <h3 class="ams-title">
              {{ aboutMissionContent.title }}
            </h3>

            <p class="ams-description">
              {{ aboutMissionContent.description }}
            </p>

            <component
              v-if="aboutMissionContent.button"
              :is="buttonComponent"
              v-bind="buttonProps"
              class="ams-btn"
            >
              {{ aboutMissionContent.button.text }}
            </component>
          </div>

          <ul
            v-if="aboutMissionContent.tags?.length"
            class="ams-tags"
          >
            <li
              v-for="tag in aboutMissionContent.tags"
              :key="tag.label"
              class="ams-tag"
              :class="`ams-tag-${tag.color}`"
            >
              {{ tag.label }}
            </li>
          </ul>
        </div>

        <!-- Right image -->
        <div
          v-if="imageSrc"
          class="ams-image"
        >
          <img
            :src="imageSrc"
            :alt="aboutMissionContent.imageAlt || 'About Cartinno'"
            class="ams-photo"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>
