
<script setup>
import './TrustedBrands.css'
import { logos } from './TrustedLogos.js'

const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="trusted" id="clients">
    <h2 class="trusted-title">
      Trusted by businesses across Sri Lanka and beyond
    </h2>

    <div class="trusted-row">
      <a
        v-for="logo in logos"
        :key="logo.name"
        :href="logo.href"
        :style="{ '--h': (logo.h || 40) + 'px' }"
        class="trusted-logo"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="logo.name"
      >
        <img
          v-if="logo.image"
          :src="`${base}${logo.image}`"
          :alt="logo.name"
          loading="lazy"
        />

        <span v-else>{{ logo.name }}</span>
      </a>
    </div>
  </section>
</template>
