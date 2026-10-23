
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  reportingFeaturesContent as content,
  reportingFeatures as features,
  reportingOverview as overview,
  reportingProducts as products,
  reportingInsight as insight,
  reportingMobile as mobile
} from './ReportingFeaturesData.js'

import './ReportingFeatures.css'

const root = ref(null)
const visible = ref(false)

const logoFailed = ref(false)

const logo = `${
  import.meta.env.BASE_URL
}cartinno-logo.webp`

let observer = null

onMounted(() => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return

      visible.value = true

      observer?.disconnect()
      observer = null
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -5% 0px'
    }
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="root"
    class="rpa-section"
    :class="{ 'rpa-visible': visible }"
    id="reporting-features"
  >
    <div class="rpa-container">

      <!-- CENTERED SECTION HEADING -->
      <header class="rpa-header">

        <h2 class="rpa-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>

        <p class="rpa-description">
          {{ content.description }}
        </p>

      </header>

      <!-- =====================================
           CARD 01: LARGE DASHBOARD
      ====================================== -->
      <article class="rpa-main-card">

        <!-- ANIMATED REPORTING DASHBOARD -->
        <div class="rpa-main-visual">

          <div class="rpa-dashboard">

            <!-- OVERALL SALES -->
            <div class="rpa-dashboard-sales">

              <div class="rpa-dashboard-label">
                <span class="rpa-dashboard-dot"></span>
                Overall sales
              </div>

              <div class="rpa-dashboard-total">
                <strong>
                  {{ overview.totalSales }}
                </strong>

                <span class="rpa-trend">
                  <i class="fa-solid fa-arrow-trend-up"></i>
                  {{ overview.salesChange }}
                </span>
              </div>

              <!-- ANIMATED SALES CHART -->
              <div
                class="rpa-sales-chart"
                role="img"
                aria-label="Illustrative weekly sales bar chart"
              >
                <div
                  v-for="(bar, index) in overview.salesBars"
                  :key="index"
                  class="rpa-chart-column"
                >
                  <div
                    class="rpa-chart-bar rpa-chart-bar-back"
                    :style="{
                      '--bar-height': `${Math.min(100, bar + 16)}%`,
                      '--bar-delay': `${index * 0.06}s`
                    }"
                  ></div>

                  <div
                    class="rpa-chart-bar rpa-chart-bar-front"
                    :style="{
                      '--bar-height': `${bar}%`,
                      '--bar-delay': `${index * 0.06 + 0.12}s`
                    }"
                  ></div>
                </div>
              </div>

              <div class="rpa-chart-times">
                <span>9 AM</span>
                <span>9 PM</span>
              </div>

            </div>

            <div class="rpa-dashboard-divider"></div>

            <!-- TOTAL ORDERS -->
            <div class="rpa-dashboard-orders">

              <div class="rpa-dashboard-label">
                <span class="rpa-orders-symbol">
                  <i class="fa-solid fa-bag-shopping"></i>
                </span>
                Total orders

                <i
                  class="fa-solid fa-chevron-right rpa-chevron"
                ></i>
              </div>

              <div class="rpa-dashboard-total">
                <strong>
                  {{ overview.totalOrders }}
                </strong>

                <span class="rpa-trend">
                  <i class="fa-solid fa-arrow-trend-up"></i>
                  {{ overview.ordersChange }}
                </span>
              </div>

              <div class="rpa-platform-label">
                By platform
              </div>

              <div
                class="rpa-platform-bars"
                role="img"
                aria-label="Illustrative orders by sales channel"
              >
                <span
                  v-for="platform in overview.platforms"
                  :key="platform.label"
                  :style="{
                    '--platform-width': platform.value,
                    '--platform-color': platform.color
                  }"
                ></span>
              </div>

              <div class="rpa-platform-legend">
                <span
                  v-for="platform in overview.platforms"
                  :key="platform.label"
                >
                  <i
                    :style="{
                      background: platform.color
                    }"
                  ></i>

                  {{ platform.label }}
                </span>
              </div>

            </div>

          </div>

        </div>

        <!-- RIGHT MAIN CARD CONTENT -->
        <div class="rpa-main-content">

          <span class="rpa-card-label">
            {{ features[0].number }}
            / {{ features[0].label }}
          </span>

          <h3>
            {{ features[0].title }}
          </h3>

          <p>
            {{ features[0].description }}
          </p>

        </div>

      </article>

      <!-- =====================================
           BOTTOM TWO CARDS
      ====================================== -->
      <div class="rpa-bottom-grid">

        <!-- CARD 02: GROWTH SIGNALS -->
        <article class="rpa-insights-card">

          <div class="rpa-insights-content">

            <span class="rpa-card-label">
              {{ features[1].number }}
              / {{ features[1].label }}
            </span>

            <h3>
              {{ features[1].title }}
            </h3>

            <p>
              {{ features[1].description }}
            </p>

          </div>

          <!-- ANIMATED SALES INSIGHT -->
          <div class="rpa-insights-scene">

            <div class="rpa-insight-alert">

              <span class="rpa-alert-icon">
                <i class="fa-solid fa-arrow-trend-up"></i>
              </span>

              <div class="rpa-alert-copy">

                <div class="rpa-alert-heading">
                  <strong>
                    {{ insight.title }}
                  </strong>

                  <small>
                    {{ insight.time }}
                  </small>
                </div>

                <p>
                  {{ insight.description }}
                </p>

              </div>

            </div>

            <!-- TOP SELLERS PREVIEW -->
            <div class="rpa-top-products">

              <div class="rpa-top-products-header">
                <strong>Top-selling products</strong>
                <span>This week</span>
              </div>

              <div
                v-for="(product, index) in products"
                :key="product.id"
                class="rpa-top-product"
                :style="{ '--product-index': index }"
              >
                <span class="rpa-product-rank">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <div class="rpa-product-copy">
                  <strong>
                    {{ product.name }}
                  </strong>

                  <small>
                    {{ product.sales }}
                  </small>
                </div>

                <span class="rpa-product-change">
                  {{ product.change }}
                </span>
              </div>

            </div>

          </div>

        </article>

        <!-- CARD 03: MOBILE REPORTING -->
        <article class="rpa-mobile-card">

          <div class="rpa-mobile-content">

            <span class="rpa-card-label">
              {{ features[2].number }}
              / {{ features[2].label }}
            </span>

            <h3>
              {{ features[2].title }}
            </h3>

            <p>
              {{ features[2].description }}
            </p>

          </div>

          <!-- ANIMATED PHONE -->
          <div class="rpa-phone-scene">

            <div class="rpa-phone">

              <div class="rpa-phone-island"></div>

              <div class="rpa-phone-screen">

                <div class="rpa-phone-status">
                  <strong>9:41</strong>

                  <span>
                    <i class="fa-solid fa-signal"></i>
                    <i class="fa-solid fa-wifi"></i>
                    <i class="fa-solid fa-battery-full"></i>
                  </span>
                </div>

                <!-- APP HEADER -->
                <div class="rpa-phone-brand">

                  <img
                    v-if="!logoFailed"
                    :src="logo"
                    alt="Cartinno"
                    class="rpa-phone-logo"
                    @error="logoFailed = true"
                  />

                  <strong v-else>Cartinno</strong>

                  <i class="fa-regular fa-bell"></i>
                </div>

                <div class="rpa-phone-business">
                  <span>
                    {{ mobile.businessName }}
                  </span>

                  <i class="fa-solid fa-chevron-down"></i>
                </div>

                <!-- MOBILE SALES SUMMARY -->
                <div class="rpa-phone-summary">

                  <span class="rpa-phone-eyebrow">
                    Your business today
                  </span>

                  <h4>
                    You're making
                    <em>{{ mobile.sales }}</em>
                    in sales.
                  </h4>

                  <div class="rpa-phone-connection">
                    <i class="fa-solid fa-circle-check"></i>
                    {{ mobile.status }}
                  </div>

                </div>

                <!-- METRIC CARDS -->
                <div class="rpa-phone-metrics">

                  <div>
                    <span>Total orders</span>
                    <strong>{{ mobile.orders }}</strong>
                  </div>

                  <div>
                    <span>Locations</span>
                    <strong>{{ mobile.locations }}</strong>
                  </div>

                </div>

                <!-- CHANNEL BREAKDOWN -->
                <div class="rpa-phone-channels">

                  <strong>
                    Sales by channel
                  </strong>

                  <div
                    v-for="(channel, index) in mobile.channels"
                    :key="channel.id"
                    class="rpa-phone-channel"
                    :style="{
                      '--channel-index': index
                    }"
                  >
                    <span>
                      <i class="fa-solid fa-circle"></i>
                      {{ channel.name }}
                    </span>

                    <strong>
                      {{ channel.value }}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </article>

      </div>

      <p class="rpa-demo-note">
        Illustrative reporting and analytics previews.
      </p>

    </div>
  </section>
</template>
