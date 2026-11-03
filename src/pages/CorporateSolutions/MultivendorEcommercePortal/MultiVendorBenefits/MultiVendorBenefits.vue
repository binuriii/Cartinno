
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  multiVendorBenefitsContent as content,
  multiVendorBenefits as benefits
} from './MultiVendorBenefitsData.js'

import './MultiVendorBenefits.css'

const sectionRef = ref(null)
const inView = ref(false)

let observer = null

onMounted(() => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    inView.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return

      inView.value = true
      observer?.disconnect()
      observer = null
    },
    { threshold: 0.08 }
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
    class="mvb-section"
    :class="{ 'mvb-visible': inView }"
    aria-labelledby="mvb-heading"
  >
    <div class="mvb-shell">

      <!-- SECTION HEADING -->
      <header class="mvb-heading">
        <h2 id="mvb-heading">
          {{ content.heading }}
        </h2>

        <p>{{ content.description }}</p>
      </header>

      <!-- BENEFIT CARDS -->
      <div class="mvb-grid">

        <article
          v-for="(benefit, index) in benefits"
          :key="benefit.id"
          class="mvb-reveal"
          :style="{ '--mvb-delay': `${index * 100}ms` }"
        >
          <div
            class="mvb-card"
            :class="`mvb-card--${benefit.id}`"
          >

            <!-- CARD COPY -->
            <div class="mvb-card-copy">

              <div class="mvb-card-topline">
                <span class="mvb-number">
                  {{ benefit.number }}
                </span>

                <span class="mvb-label">
                  {{ benefit.label }}
                </span>
              </div>

              <h3>{{ benefit.title }}</h3>

            </div>

            <!-- CHECKOUT PREVIEW -->
            <div
              v-if="benefit.id === 'checkout'"
              class="mvb-preview mvb-checkout-preview"
              aria-hidden="true"
            >
              <div class="mvb-preview-header">
                <span class="mvb-preview-brand">
                  cartinno<span>.</span>
                </span>
                <span class="mvb-preview-step">CHECKOUT</span>
              </div>

              <div class="mvb-preview-body">
                <div class="mvb-preview-heading">
                  <strong>Complete your order</strong>
                  <span>Step 2 of 2</span>
                </div>

                <div class="mvb-checkout-item">
                  <div class="mvb-product-thumbnail">
                    <i class="fa-solid fa-box"></i>
                  </div>

                  <div class="mvb-product-info">
                    <strong>Your shopping bag</strong>
                    <span>Items ready for checkout</span>
                  </div>

                  <strong class="mvb-product-price">$48.00</strong>
                </div>

                <div class="mvb-checkout-line">
                  <span>Subtotal</span>
                  <strong>$48.00</strong>
                </div>

                <div class="mvb-checkout-line">
                  <span>Delivery</span>
                  <strong>Free</strong>
                </div>

                <div class="mvb-checkout-total">
                  <span>Total</span>
                  <strong>$48.00</strong>
                </div>

                <div class="mvb-checkout-button">
                  Continue to payment
                  <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <!-- RESPONSIVE DESIGN PREVIEW -->
            <div
              v-else-if="benefit.id === 'responsive'"
              class="mvb-preview mvb-responsive-preview"
              aria-hidden="true"
            >
              <div class="mvb-preview-header">
                <span class="mvb-preview-brand">
                  cartinno<span>.</span>
                </span>
                <span class="mvb-preview-step">ONLINE STORE</span>
              </div>

              <div class="mvb-device-stage">

                <div class="mvb-desktop-device">
                  <div class="mvb-device-screen">
                    <div class="mvb-store-nav">
                      <strong>THE STORE</strong>
                      <span>Home&nbsp;&nbsp; Shop&nbsp;&nbsp; About</span>
                      <i class="fa-solid fa-bag-shopping"></i>
                    </div>

                    <div class="mvb-store-content">
                      <div>
                        <small>NEW COLLECTION</small>
                        <strong>Find your next favourite.</strong>
                        <span class="mvb-store-button">Explore now</span>
                      </div>

                      <div class="mvb-store-image">
                        <i class="fa-solid fa-shirt"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mvb-mobile-device">
                  <div class="mvb-mobile-notch"></div>

                  <div class="mvb-mobile-screen">
                    <div class="mvb-mobile-nav">
                      <strong>STORE</strong>
                      <i class="fa-solid fa-bars"></i>
                    </div>

                    <div class="mvb-mobile-image">
                      <i class="fa-solid fa-shirt"></i>
                    </div>

                    <strong>New arrivals</strong>
                    <span>Explore the collection</span>

                    <div class="mvb-mobile-button">
                      Shop now
                    </div>
                  </div>
                </div>

              </div>

              <div class="mvb-responsive-caption">
                <i class="fa-solid fa-desktop"></i>
                <span>Desktop</span>
                <i class="fa-solid fa-mobile-screen"></i>
                <span>Mobile</span>
              </div>
            </div>

            <!-- CUSTOMER LOYALTY PREVIEW -->
            <div
              v-else-if="benefit.id === 'loyalty'"
              class="mvb-preview mvb-loyalty-preview"
              aria-hidden="true"
            >
              <div class="mvb-preview-header">
                <span class="mvb-preview-brand">
                  cartinno<span>.</span>
                </span>
                <span class="mvb-preview-step">LOYALTY</span>
              </div>

              <div class="mvb-preview-body">
                <div class="mvb-loyalty-welcome">
                  <div>
                    <small>WELCOME BACK</small>
                    <strong>Your rewards</strong>
                  </div>

                  <span class="mvb-loyalty-avatar">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>

                <div class="mvb-points-card">
                  <span>YOUR REWARD POINTS</span>
                  <strong>2,450 <small>pts</small></strong>

                  <div class="mvb-points-progress">
                    <span></span>
                  </div>

                  <small>You're getting closer to your next reward</small>
                </div>

                <div class="mvb-reward-heading">
                  <strong>Available rewards</strong>
                  <span>View all</span>
                </div>

                <div class="mvb-reward-item">
                  <span class="mvb-reward-icon">
                    <i class="fa-solid fa-gift"></i>
                  </span>

                  <div>
                    <strong>Special reward</strong>
                    <small>Redeem your points</small>
                  </div>

                  <i class="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>

            <!-- INVENTORY MANAGEMENT PREVIEW -->
            <div
              v-else
              class="mvb-preview mvb-inventory-preview"
              aria-hidden="true"
            >
              <div class="mvb-preview-header">
                <span class="mvb-preview-brand">
                  cartinno<span>.</span>
                </span>
                <span class="mvb-preview-step">INVENTORY</span>
              </div>

              <div class="mvb-preview-body">
                <div class="mvb-inventory-heading">
                  <strong>Inventory overview</strong>
                  <span>Live overview</span>
                </div>

                <div class="mvb-inventory-stats">
                  <div>
                    <small>Total products</small>
                    <strong>1,248</strong>
                  </div>

                  <div>
                    <small>In stock</small>
                    <strong>1,106</strong>
                  </div>
                </div>

                <div class="mvb-stock-heading">
                  <strong>Stock levels</strong>
                  <span>View report ↗</span>
                </div>

                <div class="mvb-stock-list">
                  <div class="mvb-stock-row">
                    <span class="mvb-stock-icon">
                      <i class="fa-solid fa-box"></i>
                    </span>

                    <div class="mvb-stock-info">
                      <strong>Product A</strong>
                      <span>Available stock</span>
                    </div>

                    <span class="mvb-stock-status">
                      In stock
                    </span>
                  </div>

                  <div class="mvb-stock-row">
                    <span class="mvb-stock-icon">
                      <i class="fa-solid fa-box-open"></i>
                    </span>

                    <div class="mvb-stock-info">
                      <strong>Product B</strong>
                      <span>Limited quantity</span>
                    </div>

                    <span class="mvb-stock-status mvb-stock-low">
                      Low stock
                    </span>
                  </div>

                  <div class="mvb-stock-row">
                    <span class="mvb-stock-icon">
                      <i class="fa-solid fa-cube"></i>
                    </span>

                    <div class="mvb-stock-info">
                      <strong>Product C</strong>
                      <span>Available stock</span>
                    </div>

                    <span class="mvb-stock-status">
                      In stock
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </article>

      </div>

    </div>
  </section>
</template>
