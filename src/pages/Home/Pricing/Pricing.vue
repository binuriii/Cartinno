
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import './Pricing.css'
import { headline, columns, rows } from './PricingData.js'

const table = ref(null)
const visible = ref(false)
let observer = null

onMounted(() => {
  if (!table.value || typeof IntersectionObserver === 'undefined') {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  observer.observe(table.value)
})

onBeforeUnmount(() => observer?.disconnect())

const statusLabel = (status) =>
  status === 'yes' ? 'Included' : 'Not included'
</script>

<template>
  <section class="pr" id="pricing">
    <div class="pr-container">

      <div class="pr-heading">
        <h2 class="pr-title">
          Why Cartinno stands out
          <span class="pr-title-line">
            from the rest?
          </span>
        </h2>

      </div>

      <div
        ref="table"
        class="pr-table"
        :class="{ 'is-visible': visible }"
        role="table"
        aria-label="Cartinno comparison"
      >
        <!-- HEADER -->
        <div class="pr-row pr-row-head" role="row">

          <!-- FEATURES INTRO -->
          <div
            class="pr-cell pr-feature-head"
            role="columnheader"
          >
            <div class="pr-feature-intro">


              <p>
                Compare the essentials and discover
                how Cartinno helps your <br> business
                save more, work smarter and grow.
              </p>

              <span class="pr-feature-heading">
                7 KEY AREAS
              </span>

            </div>
          </div>

          <!-- OTHERS -->
          <div
            class="pr-cell pr-other-head"
            role="columnheader"
          >
            <div class="pr-panel-top">
              <span class="pr-panel-badge">
                TYPICAL PLATFORM
              </span>
            </div>

            <div class="pr-panel-intro">
              <h3>Built around the platform</h3>

              <p>
                Your brand and workflow adapt to a
                predefined ecosystem.
              </p>
            </div>

            <div class="pr-panel-divider"></div>
          </div>

          <!-- CARTINNO -->
          <div
            class="pr-cell pr-us-head"
            role="columnheader"
          >
            <div class="pr-panel-top">
              <span class="pr-company">
                {{ columns.us }}
              </span>

              <span class="pr-panel-badge pr-panel-badge-us">
                BUILT FOR BUSINESS
              </span>
            </div>

            <div class="pr-panel-intro">
              <h3>Built around your business</h3>

              <p>
                More control, fewer fees and everything
                you need to grow.
              </p>
            </div>

            <div class="pr-panel-divider"></div>
          </div>

        </div>

        <!-- FEATURE ROWS -->
        <div
          v-for="(row, index) in rows"
          :key="row.label"
          class="pr-row pr-data-row"
          role="row"
        >
          <div
            class="pr-cell pr-feature"
            role="rowheader"
          >
            {{ row.label }}
          </div>

          <!-- OTHERS RESULT -->
          <div class="pr-cell pr-other" role="cell">
            <div class="pr-result-card pr-result-other">

              <span class="pr-result-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <span
                class="pr-result-mark"
                :class="row.them === 'yes' ? 'is-yes' : 'is-no'"
              >
                <i
                  class="fa-solid"
                  :class="row.them === 'yes' ? 'fa-check' : 'fa-xmark'"
                  aria-hidden="true"
                ></i>

                <span class="pr-sr">
                  {{ statusLabel(row.them) }}
                </span>
              </span>

            </div>
          </div>

          <!-- CARTINNO RESULT -->
          <div class="pr-cell pr-us" role="cell">
            <div class="pr-result-card pr-result-us">

              <span class="pr-result-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <span class="pr-result-mark is-us">
                <i
                  class="fa-solid fa-check"
                  aria-hidden="true"
                ></i>

                <span class="pr-sr">Included</span>
              </span>

            </div>
          </div>

        </div>

        <div class="pr-vs" aria-hidden="true">
          VS
        </div>

      </div>

    </div>
  </section>
</template>
