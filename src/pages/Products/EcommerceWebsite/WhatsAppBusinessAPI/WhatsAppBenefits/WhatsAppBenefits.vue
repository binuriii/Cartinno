
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  whatsAppBenefitsContent as content,
  whatsAppBenefits as benefits,
  whatsAppOrderPreview as order,
  whatsAppSupportPreview as support,
  whatsAppPromotionPreview as promotion
} from './WhatsAppBenefitsData.js'

import './WhatsAppBenefits.css'

const sectionRef = ref(null)
const visible = ref(false)

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
      threshold: 0.1,
      rootMargin: '0px 0px -5% 0px'
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
    id="whatsapp-benefits"
    class="wab-section"
    :class="{ 'wab-visible': visible }"
  >
    <div class="wab-container">

      <!-- CENTERED HEADING -->
      <header class="wab-header">
        <h2 class="wab-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>
      </header>

      <!-- =====================================
           CARD 01: ORDER NOTIFICATIONS
      ====================================== -->
      <article class="wab-main-card">

        <div class="wab-main-visual">

          <!-- WHATSAPP CHAT WINDOW -->
          <div class="wab-chat-window">

            <div class="wab-chat-topbar">

              <span class="wab-back-arrow">
                <i class="fa-solid fa-chevron-left"></i>
              </span>

              <div class="wab-business-avatar">
                <i class="fa-solid fa-store"></i>
              </div>

              <div class="wab-business-details">
                <strong>
                  {{ order.businessName }}
                </strong>

                <span>
                  {{ order.status }}
                </span>
              </div>

              <i class="fa-solid fa-video"></i>
              <i class="fa-solid fa-ellipsis-vertical"></i>

            </div>

            <div class="wab-chat-body">

              <div class="wab-chat-date">
                TODAY
              </div>

              <div class="wab-chat-security">
                <i class="fa-solid fa-lock"></i>
                Business messaging preview
              </div>

              <!-- FIRST BUSINESS MESSAGE -->
              <div class="wab-message wab-message-one">

                <div class="wab-message-brand">
                  <i class="fa-brands fa-whatsapp"></i>
                  WhatsApp Business
                </div>

                <strong>
                  {{ order.confirmation.title }}
                </strong>

                <p>
                  {{ order.confirmation.message }}
                </p>

                <div class="wab-order-info">
                  <span>Order number</span>
                  <strong>{{ order.orderNumber }}</strong>
                </div>

                <small>
                  {{ order.confirmation.time }}
                  <i class="fa-solid fa-check-double"></i>
                </small>

              </div>

              <!-- CUSTOMER REPLY -->
              <div
                class="wab-message
                       wab-message-customer
                       wab-message-two"
              >
                <p>
                  {{ order.customerReply.message }}
                </p>

                <small>
                  {{ order.customerReply.time }}
                  <i class="fa-solid fa-check-double"></i>
                </small>

              </div>

              <!-- DELIVERY UPDATE -->
              <div class="wab-message wab-message-three">

                <div class="wab-delivery-heading">
                  <span>
                    <i class="fa-solid fa-truck-fast"></i>
                  </span>

                  <strong>
                    {{ order.delivery.title }}
                  </strong>
                </div>

                <p>
                  {{ order.delivery.message }}
                </p>

                <small>
                  {{ order.delivery.time }}
                  <i class="fa-solid fa-check-double"></i>
                </small>

              </div>

            </div>

            <div class="wab-chat-input">
              <div>
                <i class="fa-regular fa-face-smile"></i>
                <span>Message</span>
                <i class="fa-solid fa-paperclip"></i>
              </div>

              <span class="wab-send-icon">
                <i class="fa-solid fa-microphone"></i>
              </span>
            </div>

          </div>

          <!-- FLOATING WHATSAPP ICON -->
          <div class="wab-floating-logo">
            <i class="fa-brands fa-whatsapp"></i>
          </div>

          <!-- FLOATING DELIVERY NOTICE -->
          <div class="wab-floating-notice">

            <span class="wab-notice-icon">
              <i class="fa-solid fa-circle-check"></i>
            </span>

            <div>
              <strong>Order update sent</strong>
              <small>Customer notified via WhatsApp</small>
            </div>

          </div>

        </div>

        <div class="wab-main-content">

          <span class="wab-card-label">
            {{ benefits[0].number }}
            / {{ benefits[0].label }}
          </span>

          <h3>{{ benefits[0].title }}</h3>
          <p>{{ benefits[0].description }}</p>

        </div>

      </article>

      <!-- =====================================
           TWO BOTTOM CARDS
      ====================================== -->
      <div class="wab-bottom-grid">

        <!-- CARD 02: CUSTOMER COMMUNICATION -->
        <article class="wab-support-card">

          <div class="wab-card-copy">

            <span class="wab-card-label">
              {{ benefits[1].number }}
              / {{ benefits[1].label }}
            </span>

            <h3>{{ benefits[1].title }}</h3>
            <p>{{ benefits[1].description }}</p>

          </div>

          <div class="wab-support-scene">

            <div class="wab-support-window">

              <div class="wab-support-header">

                <span class="wab-support-avatar">
                  <i class="fa-brands fa-whatsapp"></i>
                </span>

                <div>
                  <strong>
                    {{ support.businessName }}
                  </strong>
                  <small>Business chat</small>
                </div>

                <span class="wab-online-dot"></span>

              </div>

              <div class="wab-support-chat">

                <div
                  class="wab-support-bubble
                         wab-support-bubble-customer
                         wab-support-msg-1"
                >
                  {{ support.customerMessage }}
                </div>

                <div
                  class="wab-support-bubble
                         wab-support-bubble-business
                         wab-support-msg-2"
                >
                  {{ support.businessReply }}

                  <small>
                    10:45
                    <i class="fa-solid fa-check-double"></i>
                  </small>
                </div>

                <div
                  class="wab-support-bubble
                         wab-support-bubble-customer
                         wab-support-msg-3"
                >
                  {{ support.customerFollowUp }}
                </div>

              </div>

              <div class="wab-support-input">
                <span>Type a message...</span>
                <span>
                  <i class="fa-solid fa-paper-plane"></i>
                </span>
              </div>

            </div>

            <div class="wab-support-badge">
              Conversations made simple
            </div>

          </div>

        </article>

        <!-- CARD 03: PROMOTIONAL MESSAGING -->
        <article class="wab-promotion-card">

          <div class="wab-card-copy">

            <span class="wab-card-label">
              {{ benefits[2].number }}
              / {{ benefits[2].label }}
            </span>

            <h3>{{ benefits[2].title }}</h3>
            <p>{{ benefits[2].description }}</p>

          </div>

          <div class="wab-promotion-scene">

            <div class="wab-promotion-window">

              <div class="wab-promotion-header">

                <span class="wab-promotion-avatar">
                  <i class="fa-brands fa-whatsapp"></i>
                </span>

                <div>
                  <strong>
                    {{ promotion.businessName }}
                  </strong>

                  <small>WhatsApp Business</small>
                </div>

              </div>

              <div class="wab-promotion-body">

                <div class="wab-promotion-banner">
                  <i class="fa-solid fa-gift"></i>
                  <span>JUST FOR YOU</span>
                </div>

                <h4>{{ promotion.title }}</h4>

                <p>{{ promotion.message }}</p>

                <div class="wab-promotion-button">
                  {{ promotion.action }}
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

              </div>

              <div class="wab-promotion-status">
                <i class="fa-solid fa-check-double"></i>
                {{ promotion.status }}
              </div>

            </div>

            <div class="wab-promotion-float">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Stay connected</span>
            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
