<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import './Pricing.css'
import { headline, columns, rows, cta, footnote } from './PricingData.js'

const base = import.meta.env.BASE_URL

const table = ref(null)
const visible = ref(false)
let observer = null

const themIcon = {
  yes: 'fa-check',
  no: 'fa-xmark',
  partial: 'fa-minus'
}

const themLabel = {
  yes: 'Yes',
  no: 'No',
  partial: 'Partially'
}

// hide a logo quietly if the file is missing
const hideBroken = (event) => {
  event.target.style.display = 'none'
}

onMounted(() => {
  if (!('IntersectionObserver' in window) || !table.value) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )

  observer.observe(table.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section class="pr" id="pricing">
    <h2 class="pr-title">{{ headline.pre }}<span class="pr-accent">{{ headline.highlight }}</span><br>{{ headline.post }}</h2>

    <div
      ref="table"
      class="pr-table"
      :class="{ 'is-visible': visible }"
      role="table"
    >

      <!-- highlighted Cartinno column (one continuous gradient card) -->
      <div class="pr-hl" aria-hidden="true"></div>

      <!-- HEADER -->
      <div class="pr-row pr-row-head" role="row" :style="{ '--i': 0 }">
        <div class="pr-cell pr-cell-label" role="columnheader"></div>

        <div class="pr-cell pr-cell-us pr-cell-first" role="columnheader">
          <span class="pr-brand">{{ columns.us }}</span>
        </div>

        <div class="pr-cell pr-cell-them" role="columnheader">
          <span class="pr-them-title">{{ columns.them }}</span>
        </div>
      </div>

      <!-- ROWS -->
      <div
        v-for="(row, i) in rows"
        :key="row.label"
        class="pr-row"
        role="row"
        :style="{ '--i': i + 1 }"
      >
        <div class="pr-cell pr-cell-label" role="rowheader">
          {{ row.label }}
        </div>

        <div class="pr-cell pr-cell-us" role="cell">
          <span class="pr-yes" aria-hidden="true">
            <i class="fa-solid fa-check"></i>
          </span>

          <span class="pr-text">
            <strong v-if="row.value" class="pr-value">{{ row.value }}</strong>

            <template v-if="row.logo && row.text.includes('{logo}')">
              {{ row.text.split('{logo}')[0].trimEnd() }}<span class="pr-logo-chip"><img
                :src="`${base}${row.logo}`"
                alt="3CX"
                class="pr-logo"
                loading="lazy"
                @error="hideBroken"
              /></span>{{ row.text.split('{logo}')[1].trimStart() }}
            </template>

            <template v-else>{{ row.text }}</template>
          </span>
        </div>

        <div class="pr-cell pr-cell-them" role="cell">
          <span class="pr-them-chip" :class="`is-${row.them}`" aria-hidden="true">
            <i class="fa-solid" :class="themIcon[row.them]"></i>
          </span>
          <span class="pr-sr">{{ themLabel[row.them] }}</span>
        </div>
      </div>

    </div>
  </section>
</template>