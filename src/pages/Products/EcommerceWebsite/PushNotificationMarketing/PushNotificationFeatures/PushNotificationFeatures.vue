
<script setup>
import { ref } from 'vue'

import {
  pushNotificationContent,
  pushNotificationFeatures
} from './PushNotificationFeaturesData.js'

import './PushNotificationFeatures.css'

const failedImage = ref(false)

const notifications = [
  {
    id: 1,
    icon: 'fa-solid fa-gift',
    title: 'A little something for you!',
    message: 'Enjoy 20% off your next order.',
    time: 'Now'
  },
  {
    id: 2,
    icon: 'fa-solid fa-bag-shopping',
    title: 'Your favorites are waiting',
    message: 'Take another look at items you love.',
    time: '2m ago'
  }
]
</script>

<template>
  <section
    class="pnf-section"
    id="push-notification-features"
  >
    <div class="pnf-container">

      <!-- SECTION HEADING -->
      <header class="pnf-header">

        <h2 class="pnf-title">
          {{ pushNotificationContent.title1 }}
          <span>
            {{ pushNotificationContent.title2 }}
          </span>
        </h2>

        <p class="pnf-description">
          {{ pushNotificationContent.description }}
        </p>
      </header>

      <!-- THREE CARDS -->
      <div class="pnf-cards">

        <article
          v-for="(feature, index) in pushNotificationFeatures"
          :key="feature.id"
          class="pnf-card"
          :class="{
            'pnf-card-featured':
              feature.theme === 'featured'
          }"
        >

          <!-- CENTER PHOTO -->
          <template v-if="feature.theme === 'featured'">
            <img
              v-if="!failedImage"
              :src="pushNotificationContent.featuredImage"
              :alt="pushNotificationContent.featuredImageAlt"
              class="pnf-featured-image"
              loading="lazy"
              @error="failedImage = true"
            />

            <div
              class="pnf-featured-overlay"
              aria-hidden="true"
            ></div>
          </template>

          <!-- CARD CONTENT -->
          <div class="pnf-card-content">
            

            <h3 class="pnf-card-title">
              {{ feature.title }}
            </h3>

            <p class="pnf-card-description">
              {{ feature.description }}
            </p>
          </div>

          <!-- LEFT: PUSH NOTIFICATION PREVIEW -->
          <div
            v-if="index === 0"
            class="pnf-preview pnf-message-preview"
            aria-label="Illustrative push notification messages"
          >
            <div class="pnf-preview-top">
              <span>Notification Preview</span>

              <span class="pnf-live-label">
                <i></i>
                Live
              </span>
            </div>

            <div class="pnf-phone-notifications">

              <div
                v-for="(notification, notificationIndex) in notifications"
                :key="notification.id"
                class="pnf-notification"
                :style="{
                  '--notification-index':
                    notificationIndex
                }"
              >

                <span class="pnf-notification-icon">
                  <i :class="notification.icon"></i>
                </span>

                <div class="pnf-notification-copy">
                  <strong>
                    {{ notification.title }}
                  </strong>

                  <span>
                    {{ notification.message }}
                  </span>
                </div>

                <small>{{ notification.time }}</small>

              </div>

            </div>

            <div class="pnf-message-footer">
              <i class="fa-solid fa-bell"></i>
              Reach customers instantly
              <i class="fa-solid fa-arrow-up-right"></i>
            </div>
          </div>

          <!-- CENTER: PHOTO BOTTOM LABEL -->
          <div
            v-if="index === 1"
            class="pnf-featured-bottom"
          >
            <span>
              {{ feature.label }}
            </span>

          </div>

          <!-- RIGHT: SALES NOTIFICATION -->
          <div
            v-if="index === 2"
            class="pnf-preview pnf-sales-preview"
            aria-label="Illustrative marketing notification campaign"
          >

            <div class="pnf-preview-top">
              <span>Campaign Preview</span>

              <span class="pnf-campaign-status">
                <i class="fa-solid fa-check"></i>
                Active
              </span>
            </div>

            <div class="pnf-campaign-card">
              <div class="pnf-campaign-icon">
                <i class="fa-solid fa-tag"></i>
              </div>

              <span class="pnf-campaign-eyebrow">
                EXCLUSIVE OFFER
              </span>

              <strong>
                A special deal just for you!
              </strong>

              <p>
                Come back and enjoy 20% off your
                next purchase.
              </p>

              <div class="pnf-campaign-button">
                Shop the Offer
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>

            <div class="pnf-sales-footer">
              <span>
                <i class="fa-solid fa-arrow-rotate-left"></i>
                Bring customers back
              </span>

              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>

          </div>

        </article>

      </div>
    </div>
  </section>
</template>
