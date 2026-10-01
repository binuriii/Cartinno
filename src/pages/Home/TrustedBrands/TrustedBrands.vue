<script setup>
import './TrustedBrands.css'
import { logosOne, logosTwo } from './TrustedLogos.js'

const rows = [
  { items: logosOne, reverse: false },
  { items: logosTwo, reverse: true },
]
</script>

<template>
  <section class="trusted" id="clients">
    <h2 class="trusted-title">Trusted by 1,000+ brands across Sri Lanka and beyond</h2>

    <div class="trusted-rows">
      <div
        v-for="(row, r) in rows"
        :key="r"
        class="trusted-track"
        :class="{ rev: row.reverse }"
      >
        <!-- rendered twice so the loop is seamless -->
        <div v-for="(logo, i) in [...row.items, ...row.items]" :key="i" class="trusted-logo">
          <img v-if="logo.image" :src="logo.image" :alt="logo.name" />
          <span v-else>{{ logo.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>