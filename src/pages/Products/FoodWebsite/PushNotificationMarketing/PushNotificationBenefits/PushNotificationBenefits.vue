
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  pushNotificationBrand,
  pushNotificationBenefitsContent,
  pushNotificationBenefits,
  notificationExamples,
  promotionPreview,
  repeatPurchasePreview
} from './PushNotificationBenefitsData.js'

import './PushNotificationBenefits.css'

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
    class="pnb-section"
    :class="{ 'pnb-visible': isVisible }"
    id="push-notification-benefits"
  >
    <div class="pnb-container">

      <!-- SECTION HEADER -->
      <header class="pnb-header">

        <h2 class="pnb-title">
          {{ pushNotificationBenefitsContent.title }}
        </h2>

        <p class="pnb-description">
          {{ pushNotificationBenefitsContent.description }}
        </p>

      </header>

      <!-- =====================================
           MAIN BLUE CARD
      ====================================== -->
      <article class="pnb-main-card">

        <!-- ANIMATED NOTIFICATIONS -->
        <div class="pnb-notifications">

          <div class="pnb-notification-stack">

            <!-- NOTIFICATION HEADER -->
            <div class="pnb-notification-topbar">

              <span>
                <i class="fa-regular fa-bell"></i>
                Push Notifications
              </span>

              <span class="pnb-notification-live">
                <i></i>
                Connected
              </span>

            </div>

            <!-- NOTIFICATION CARDS -->
            <div
              v-for="(notification, index) in notificationExamples"
              :key="notification.id"
              class="pnb-notification"
              :style="{
                '--notification-index': index
              }"
            >
              <span class="pnb-notification-icon">
                <i
                  :class="notification.icon"
                  aria-hidden="true"
                ></i>
              </span>

              <div class="pnb-notification-copy">

                <div class="pnb-notification-heading">
                  <strong>{{ notification.title }}</strong>
                  <small>{{ notification.time }}</small>
                </div>

                <p>{{ notification.message }}</p>

              </div>

            </div>

          </div>

          <span class="pnb-preview-note">
            Illustrative notification previews
          </span>

        </div>

        <!-- MAIN CONTENT -->
        <div class="pnb-main-content">

          <span class="pnb-label">
            {{ pushNotificationBenefits.main.label }}
          </span>

          <h3>
            {{ pushNotificationBenefits.main.title }}
          </h3>

          <p>
            {{ pushNotificationBenefits.main.description }}
          </p>

        </div>

      </article>

      <!-- =====================================
           BOTTOM TWO CARDS
      ====================================== -->
      <div class="pnb-bottom-grid">

        <!-- TIMELY PROMOTIONS -->
        <article class="pnb-info-card pnb-promotions-card">

          <div class="pnb-info-content">

            <span class="pnb-label">
              {{ pushNotificationBenefits.promotions.label }}
            </span>

            <h3>
              {{ pushNotificationBenefits.promotions.title }}
            </h3>

            <p>
              {{ pushNotificationBenefits.promotions.description }}
            </p>

          </div>

          <!-- PROMOTION CAMPAIGN PREVIEW -->
          <div class="pnb-campaign-preview">

            <div class="pnb-campaign-header">

              <span class="pnb-campaign-header-icon">
                <i class="fa-solid fa-bullhorn"></i>
              </span>

              <div>
                <strong>{{ promotionPreview.campaign }}</strong>
                <small>Push notification campaign</small>
              </div>

              <span class="pnb-campaign-status">
                <i class="fa-solid fa-check"></i>
                Ready
              </span>

            </div>

            <!-- OFFER -->
            <div class="pnb-campaign-offer">

              <span class="pnb-campaign-eyebrow">
                EXCLUSIVE OFFER
              </span>

              <strong>{{ promotionPreview.offer }}</strong>

              <p>{{ promotionPreview.subtitle }}</p>

              <span
                class="pnb-campaign-gift"
                aria-hidden="true"
              >
                <i class="fa-solid fa-gift"></i>
              </span>

            </div>

            <!-- MESSAGE -->
            <div class="pnb-campaign-message">

              <span class="pnb-campaign-message-icon">
                <i class="fa-regular fa-bell"></i>
              </span>

              <div>
                <strong>
                  {{ promotionPreview.message }}
                </strong>

                <small>
                  {{ promotionPreview.audience }}
                </small>
              </div>

            </div>

            <!-- STATUS -->
            <div class="pnb-campaign-footer">

              <span>
                <i class="fa-regular fa-clock"></i>
                {{ promotionPreview.status }}
              </span>

              <span>
                <i class="fa-solid fa-check-circle"></i>
                Campaign prepared
              </span>

            </div>

            <span class="pnb-campaign-note">
              Illustrative campaign preview
            </span>

          </div>

        </article>

        <!-- =====================================
             MORE REPEAT PURCHASES
        ====================================== -->
        <article class="pnb-info-card pnb-purchases-card">

          <div class="pnb-info-content">

            <span class="pnb-label">
              {{ pushNotificationBenefits.purchases.label }}
            </span>

            <h3>
              {{ pushNotificationBenefits.purchases.title }}
            </h3>

            <p>
              {{ pushNotificationBenefits.purchases.description }}
            </p>

          </div>

          <!-- PHONE MOCKUP -->
          <div class="pnb-phone-scene">

            <div class="pnb-phone">

              <div class="pnb-phone-notch"></div>

              <div class="pnb-phone-screen">

                <!-- REAL CARTINNO LOGO -->
                <div class="pnb-phone-header">

                  <img
                    v-if="!logoFailed"
                    :src="pushNotificationBrand.logo"
                    :alt="pushNotificationBrand.name"
                    class="pnb-cartinno-logo"
                    @error="logoFailed = true"
                  />

                  <strong
                    v-else
                    class="pnb-brand-fallback"
                  >
                    {{ pushNotificationBrand.name }}
                  </strong>

                </div>

                <!-- PRODUCT IMAGE -->
                <img
                  v-if="!productImageFailed"
                  :src="repeatPurchasePreview.productImage"
                  alt="Red lifestyle sneaker"
                  class="pnb-product-image"
                  loading="lazy"
                  @error="productImageFailed = true"
                />

                <div
                  v-else
                  class="pnb-product-image-fallback"
                >
                  <i class="fa-solid fa-bag-shopping"></i>
                </div>

                <div class="pnb-phone-body">

                  <span class="pnb-phone-eyebrow">
                    {{ repeatPurchasePreview.eyebrow }}
                  </span>

                  <h4>
                    {{ repeatPurchasePreview.title }}
                  </h4>

                  <p>
                    {{ repeatPurchasePreview.description }}
                  </p>

                  <span class="pnb-phone-button">
                    {{ repeatPurchasePreview.button }}
                    <i class="fa-solid fa-arrow-right"></i>
                  </span>

                </div>

              </div>

            </div>

            <!-- FLOATING NOTIFICATION -->
            <div class="pnb-floating-notification">

              <div class="pnb-floating-top">

                <!-- PREMIUM GREY CIRCLE -->
                <span class="pnb-floating-icon">
                  <i class="fa-regular fa-bell"></i>
                </span>

                <!-- REAL CARTINNO LOGO -->
                <img
                  v-if="!logoFailed"
                  :src="pushNotificationBrand.logo"
                  :alt="pushNotificationBrand.name"
                  class="pnb-floating-logo"
                  @error="logoFailed = true"
                />

                <strong
                  v-else
                  class="pnb-brand-fallback"
                >
                  {{ pushNotificationBrand.name }}
                </strong>

                <small>Now</small>

              </div>

              <strong>
                {{ repeatPurchasePreview.notificationTitle }}
              </strong>

              <p>
                {{ repeatPurchasePreview.notificationMessage }}
              </p>

            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
