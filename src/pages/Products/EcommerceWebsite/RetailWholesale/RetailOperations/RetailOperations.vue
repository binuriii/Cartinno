
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './RetailOperations.css'

import {
  retailOperationsContent,
  retailOperationsCards
} from './RetailOperationsData.js'

// SCROLL REVEAL ANIMATION
const sectionRef = ref(null)
const motionReady = ref(false)
const visibleCards = ref(new Set())

let observer = null

onMounted(() => {
  const cards = sectionRef.value?.querySelectorAll('.ro-card')

  if (!cards?.length) return

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    visibleCards.value = new Set(
      retailOperationsCards.map(card => card.id)
    )
    return
  }

  observer = new IntersectionObserver(
    entries => {
      const updated = new Set(visibleCards.value)

      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        const id = Number(entry.target.dataset.cardId)

        updated.add(id)
        observer.unobserve(entry.target)
      })

      visibleCards.value = updated
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -20px 0px'
    }
  )

  cards.forEach(card => observer.observe(card))
  motionReady.value = true
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section
    ref="sectionRef"
    id="retail-operations"
    class="ro-section"
    :class="{ 'ro-motion-ready': motionReady }"
  >
    <div class="ro-container">

      <!-- CENTERED SECTION HEADER -->
      <header class="ro-header">
        <h2 class="ro-heading">
          {{ retailOperationsContent.title }}
        </h2>

        <p class="ro-description">
          {{ retailOperationsContent.description }}
        </p>
      </header>

      <!-- SIX FEATURE CARDS -->
      <div class="ro-grid">

        <article
          v-for="card in retailOperationsCards"
          :key="card.id"
          class="ro-card"
          :class="[
            `ro-card-${card.theme}`,
            {
              'ro-card-visible': visibleCards.has(card.id)
            }
          ]"
          :data-card-id="card.id"
        >

          <!-- VISUAL AREA -->
          <div
            class="ro-card-media"
            aria-hidden="true"
          >

            <!-- 01. SMART POS -->
            <div
              v-if="card.visual === 'pos'"
              class="ro-visual ro-pos-visual"
            >
              <div class="ro-mini-window">

                <div class="ro-mini-topbar">
                  <span class="ro-mini-dots">
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>

                  <span>Cartinno POS</span>

                  <i class="fa-solid fa-ellipsis"></i>
                </div>

                <div class="ro-pos-total">
                  <small>Today's Sales</small>

                  <strong>Rs. 48,250</strong>

                  <span>
                    <i class="fa-solid fa-arrow-trend-up"></i>
                    Sales Overview
                  </span>
                </div>

                <div class="ro-pos-payment">
                  <div>
                    <i class="fa-solid fa-credit-card"></i>
                    Card Payment
                  </div>

                  <span>Rs. 12,500</span>
                </div>

                <div class="ro-pos-payment">
                  <div>
                    <i class="fa-solid fa-money-bill"></i>
                    Cash Payment
                  </div>

                  <span>Rs. 8,200</span>
                </div>

              </div>
            </div>

            <!-- 02. INVENTORY MANAGEMENT -->
            <div
              v-else-if="card.visual === 'inventory'"
              class="ro-visual ro-inventory-visual"
            >
              <div class="ro-mini-window">

                <div class="ro-mini-topbar">
                  <span>Inventory Overview</span>
                  <i class="fa-solid fa-box"></i>
                </div>

                <div class="ro-stock-summary">
                  <div class="ro-stock-icon">
                    <i class="fa-solid fa-boxes-stacked"></i>
                  </div>

                  <div>
                    <small>Total Products</small>
                    <strong>1,248</strong>
                  </div>
                </div>

                <div class="ro-stock-row">
                  <span>Product A</span>

                  <div class="ro-stock-track">
                    <i style="width: 80%"></i>
                  </div>

                  <b>80%</b>
                </div>

                <div class="ro-stock-row">
                  <span>Product B</span>

                  <div class="ro-stock-track">
                    <i style="width: 55%"></i>
                  </div>

                  <b>55%</b>
                </div>

                <div class="ro-stock-row">
                  <span>Product C</span>

                  <div class="ro-stock-track">
                    <i style="width: 22%"></i>
                  </div>

                  <b>22%</b>
                </div>

              </div>
            </div>

            <!-- 03. MULTI-LOCATION -->
            <div
              v-else-if="card.visual === 'locations'"
              class="ro-visual ro-locations-visual"
            >
              <div class="ro-mini-window">

                <div class="ro-mini-topbar">
                  <span>Branch Overview</span>
                  <i class="fa-solid fa-location-dot"></i>
                </div>

                <div class="ro-branch-row">
                  <div class="ro-branch-icon">
                    <i class="fa-solid fa-store"></i>
                  </div>

                  <div>
                    <strong>Main Branch</strong>
                    <small>Colombo</small>
                  </div>

                  <span class="ro-status">Active</span>
                </div>

                <div class="ro-branch-row">
                  <div class="ro-branch-icon">
                    <i class="fa-solid fa-store"></i>
                  </div>

                  <div>
                    <strong>Branch 02</strong>
                    <small>Kandy</small>
                  </div>

                  <span class="ro-status">Active</span>
                </div>

                <div class="ro-branch-row">
                  <div class="ro-branch-icon">
                    <i class="fa-solid fa-store"></i>
                  </div>

                  <div>
                    <strong>Branch 03</strong>
                    <small>Galle</small>
                  </div>

                  <span class="ro-status">Active</span>
                </div>

              </div>
            </div>

            <!-- 04. CUSTOMER MANAGEMENT -->
            <div
              v-else-if="card.visual === 'customers'"
              class="ro-visual ro-customers-visual"
            >
              <div class="ro-mini-window">

                <div class="ro-mini-topbar">
                  <span>Customer Profile</span>
                  <i class="fa-solid fa-user-group"></i>
                </div>

                <div class="ro-customer-profile">
                  <div class="ro-customer-avatar">
                    JD
                  </div>

                  <div>
                    <strong>Sample Customer</strong>
                    <small>Loyalty Member</small>
                  </div>

                  <i class="fa-solid fa-circle-check"></i>
                </div>

                <div class="ro-customer-stats">
                  <div>
                    <small>Total Orders</small>
                    <strong>24</strong>
                  </div>

                  <div>
                    <small>Reward Points</small>
                    <strong>480</strong>
                  </div>
                </div>

                <div class="ro-customer-offer">
                  <i class="fa-solid fa-gift"></i>
                  Loyalty rewards available
                </div>

              </div>
            </div>

            <!-- 05. WHOLESALE MANAGEMENT -->
            <div
              v-else-if="card.visual === 'wholesale'"
              class="ro-visual ro-wholesale-visual"
            >
              <div class="ro-mini-window">

                <div class="ro-mini-topbar">
                  <span>Wholesale Orders</span>
                  <i class="fa-solid fa-truck"></i>
                </div>

                <div class="ro-order-heading">
                  <div>
                    <small>Order Reference</small>
                    <strong>#WH-2048</strong>
                  </div>

                  <span class="ro-order-badge">
                    Processing
                  </span>
                </div>

                <div class="ro-order-line">
                  <span>Bulk Product A</span>
                  <strong>× 50</strong>
                </div>

                <div class="ro-order-line">
                  <span>Bulk Product B</span>
                  <strong>× 100</strong>
                </div>

                <div class="ro-order-progress">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <small class="ro-order-caption">
                  Order → Packing → Delivery
                </small>

              </div>
            </div>

            <!-- 06. REPORTS & ANALYTICS -->
            <div
              v-else
              class="ro-visual ro-analytics-visual"
            >
              <div class="ro-mini-window">

                <div class="ro-mini-topbar">
                  <span>Sales Analytics</span>
                  <i class="fa-solid fa-chart-column"></i>
                </div>

                <div class="ro-analytics-total">
                  <small>Revenue Overview</small>
                  <strong>Rs. 285,400</strong>
                </div>

                <div class="ro-chart">
                  <span style="--bar-height: 35%"></span>
                  <span style="--bar-height: 58%"></span>
                  <span style="--bar-height: 42%"></span>
                  <span style="--bar-height: 75%"></span>
                  <span style="--bar-height: 55%"></span>
                  <span style="--bar-height: 88%"></span>
                  <span style="--bar-height: 70%"></span>
                </div>

                <div class="ro-chart-labels">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>

              </div>
            </div>

          </div>

          <!-- CARD INFORMATION -->
          <div class="ro-card-content">

            <div class="ro-card-meta">
              <span class="ro-card-number">
                {{ card.number }}
              </span>

              <span class="ro-feature-icon">
                <i
                  :class="card.icon"
                  aria-hidden="true"
                ></i>
              </span>
            </div>

            <h3 class="ro-card-title">
              {{ card.title }}
            </h3>

            <p class="ro-card-description">
              {{ card.description }}
            </p>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
