<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './AIPhoneOrderingFeatures.css'

import {
  aiPhoneOrderingFeaturesContent,
  aiPhoneOrderingFeatures,
  aiPhoneOrderingPreview
} from './AIPhoneOrderingFeaturesData.js'

const sectionRef = ref(null)
let observer

onMounted(() => {
  if (!sectionRef.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sectionRef.value.classList.add('aipf-visible')
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aipf-visible')
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.12 }
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    id="ai-phone-ordering-features"
    ref="sectionRef"
    class="aipf-section"
  >
    <div class="aipf-container">
      <header class="aipf-header">
        <h2 class="aipf-heading">
          {{ aiPhoneOrderingFeaturesContent.title1 }}
          {{ aiPhoneOrderingFeaturesContent.title2 }}
        </h2>
      </header>

      <div class="aipf-layout">
        <div class="aipf-image-card">
          <div class="aipf-browser">
            <div class="aipf-browser-topbar">
              <div class="aipf-browser-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>

              <span class="aipf-browser-address">
                {{ aiPhoneOrderingPreview.restaurant }}
              </span>
            </div>

            <div class="aipf-restaurant-header">
              <img
                :src="aiPhoneOrderingPreview.images.restaurant"
                :alt="aiPhoneOrderingPreview.restaurant"
                class="aipf-restaurant-image"
                loading="lazy"
              />

              <div class="aipf-restaurant-info">
                <h3>{{ aiPhoneOrderingPreview.restaurant }}</h3>
                <p>{{ aiPhoneOrderingPreview.status }}</p>
              </div>
            </div>

            <div class="aipf-call-panel">
              <div class="aipf-call-heading">
                <span>Phone order</span>
                <span class="aipf-call-status">Active preview</span>
              </div>

              <p class="aipf-phone-number">
                {{ aiPhoneOrderingPreview.phoneNumber }}
              </p>

              <div class="aipf-waveform" aria-hidden="true">
                <span
                  v-for="bar in 17"
                  :key="bar"
                  :style="{ '--bar-index': bar }"
                ></span>
              </div>

              <p class="aipf-call-caption">
                AI assistant handling the conversation
              </p>
            </div>

            <div class="aipf-conversation">
              <div class="aipf-section-heading">
                <h4>Order conversation</h4>
                <span>Call preview</span>
              </div>

              <div
                v-for="message in aiPhoneOrderingPreview.conversation"
                :key="message.id"
                class="aipf-message"
                :class="`aipf-message-${message.type}`"
              >
                <span class="aipf-message-speaker">
                  {{ message.speaker }}
                </span>

                <p>{{ message.message }}</p>
              </div>
            </div>

            <div class="aipf-order-summary">
              <div class="aipf-section-heading">
                <h4>Captured order</h4>
                <span>{{ aiPhoneOrderingPreview.order.length }} items</span>
              </div>

              <div
                v-for="item in aiPhoneOrderingPreview.order"
                :key="item.id"
                class="aipf-order-item"
              >
                <img
                  :src="aiPhoneOrderingPreview.images[item.image]"
                  :alt="item.name"
                  loading="lazy"
                />

                <div class="aipf-order-details">
                  <strong>{{ item.name }}</strong>
                  <span>Quantity: {{ item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="aipf-floating-card">
            <img
              :src="aiPhoneOrderingPreview.images.burger"
              alt="Classic burger"
              loading="lazy"
            />

            <div>
              <strong>Order received</strong>
              <span>Details captured</span>
            </div>
          </div>
        </div>

        <div class="aipf-benefits">
          <article
            v-for="(feature, index) in aiPhoneOrderingFeatures"
            :key="feature.id"
            class="aipf-benefit"
            :style="{ '--aipf-index': index }"
          >
            <h3 class="aipf-benefit-title">
              {{ feature.title }}
            </h3>

            <p class="aipf-benefit-description">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>