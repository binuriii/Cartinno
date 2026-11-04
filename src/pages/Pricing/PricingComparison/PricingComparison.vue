<script setup>
import { pricingPlans } from '../PricingPlans/PricingPlansData.js'
import { pricingFeatureGroups } from './PricingComparisonData.js'
import './PricingComparison.css'

const props = defineProps({
  currency: {
    type: String,
    default: 'LKR',
  },
})

const formatPrice = (value) => {
  if (value === undefined || value === null || value === '') {
    return 'Contact us'
  }

  const symbol = props.currency === 'LKR' ? 'Rs ' : '$'

  return `${symbol}${Number(value).toLocaleString('en-US', {
    minimumFractionDigits: props.currency === 'USD' ? 2 : 0,
    maximumFractionDigits: props.currency === 'USD' ? 2 : 0,
  })}`
}

const tableValue = (value) => {
  if (value === true) return 'yes'
  if (value === false) return 'no'

  if (typeof value === 'number') {
    return formatPrice(value)
  }

  if (value && typeof value === 'object' && value.amount !== undefined) {
    return formatPrice(value.amount)
  }

  return value
}

const tableDisplay = (feature, index) => {
  const value = feature.values[index]

  if (!feature.currencyValues) {
    return tableValue(value)
  }

  if (props.currency === 'LKR') {
    if (feature.lkrValues) {
      return formatPrice(feature.lkrValues[index])
    }

    // Use the original value when no LKR price is provided
    return formatPrice(value)
  }

  return formatPrice(value)
}
</script>

<template>
  <section class="cpr-comparison-section">
    <div class="cpr-container">
      <div class="cpr-table-heading">
        <h2>Every feature, clearly compared.</h2>
        <p>
          Compare features side by side and find the right fit for your business.
        </p>
      </div>

      <div class="cpr-comparison-wrap">
        <table class="cpr-comparison-table">
          <thead>
            <tr>
              <th class="cpr-feature-heading">
                <span>FEATURES</span>
              </th>

              <th
                v-for="plan in pricingPlans"
                :key="plan.id"
                :class="`cpr-col-${plan.id}`"
              >
                <div class="cpr-plan-heading">
                  <h3>{{ plan.name }}</h3>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <template
              v-for="group in pricingFeatureGroups"
              :key="group.title"
            >
              <tr class="cpr-category-row">
                <th colspan="5">
                  <span class="cpr-category-indicator"></span>
                  {{ group.title }}
                </th>
              </tr>

              <tr
                v-for="feature in group.features"
                :key="feature.label"
                class="cpr-feature-row"
              >
                <th class="cpr-feature-label">
                  <span>{{ feature.label }}</span>

                  <span v-if="feature.badge" class="cpr-table-badge">
                    {{ feature.badge }}
                  </span>
                </th>

                <td
                  v-for="(plan, index) in pricingPlans"
                  :key="`${feature.label}-${plan.id}`"
                  :class="`cpr-col-${plan.id}`"
                >
                  <div class="cpr-value">
                    <span
                      v-if="feature.values[index] === true"
                      class="cpr-included"
                      aria-label="Included"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12.5L9.5 17L19 7"
                          stroke="currentColor"
                          stroke-width="2.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>

                    <span
                      v-else-if="feature.values[index] === false"
                      class="cpr-not-included"
                      aria-label="Not included"
                    >
                      ×
                    </span>

                    <span v-else class="cpr-text-value">
                      {{ tableDisplay(feature, index) }}
                    </span>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <p class="cpr-comparison-note">
        Explore the features included in each Cartinno plan.
        Contact our team if you need help selecting a plan.
      </p>
    </div>
  </section>
</template>
