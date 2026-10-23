
<script setup>
import { ref, computed } from 'vue'

import {
  marketplaceHowItWorksContent,
  marketplaceHowItWorksSteps,
  marketplaceDemoProducts
} from './MarketplaceHowItWorksData.js'

import './MarketplaceHowItWorks.css'

const activeStep = ref(0)
const steps = marketplaceHowItWorksSteps
const products = marketplaceDemoProducts

const currentStep = computed(() => steps[activeStep.value])

function selectStep(index) {
  activeStep.value = index
}

function nextStep() {
  activeStep.value = (activeStep.value + 1) % steps.length
}

const brokenImages = ref(new Set())

function imageError(id) {
  brokenImages.value = new Set([
    ...brokenImages.value,
    id
  ])
}

function imageAvailable(product) {
  return product.image && !brokenImages.value.has(product.id)
}
</script>

<template>
  <section
    class="mhw-section"
    id="marketplace-how-it-works"
  >
    <div class="mhw-container">

      <!-- MAIN HEADER -->
      <header class="mhw-header">
        <div>

          <h2 class="mhw-heading">
            {{ marketplaceHowItWorksContent.title }}
          </h2>
        </div>

        <p class="mhw-intro">
          {{ marketplaceHowItWorksContent.description }}
        </p>
      </header>

      <!-- TWO LARGE PANELS -->
      <div class="mhw-grid">

        <!-- LEFT: BLUE EXPERIENCE PANEL -->
        <article class="mhw-panel mhw-panel-blue">

          <div class="mhw-panel-top">
            <div class="mhw-panel-copy">

              <h3>
                Your store.
                <br />
                More ways to sell.
              </h3>

              <p>
                Bring your selling channels together
                and create new opportunities for your
                products.
              </p>
            </div>
          </div>

          <!-- FLOATING NETWORK ILLUSTRATION -->
          <div class="mhw-blue-visual">

            <div class="mhw-glow mhw-glow-one"></div>
            <div class="mhw-glow mhw-glow-two"></div>

            <div class="mhw-network-window">

              <div class="mhw-window-bar">
                <span class="mhw-window-brand">
                  <i class="fa-solid fa-store"></i>
                   Store
                </span>

                <span class="mhw-window-dots">
                  <i></i><i></i><i></i>
                </span>
              </div>

              <div class="mhw-network-center">
                <div class="mhw-center-icon">
                  <i class="fa-solid fa-bag-shopping"></i>
                </div>

                <strong>Your online store</strong>
                <small>Connected selling</small>
              </div>

              <div class="mhw-channel-row">
                <div class="mhw-channel">
                  <i class="fa-solid fa-store"></i>
                  Marketplace A
                </div>

                <div class="mhw-channel">
                  <i class="fa-solid fa-basket-shopping"></i>
                  Marketplace B
                </div>
              </div>

              <div class="mhw-network-line"></div>

            </div>

            <!-- FLOATING NOTIFICATION -->
            <Transition name="mhw-notification" mode="out-in">
              <div
                :key="currentStep.id"
                class="mhw-floating-notice"
              >
                <span class="mhw-notice-icon">
                  <i class="fa-solid fa-circle-check"></i>
                </span>

                <div>
                  <strong>{{ currentStep.status }}</strong>
                  <span>Powered by Cartinno</span>
                </div>
              </div>
            </Transition>

          </div>

        </article>

        <!-- RIGHT: MANAGEMENT PANEL -->
        <article class="mhw-panel mhw-panel-light">

          <div class="mhw-panel-top">
            <div class="mhw-panel-copy">

              <h3>
                Selling made
                <br />
                more connected.
              </h3>

              <p>
                From product listings to marketplace
                orders, keep your business organized
                in one place.
              </p>
            </div>
          </div>

          <!-- DASHBOARD ILLUSTRATION -->
          <div class="mhw-light-visual">

            <div class="mhw-dashboard">

              <div class="mhw-dashboard-top">
                <div class="mhw-dashboard-logo">
                  <span class="mhw-dashboard-mark">C</span>
                  <span>Cartinno</span>
                </div>

                <div class="mhw-dashboard-actions">
                  <i class="fa-regular fa-bell"></i>
                  <span class="mhw-dashboard-avatar">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="mhw-dashboard-body">

                <div class="mhw-dashboard-heading">
                  <div>
                    <small>Marketplace overview</small>
                    <strong>
                      {{ currentStep.shortTitle }}
                      your business
                    </strong>
                  </div>

                  <span class="mhw-live-pill">
                    <i></i>
                    Connected
                  </span>
                </div>

                <!-- DEMO PRODUCTS -->
                <div class="mhw-product-grid">
                  <div
                    v-for="product in products"
                    :key="product.id"
                    class="mhw-product"
                  >
                    <div class="mhw-product-photo">
                      <img
                        v-if="imageAvailable(product)"
                        :src="product.image"
                        :alt="product.name"
                        loading="lazy"
                        @error="imageError(product.id)"
                      />

                      <i
                        v-else
                        class="fa-solid fa-box"
                      ></i>
                    </div>

                    <strong>{{ product.name }}</strong>
                    <span>{{ product.price }}</span>
                  </div>
                </div>

                <!-- ORDER SUMMARY -->
                <div class="mhw-summary">
                  <div class="mhw-summary-icon">
                    <i class="fa-solid fa-chart-line"></i>
                  </div>

                  <div>
                    <small>Marketplace activity</small>
                    <strong>Orders and sales connected</strong>
                  </div>

                  <span class="mhw-summary-check">
                    <i class="fa-solid fa-check"></i>
                  </span>
                </div>

              </div>

            </div>

            <!-- SECOND FLOATING CARD -->
            <div class="mhw-floating-order">
              <span class="mhw-order-icon">
                <i class="fa-solid fa-check"></i>
              </span>

              <div>
                <strong>Order received</strong>
                <small>Connected to your store</small>
              </div>
            </div>

          </div>

        </article>
      </div>

      <!-- THREE STEP SELECTORS -->
      <div class="mhw-steps">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          type="button"
          class="mhw-step"
          :class="{ 'mhw-step-active': activeStep === index }"
          :aria-pressed="activeStep === index"
          @click="selectStep(index)"
        >
          <span class="mhw-step-number">
            {{ step.number }}
          </span>

          <span class="mhw-step-content">
            <strong>{{ step.title }}</strong>
            <span>{{ step.description }}</span>
          </span>

        </button>
      </div>

    </div>
  </section>
</template>
