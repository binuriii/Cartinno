
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

      <!-- HEADING -->
      <div class="ec-compare-heading">
        <h2 class="ec-compare-title">
          {{ comparisonContent.title }}
        </h2>

        <p class="ec-compare-description">
          {{ comparisonContent.description }}
        </p>
      </div>

      <!-- RESPONSIVE TABLE -->
      <div
        class="ec-compare-scroll"
        tabindex="0"
        role="region"
        aria-label="E-Commerce platform comparison"
      >
        <table class="ec-compare-table">

          <thead>
            <tr>
              <th scope="col" class="ec-compare-feature-head">
                Features
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

                <span
                  v-if="column.id === 'cartinno'"
                  class="ec-compare-brand-caption"
                >
                  ALL-IN-ONE
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
                <span class="ec-compare-feature-number">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <span>{{ row.feature }}</span>
              </th>

              <td
                v-for="column in comparisonColumns"
                :key="column.id"
                :class="{
                  'ec-compare-brand-cell':
                    column.id === 'cartinno'
                }"
              >
                <span
                  class="ec-compare-mark"
                  :class="{
                    'is-yes': row[column.id],
                    'is-no': !row[column.id],
                    'is-brand': column.id === 'cartinno'
                  }"
                  :aria-label="
                    row[column.id]
                      ? 'Included'
                      : 'Not included'
                  "
                >
                  <svg
                    v-if="row[column.id]"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5L10 17L19 7"
                      stroke="currentColor"
                      stroke-width="2"
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
                      d="M6 6L18 18M18 6L6 18"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      <p class="ec-compare-note">
        Feature availability can vary by service provider
        and selected plan.
      </p>

    </div>
  </section>
</template>
