<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './AboutUnique.css'

import {
  aboutUniqueContent,
  aboutUniqueCards,
  aboutUniqueDemo
} from './AboutUniqueData.js'

const sectionRef = ref(null)
const visible = ref(false)

let observer = null

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.12 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="auu-section"
    :class="{ 'auu-visible': visible }"
    aria-labelledby="auu-heading"
  >
    <div class="auu-container">
      <header class="auu-header">
        <h2 id="auu-heading" class="auu-heading">
          {{ aboutUniqueContent.title }}
        </h2>

        <p class="auu-description">
          {{ aboutUniqueContent.description }}
        </p>
      </header>

      <div class="auu-grid">
        <article
          v-for="(card, index) in aboutUniqueCards"
          :key="card.id"
          class="auu-card"
          :class="[
            `auu-card--${card.id}`,
            { 'auu-card--dark': card.id === 'flexibility' }
          ]"
          :style="{ '--auu-index': index }"
        >
          <div class="auu-card-copy">

            <h3 class="auu-card-title">
              {{ card.title }}
            </h3>

            <p class="auu-card-description">
              {{ card.description }}
            </p>
          </div>

          <!-- CARD 01: PRODUCT GROWTH -->
          <div
            v-if="card.id === 'growth'"
            class="auu-demo auu-growth-demo"
            aria-label="Illustrative product inventory interface"
          >
            <div class="auu-demo-top">
              <div class="auu-demo-brand">
                <img
                    class="auu-logo"
                    :src="aboutUniqueDemo.logo"
                    alt="Cartinno"
                />
              </div>

              <span class="auu-demo-top-label">STORE OVERVIEW</span>

              <span class="auu-demo-avatar">C</span>
            </div>

            <div class="auu-demo-body">
              <div class="auu-demo-heading">
                <div>
                  <small>{{ aboutUniqueDemo.growth.label }}</small>
                  <h4>{{ aboutUniqueDemo.growth.title }}</h4>
                </div>

                <span class="auu-live-status">
                  <span></span>
                  Live preview
                </span>
              </div>

              <div class="auu-growth-summary">
                <div>
                  <span>{{ aboutUniqueDemo.growth.totalLabel }}</span>
                  <strong>{{ aboutUniqueDemo.growth.total }}</strong>
                </div>

                <div class="auu-growth-summary-icon">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 17 10 11l4 4 6-8"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 7h6v6"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div class="auu-inventory">
                <div class="auu-inventory-header">
                  <strong>Product inventory</strong>
                  <span>View all <span aria-hidden="true">↗</span></span>
                </div>

                <div
                  v-for="(item, i) in aboutUniqueDemo.growth.products"
                  :key="item.name"
                  class="auu-inventory-row"
                  :style="{ '--stock-index': i }"
                >
                  <span
                    class="auu-stock-art"
                    :class="`auu-stock-art--${i + 1}`"
                    aria-hidden="true"
                  >
                    <svg
                      v-if="i === 0"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="m4.5 7.7 7.5 4.4 7.5-4.4M12 12v8.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <svg
                      v-else-if="i === 1"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 8h16v12H4zM3 4h18v4H3z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 12h6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>

                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 8.5 12 4l7 4.5v11H5v-11Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 19.5v-7h6v7M5 8.5h14"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>

                  <div class="auu-stock-copy">
                    <strong>{{ item.name }}</strong>

                    <small>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="m3.5 8 3 3 6-6"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {{ item.status }}
                    </small>
                  </div>

                  <span class="auu-stock-count">
                    {{ item.quantity }}
                  </span>
                </div>
              </div>
            </div>

            <div class="auu-demo-footer">
              <span class="auu-footer-dot"></span>
              An illustrative store preview
              <span class="auu-footer-arrow">↗</span>
            </div>
          </div>

          <!-- CARD 02: PAYMENT FLEXIBILITY -->
          <div
            v-else-if="card.id === 'flexibility'"
            class="auu-demo auu-payment-demo"
            aria-label="Illustrative payment integration interface"
          >
            <div class="auu-demo-top">
              <div class="auu-demo-brand">
                <img
                    class="auu-logo"
                    :src="aboutUniqueDemo.logo"
                    alt="Cartinno"
                />
                </div>

              <span class="auu-demo-top-label">INTEGRATIONS</span>

              <span class="auu-demo-avatar">C</span>
            </div>

            <div class="auu-demo-body">
              <div class="auu-demo-heading">
                <div>
                  <small>{{ aboutUniqueDemo.flexibility.label }}</small>
                  <h4>{{ aboutUniqueDemo.flexibility.title }}</h4>
                </div>

                <span class="auu-integration-status">
                  <span></span>
                  Connected
                </span>
              </div>

              <div class="auu-payment-intro">
                <div class="auu-payment-intro-icon">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="3"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                    <path
                      d="M3 10h18M7 15h4"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <strong>Accept payments your way</strong>
                  <span>Explore supported payment options</span>
                </div>
              </div>

              <div class="auu-provider-list">
                <div
                  v-for="(provider, i) in aboutUniqueDemo.flexibility.providers"
                  :key="provider"
                  class="auu-provider"
                  :style="{ '--provider-index': i }"
                >
                  <div
                    class="auu-provider-logo"
                    :class="`auu-provider-logo--${i + 1}`"
                  >
                    <svg
                      v-if="provider === 'Visa'"
                      viewBox="0 0 48 24"
                      role="img"
                      aria-label="Visa"
                    >
                      <text
                        x="2"
                        y="19"
                        font-size="21"
                        font-weight="800"
                        font-style="italic"
                        fill="currentColor"
                      >VISA</text>
                    </svg>

                    <svg
                      v-else-if="provider === 'Mastercard'"
                      viewBox="0 0 48 30"
                      role="img"
                      aria-label="Mastercard"
                    >
                      <circle cx="18" cy="15" r="12" fill="#EB001B" />
                      <circle cx="30" cy="15" r="12" fill="#F79E1B" />
                      <path
                        d="M24 5.2a12 12 0 0 1 0 19.6 12 12 0 0 1 0-19.6Z"
                        fill="#FF5F00"
                      />
                    </svg>

                    <svg
                      v-else
                      viewBox="0 0 32 32"
                      fill="none"
                      role="img"
                      aria-label="Payment gateway integration"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="26"
                        height="26"
                        rx="8"
                        fill="#E8EFE5"
                      />
                      <path
                        d="M9 16h14M17 10l6 6-6 6"
                        stroke="#71876A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>

                  <div class="auu-provider-copy">
                    <strong>{{ provider }}</strong>
                    <small>Payment option</small>
                  </div>

                  <span class="auu-provider-check" aria-label="Supported">
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="m4 10 4 4 8-8"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div class="auu-payment-note">
                <span class="auu-payment-note-icon">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M10 2.5 16 5v4.6c0 3.7-2.5 6.5-6 7.9-3.5-1.4-6-4.2-6-7.9V5l6-2.5Z"
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linejoin="round"
                    />
                    <path
                      d="m7 9.8 2 2 4-4"
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>

                <span>{{ aboutUniqueDemo.flexibility.footer }}</span>
              </div>
            </div>

            <div class="auu-demo-footer auu-demo-footer--dark">
              <span class="auu-footer-dot"></span>
              Built for flexible commerce
              <span class="auu-footer-arrow">↗</span>
            </div>
          </div>

          <!-- CARD 03: INVENTORY, PAYMENT AND SHIPPING CONTROL -->
          <div
            v-else
            class="auu-demo auu-control-demo"
            aria-label="Illustrative inventory, payment and shipping interface"
          >
            <div class="auu-demo-top">
              <div class="auu-demo-brand">
                <img
                    class="auu-logo"
                    :src="aboutUniqueDemo.logo"
                    alt="Cartinno"
                />
                </div>

              <span class="auu-demo-top-label">STORE OPERATIONS</span>

              <span class="auu-demo-avatar">C</span>
            </div>

            <div class="auu-demo-body">
              <div class="auu-demo-heading">
                <div>
                  <small>{{ aboutUniqueDemo.control.label }}</small>
                  <h4>Everything in sync</h4>
                </div>

                <span class="auu-live-status">
                  <span></span>
                  Overview
                </span>
              </div>

              <div class="auu-inventory auu-control-inventory">
                <div class="auu-inventory-header">
                  <strong>Stock at a glance</strong>
                  <span>Sample data</span>
                </div>

                <div
                  v-for="(item, i) in aboutUniqueDemo.control.inventory"
                  :key="item.name"
                  class="auu-inventory-row"
                  :style="{ '--stock-index': i }"
                >
                  <span
                    class="auu-stock-art"
                    :class="`auu-stock-art--${i + 1}`"
                    aria-hidden="true"
                  >
                    <svg
                      v-if="i === 0"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="m4.5 7.7 7.5 4.4 7.5-4.4M12 12v8.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <svg
                      v-else-if="i === 1"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 8h16v12H4zM3 4h18v4H3z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 12h6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>

                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 8.5 12 4l7 4.5v11H5v-11Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 19.5v-7h6v7M5 8.5h14"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>

                  <div class="auu-stock-copy">
                    <strong>{{ item.name }}</strong>

                    <small>
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="m3.5 8 3 3 6-6"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {{ item.status }}
                    </small>
                  </div>

                  <span class="auu-stock-count">
                    {{ item.quantity }}
                  </span>
                </div>
              </div>

              <div class="auu-operations">
                <div class="auu-operation auu-operation--payment">
                  <span class="auu-operation-symbol" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="3"
                        stroke="currentColor"
                        stroke-width="1.6"
                      />
                      <path
                        d="M3 10h18M7 15h4"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>

                  <div>
                    <small>CHECKOUT</small>
                    <strong>{{ aboutUniqueDemo.control.payment }}</strong>
                  </div>

                  <span class="auu-operation-arrow" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 15 15 5M6 5h9v9"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div class="auu-operation auu-operation--shipping">
                  <span
                    class="auu-operation-symbol auu-operation-symbol--ship"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 6h11v11H3zM14 10h4l3 4v3h-7"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linejoin="round"
                      />
                      <circle
                        cx="7.5"
                        cy="18"
                        r="2"
                        fill="#ffffff"
                        stroke="currentColor"
                        stroke-width="1.6"
                      />
                      <circle
                        cx="17.5"
                        cy="18"
                        r="2"
                        fill="#ffffff"
                        stroke="currentColor"
                        stroke-width="1.6"
                      />
                    </svg>
                  </span>

                  <div>
                    <small>FULFILMENT</small>
                    <strong>{{ aboutUniqueDemo.control.shipping }}</strong>
                  </div>

                  <span class="auu-operation-arrow" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 15 15 5M6 5h9v9"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div class="auu-demo-footer">
              <span class="auu-footer-dot"></span>
              A connected store workflow
              <span class="auu-footer-arrow">↗</span>
            </div>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>