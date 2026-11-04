<script setup>
import { ref } from 'vue'

import {
  appSolutionContent,
  appSolutionFeatures
} from './AppSolutionData.js'

import './AppSolution.css'

const failedImage = ref(false)

const interfacesList = [
  { id: 1, icon: 'fa-solid fa-laptop-code', title: 'Admin Dashboard' },
  { id: 2, icon: 'fa-solid fa-utensils', title: 'Restaurant Dashboard' },
  { id: 3, icon: 'fa-solid fa-mobile-screen', title: 'Customer Application' },
  { id: 4, icon: 'fa-solid fa-motorcycle', title: 'Delivery Application' }
]

const appSolutions = [
  { id: 1, icon: 'fa-solid fa-store', title: 'Store App' },
  { id: 2, icon: 'fa-regular fa-user', title: 'Customer App' },
  { id: 3, icon: 'fa-solid fa-helmet-safety', title: 'Delivery Personnel App' }
]
</script>

<template>
  <section
    class="as-section"
    id="app-solution"
  >
    <div class="as-container">

      <!-- SECTION HEADING -->
      <header class="as-header">
        <h2 class="as-title">
          {{ appSolutionContent.title1 }}
          <span>
            {{ appSolutionContent.title2 }}
          </span>
        </h2>
        <p class="as-description">
          {{ appSolutionContent.description }}
        </p>
      </header>

      <!-- THREE CARDS -->
      <div class="as-cards">

        <article
          v-for="(feature, index) in appSolutionFeatures"
          :key="feature.id"
          class="as-card"
          :class="{
            'as-card-featured': feature.theme === 'featured'
          }"
        >
          <!-- CENTER PHOTO WITH OVERLAY -->
          <template v-if="feature.theme === 'featured'">
            <img
              v-if="!failedImage"
              :src="appSolutionContent.featuredImage"
              :alt="appSolutionContent.featuredImageAlt"
              class="as-featured-image"
              loading="lazy"
              @error="failedImage = true"
            />
            <div class="as-featured-overlay" aria-hidden="true"></div>
          </template>

          <!-- CARD CONTENT -->
          <div class="as-card-content">

            <h3 class="as-card-title">{{ feature.title }}</h3>
            <p class="as-card-description">{{ feature.description }}</p>
          </div>

          <!-- LEFT: INTERFACES LIST -->
          <div
            v-if="index === 0"
            class="as-preview as-list-preview"
          >
            <div class="as-preview-top">
              <span>Included Interfaces</span>
              <span class="as-live-label">
                <i></i> Live
              </span>
            </div>

            <div class="as-ui-list">
              <div
                v-for="(item, itemIndex) in interfacesList"
                :key="item.id"
                class="as-list-item"
                :style="{ '--item-index': itemIndex }"
              >
                <span class="as-list-icon">
                  <i :class="item.icon"></i>
                </span>
                <div class="as-list-copy">
                  <strong>{{ item.title }}</strong>
                </div>
              </div>
            </div>

            <div class="as-message-footer">
              Complete Control Hub
            </div>
          </div>

          <!-- CENTER: PHOTO BOTTOM LABEL -->
          <div
            v-if="index === 1"
            class="as-featured-bottom"
          >
            <span>{{ feature.label }}</span>
          </div>

          <!-- RIGHT: APP SOLUTIONS PREVIEW -->
          <div
            v-if="index === 2"
            class="as-preview as-app-preview"
          >
            <div class="as-preview-top">
              <span>App Ecosystem</span>
              <span class="as-campaign-status">
                <i class="fa-solid fa-check"></i> Connected
              </span>
            </div>

            <div class="as-campaign-card">
              <strong>Seamless Integration</strong>
              <div class="as-app-tags">
                <div v-for="app in appSolutions" :key="app.id" class="as-app-tag">
                  <i :class="app.icon"></i>
                  {{ app.title }}
                </div>
              </div>
            </div>

            <div class="as-sales-footer">
              <span>
                <i class="fa-solid fa-mobile-button"></i>
                Available on iOS & Android
              </span>
            </div>
          </div>

        </article>
      </div>
    </div>
  </section>
</template>