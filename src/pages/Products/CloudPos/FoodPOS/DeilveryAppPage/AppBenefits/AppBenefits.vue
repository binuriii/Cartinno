<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  appBenefitsBrand,
  appBenefitsContent,
  appBenefits,
  notificationExamples,
  promotionPreview,
  repeatPurchasePreview
} from './AppBenefitsData.js'

import './AppBenefits.css'

const sectionRef = ref(null)
const isVisible = ref(false)

const logoFailed = ref(false)
const productImageFailed = ref(false)

let observer = null

onMounted(() => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    entries => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    {
      threshold: 0.12
    }
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
    class="ab-section"
    :class="{ 'ab-visible': isVisible }"
    id="app-benefits"
  >
    <div class="ab-container">

      <!-- SECTION HEADER -->
      <header class="ab-header">
        <h2 class="ab-title">
          {{ appBenefitsContent.title }}
        </h2>
        <p class="ab-description">
          {{ appBenefitsContent.description }}
        </p>
      </header>

      <!-- MAIN BLUE CARD -->
      <article class="ab-main-card">

        <!-- ANIMATED NOTIFICATIONS -->
        <div class="ab-notifications">
          <div class="ab-notification-stack">

            <div class="ab-notification-topbar">
              <span>
                <i class="fa-solid fa-satellite-dish"></i>
                Live Status Updates
              </span>
              <span class="ab-notification-live">
                <i></i> Connected
              </span>
            </div>

            <div
              v-for="(notification, index) in notificationExamples"
              :key="notification.id"
              class="ab-notification"
              :style="{
                '--notification-index': index
              }"
            >
              <span class="ab-notification-icon">
                <i
                  :class="notification.icon"
                  aria-hidden="true"
                ></i>
              </span>

              <div class="ab-notification-copy">
                <div class="ab-notification-heading">
                  <strong>{{ notification.title }}</strong>
                  <small>{{ notification.time }}</small>
                </div>
                <p>{{ notification.message }}</p>
              </div>
            </div>

          </div>
          <span class="ab-preview-note">
            Real-time fleet activity
          </span>
        </div>

        <!-- MAIN CONTENT -->
        <div class="ab-main-content">
          <span class="ab-label">
            {{ appBenefits.main.label }}
          </span>
          <h3>
            {{ appBenefits.main.title }}
          </h3>
          <p>
            {{ appBenefits.main.description }}
          </p>
        </div>

      </article>

      <!-- BOTTOM TWO CARDS -->
      <div class="ab-bottom-grid">

        <!-- GREEN CARD: DISPATCH -->
        <article class="ab-info-card ab-promotions-card">
          <div class="ab-info-content">
            <span class="ab-label">
              {{ appBenefits.promotions.label }}
            </span>
            <h3>
              {{ appBenefits.promotions.title }}
            </h3>
            <p>
              {{ appBenefits.promotions.description }}
            </p>
          </div>

          <!-- CAMPAIGN PREVIEW -->
          <div class="ab-campaign-preview">
            <div class="ab-campaign-header">
              <span class="ab-campaign-header-icon">
                <i class="fa-solid fa-route"></i>
              </span>
              <div>
                <strong>{{ promotionPreview.campaign }}</strong>
                <small>Auto-dispatch system</small>
              </div>
              <span class="ab-campaign-status">
                <i class="fa-solid fa-bolt"></i> Ready
              </span>
            </div>

            <div class="ab-campaign-offer">
              <span class="ab-campaign-eyebrow">
                STATUS
              </span>
              <strong>{{ promotionPreview.offer }}</strong>
              <p>{{ promotionPreview.subtitle }}</p>
              <span class="ab-campaign-gift" aria-hidden="true">
                <i class="fa-solid fa-box"></i>
              </span>
            </div>

            <div class="ab-campaign-message">
              <span class="ab-campaign-message-icon">
                <i class="fa-regular fa-bell"></i>
              </span>
              <div>
                <strong>{{ promotionPreview.message }}</strong>
                <small>{{ promotionPreview.audience }}</small>
              </div>
            </div>

            <div class="ab-campaign-footer">
              <span>
                <i class="fa-regular fa-clock"></i>
                {{ promotionPreview.status }}
              </span>
              <span>
                <i class="fa-solid fa-check-circle"></i>
                System optimized
              </span>
            </div>
          </div>
        </article>

        <!-- YELLOW CARD: CUSTOMER TRACKING -->
        <article class="ab-info-card ab-purchases-card">
          <div class="ab-info-content">
            <span class="ab-label">
              {{ appBenefits.purchases.label }}
            </span>
            <h3>
              {{ appBenefits.purchases.title }}
            </h3>
            <p>
              {{ appBenefits.purchases.description }}
            </p>
          </div>

          <!-- PHONE MOCKUP -->
          <div class="ab-phone-scene">
            <div class="ab-phone">
              <div class="ab-phone-notch"></div>
              <div class="ab-phone-screen">
                
                <div class="ab-phone-header">
                  <img
                    v-if="!logoFailed"
                    :src="appBenefitsBrand.logo"
                    :alt="appBenefitsBrand.name"
                    class="ab-cartinno-logo"
                    @error="logoFailed = true"
                  />
                  <strong v-else class="ab-brand-fallback">
                    {{ appBenefitsBrand.name }}
                  </strong>
                </div>

                <img
                  v-if="!productImageFailed"
                  :src="repeatPurchasePreview.productImage"
                  alt="Delivery Map"
                  class="ab-product-image"
                  loading="lazy"
                  @error="productImageFailed = true"
                />
                <div v-else class="ab-product-image-fallback">
                  <i class="fa-solid fa-map-location-dot"></i>
                </div>

                <div class="ab-phone-body">
                  <span class="ab-phone-eyebrow">
                    {{ repeatPurchasePreview.eyebrow }}
                  </span>
                  <h4>{{ repeatPurchasePreview.title }}</h4>
                  <p>{{ repeatPurchasePreview.description }}</p>
                  <span class="ab-phone-button">
                    {{ repeatPurchasePreview.button }}
                    <i class="fa-solid fa-location-crosshairs"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- FLOATING NOTIFICATION -->
            <div class="ab-floating-notification">
              <div class="ab-floating-top">
                <span class="ab-floating-icon">
                  <i class="fa-solid fa-motorcycle"></i>
                </span>
                <img
                  v-if="!logoFailed"
                  :src="appBenefitsBrand.logo"
                  :alt="appBenefitsBrand.name"
                  class="ab-floating-logo"
                  @error="logoFailed = true"
                />
                <small>Now</small>
              </div>
              <strong>{{ repeatPurchasePreview.notificationTitle }}</strong>
              <p>{{ repeatPurchasePreview.notificationMessage }}</p>
            </div>

          </div>
        </article>

      </div>
    </div>
  </section>
</template>