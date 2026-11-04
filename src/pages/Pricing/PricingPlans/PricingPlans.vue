<script setup>
import { computed } from 'vue'
import { pricingPlans } from './PricingPlansData.js'
import './PricingPlans.css'

const props = defineProps({
  billing: {
    type: String,
    default: 'monthly',
  },
  currency: {
    type: String,
    default: 'LKR',
  },
})

const emit = defineEmits(['update:billing', 'update:currency'])

const currencyLabel = computed(() =>
  props.currency === 'LKR' ? 'Rs ' : '$'
)

const formatPrice = (value) => {
  if (value === undefined || value === null || value === '') {
    return 'Contact us'
  }

  return `${currencyLabel.value}${Number(value).toLocaleString('en-US', {
    minimumFractionDigits: props.currency === 'USD' ? 2 : 0,
    maximumFractionDigits: props.currency === 'USD' ? 2 : 0,
  })}`
}

const cardPrice = (plan) => {
  if (props.currency === 'LKR') {
    return props.billing === 'yearly'
      ? formatPrice(plan.yearlyLKR)
      : formatPrice(plan.monthlyLKR)
  }

  return props.billing === 'yearly'
    ? formatPrice(plan.yearly)
    : formatPrice(plan.monthly)
}

const cardPeriod = computed(() =>
  props.billing === 'yearly' ? '/year' : '/month'
)

const equivalentMonthly = (plan) => {
  const amount = props.currency === 'LKR'
    ? plan.equivalentMonthlyLKR
    : plan.equivalentMonthly

  return `Equivalent monthly: ${formatPrice(amount)}`
}

const setBilling = (value) => emit('update:billing', value)
const setCurrency = (value) => emit('update:currency', value)

const buyPlan = (planName) => {
  const subject = encodeURIComponent(`Cartinno ${planName} plan enquiry`)
  window.location.href = `/#contact?subject=${subject}`
}
</script>

<template>
  <section id="pricing-plans" class="cpr-section">
    <div class="cpr-container">
      <header class="cpr-heading">
        <h2>Plans for every stage of growth.</h2>
        <p>Compare features and find the plan that suits your business.</p>
      </header>

      <div class="cpr-controls">
        <div class="cpr-billing-control" aria-label="Billing period">
          <button
            type="button"
            :class="{ 'is-active': billing === 'monthly' }"
            @click="setBilling('monthly')"
          >
            Monthly
          </button>

          <button
            class="cpr-switch"
            type="button"
            role="switch"
            :aria-checked="billing === 'yearly'"
            aria-label="Toggle yearly billing"
            @click="setBilling(billing === 'yearly' ? 'monthly' : 'yearly')"
          >
            <span></span>
          </button>

          <button
            type="button"
            :class="{ 'is-active': billing === 'yearly' }"
            @click="setBilling('yearly')"
          >
            Yearly
          </button>

          <span v-if="billing === 'yearly'" class="cpr-saving">
            2 months free
          </span>
        </div>

        <div class="cpr-currency-control" aria-label="Currency">
          <button
            type="button"
            :class="{ 'is-active': currency === 'LKR' }"
            @click="setCurrency('LKR')"
          >
            LKR
          </button>

          <button
            class="cpr-currency-switch"
            type="button"
            role="switch"
            :aria-checked="currency === 'USD'"
            aria-label="Toggle currency"
            @click="setCurrency(currency === 'USD' ? 'LKR' : 'USD')"
          >
            <span></span>
          </button>

          <button
            type="button"
            :class="{ 'is-active': currency === 'USD' }"
            @click="setCurrency('USD')"
          >
            USD
          </button>
        </div>
      </div>

      <div class="cpr-plan-grid">
        <article
          v-for="(plan, index) in pricingPlans"
          :key="plan.id"
          class="cpr-plan-card"
          :class="{
            'cpr-plan-card--featured': plan.featured,
            [`cpr-plan-card--${plan.id}`]: true,
          }"
        >
          <div class="cpr-plan-topline">
            <span class="cpr-plan-index">0{{ index + 1 }}</span>

            <span v-if="plan.featured" class="cpr-popular">
              Business choice
            </span>
          </div>

          <div class="cpr-plan-intro">
            <h3>{{ plan.name }}</h3>
            <p>{{ plan.subtitle }}</p>
          </div>

          <div class="cpr-price-area">
            <div class="cpr-price-line">
              <strong>{{ cardPrice(plan) }}</strong>
              <span>{{ cardPeriod }}</span>
            </div>

            <div class="cpr-equivalent">
              <span>{{ equivalentMonthly(plan) }}</span>

              <span v-if="billing === 'yearly'" class="cpr-free-pill">
                2 months free
              </span>
            </div>
          </div>

          <ul class="cpr-plan-highlights">
            <li v-for="item in plan.highlights" :key="item">
              <span class="cpr-check" aria-hidden="true">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <button
            class="cpr-buy-button"
            type="button"
            @click="buyPlan(plan.name)"
          >
            <span>Buy {{ plan.name }}</span>
            <span class="cpr-button-arrow" aria-hidden="true">↗</span>
          </button>
        </article>
      </div>
    </div>
  </section>
</template>
