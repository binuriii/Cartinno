<script setup>
import { RouterLink } from 'vue-router'
import {
  missionHeading,
  missionContent
} from './MissionSectionData.js'

import './MissionSection.css'

const base = import.meta.env.BASE_URL

/* Full links (https://...) are used as they are, files in /public get the base path */
const imageSrc = /^(https?:)?\/\/|^data:/.test(missionContent.image)
  ? missionContent.image
  : `${base}${missionContent.image}`

const isInternal = (link) =>
  typeof link === 'string' &&
  link.startsWith('/') &&
  !link.startsWith('//')

const buttonComponent = (link) =>
  isInternal(link) ? RouterLink : 'a'

const buttonProps = (link) =>
  isInternal(link) ? { to: link } : { href: link || '#' }
</script>

<template>
  <section class="ms-section">
    <div class="ms-container">

      <!-- SECTION HEADING -->
      <div class="ms-heading">
        <h2 class="ms-heading-title">
          {{ missionHeading.title }}
        </h2>

        <p class="ms-heading-description">
          {{ missionHeading.description }}
        </p>
      </div>

      <div class="ms-panel">

        <!-- LEFT SIDE -->
        <div class="ms-content">

          <div class="ms-main">
            <h3 class="ms-title">
              {{ missionContent.title }}
            </h3>

            <p class="ms-description">
              {{ missionContent.description }}
            </p>

          </div>

          <ul
            v-if="missionContent.tags?.length"
            class="ms-tags"
          >
            <li
              v-for="tag in missionContent.tags"
              :key="tag.label"
              class="ms-tag"
              :class="'ms-tag-' + tag.color"
            >
              {{ tag.label }}
            </li>
          </ul>

        </div>

        <!-- RIGHT SIDE: IMAGE CARD -->
        <div class="ms-image">
          <img
            :src="imageSrc"
            :alt="missionContent.imageAlt"
            class="ms-photo"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  </section>
</template>