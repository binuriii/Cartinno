<script setup>
import './TrustedBrands.css'
import { logosOne, logosTwo } from './TrustedLogos.js'

const base = import.meta.env.BASE_URL

// repeat the short list so one "half" is wider than the screen
const repeat = (arr, n = 3) => Array.from({ length: n }, () => arr).flat()

const rows = [
  { items: repeat(logosOne), reverse: false },
  { items: repeat(logosTwo), reverse: true },
]
</script>

<template>
  <section class="trusted" id="clients">
    <h2 class="trusted-title">Trusted by businesses across Sri Lanka and beyond</h2>

    <div class="trusted-rows">
      <div
        v-for="(row, r) in rows"
        :key="r"
        class="trusted-track"
        :class="{ rev: row.reverse }"
      >
        <!-- rendered twice so the loop is seamless; the 2nd copy is hidden from keyboard/screen readers -->
        <a
          v-for="(logo, i) in [...row.items, ...row.items]"
          :key="i"
          :href="logo.href"
          :style="{ '--h': (logo.h || 32) + 'px' }"
          class="trusted-logo"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="logo.name"
          :aria-hidden="i >= row.items.length ? 'true' : null"
          :tabindex="i >= row.items.length ? -1 : null"
        >
          <img v-if="logo.image" :src="`${base}${logo.image}`" :alt="logo.name" />
          <span v-else>{{ logo.name }}</span>
        </a>
      </div>
    </div>
  </section>
</template>