<script setup>
import './Comparison.css'

import {
  comparisonContent,
  comparisonColumns,
  comparisonRows
} from './ComparisonData.js'
</script>

<template>
  <section class="ec-compare">
    <div class="ec-compare-container">

      <header class="ec-compare-heading">
        <h2 class="ec-compare-title">
          {{ comparisonContent.title }}
        </h2>

        <p class="ec-compare-description">
          {{ comparisonContent.description }}
        </p>
      </header>

      <div
        class="ec-compare-scroll"
        tabindex="0"
        role="region"
        aria-label="Cartinno and other vendors comparison"
      >
        <table class="ec-compare-table">

          <thead>
            <tr>
              <th scope="col" class="ec-compare-feature-head">
                Feature
              </th>

              <th
                v-for="column in comparisonColumns"
                :key="column.id"
                scope="col"
                :class="{
                  'ec-compare-brand-head':
                    column.id === 'cartinno'
                }"
              >
                <span class="ec-compare-column-name">
                  {{ column.label }}
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in comparisonRows"
              :key="row.feature"
            >
              <th scope="row" class="ec-compare-feature">
                {{ row.feature }}
              </th>

              <td
                v-for="column in comparisonColumns"
                :key="column.id"
                :class="{
                  'ec-compare-brand-cell':
                    column.id === 'cartinno'
                }"
              >
                <div class="ec-compare-value">
                  <span
                    class="ec-compare-mark"
                    :class="{
                      'is-yes': row[`${column.id}Included`],
                      'is-no': !row[`${column.id}Included`],
                      'is-brand': column.id === 'cartinno'
                    }"
                    :aria-label="
                      row[`${column.id}Included`]
                        ? 'Included or available'
                        : 'Limited or not included'
                    "
                  >
                    <svg
                      v-if="row[`${column.id}Included`]"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12.5L10 17L19 7"
                        stroke="currentColor"
                        stroke-width="2.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        stroke-width="2.2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>

                  <span class="ec-compare-value-text">
                    {{ row[column.id] }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      <p class="ec-compare-note">
        Other vendor features, fees, and plan availability may vary by provider and subscription.
      </p>

    </div>
  </section>
</template>