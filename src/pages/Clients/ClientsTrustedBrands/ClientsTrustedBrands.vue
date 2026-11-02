<script setup>
import './ClientsTrustedBrands.css'

import {
  trustedBrandsHeading,
  logos
} from './ClientsTrustedBrands.js'

import './ClientsTrustedBrands.js'

const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="tb-section">
    <div class="tb-container">

      <!-- SECTION HEADING -->
      <div class="tb-heading">
        <h2 class="tb-title">
          {{ trustedBrandsHeading.title }}
        </h2>

        <p class="tb-description">
          {{ trustedBrandsHeading.description }}
        </p>
      </div>

      <!-- LOGO GRID: 5 logos on the first row, the rest on the second -->
      <ul class="tb-grid">
        <li
          v-for="logo in logos"
          :key="logo.name"
          class="tb-card"
        >
          <a
            :href="logo.href"
            class="tb-link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="logo.name"
          >
            <img
              :src="`${base}${logo.image}`"
              :alt="logo.name + ' logo'"
              class="tb-logo"
              :style="{ '--tb-h': logo.h }"
              loading="lazy"
            />
          </a>
        </li>
      </ul>

    </div>
  </section>
</template>