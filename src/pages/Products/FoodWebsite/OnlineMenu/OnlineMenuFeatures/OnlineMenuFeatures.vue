
<script setup>
import { ref } from 'vue'

import './OnlineMenuFeatures.css'

import {
  onlineMenuContent as content,
  onlineMenuFeatures as features,
  onlineMenuPreview as menu,
  onlineMenuSync as sync
} from './OnlineMenuFeaturesData.js'

const selectedCategory = ref('Popular')
const failedImages = ref(new Set())
const featuredFailed = ref(false)

function imageAvailable(id) {
  return !failedImages.value.has(id)
}

function handleImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}
</script>

<template>
  <section
    id="online-menu-features"
    class="omf-section"
  >
    <div class="omf-container">

      <!-- LEFT-ALIGNED SECTION HEADING -->
      <header class="omf-header">

        <h2 class="omf-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>

      </header>

      <!-- THREE CARDS -->
      <div class="omf-cards">

        <article
          v-for="(feature, index) in features"
          :key="feature.id"
          class="omf-card"
          :class="{
            'omf-card-featured': feature.theme === 'featured'
          }"
        >

          <!-- CENTER CARD BACKGROUND IMAGE -->
          <template v-if="feature.theme === 'featured'">

            <img
              v-if="!featuredFailed"
              class="omf-featured-image"
              :src="content.featuredImage"
              :alt="content.featuredImageAlt"
              loading="lazy"
              @error="featuredFailed = true"
            />

            <div
              v-else
              class="omf-featured-fallback"
              aria-hidden="true"
            >
              <i class="fa-solid fa-utensils"></i>
            </div>

            <div
              class="omf-featured-overlay"
              aria-hidden="true"
            ></div>

          </template>

          <!-- FEATURE TEXT -->
          <div class="omf-card-content">

            <h3 class="omf-card-title">
              {{ feature.title }}
            </h3>

            <p class="omf-card-description">
              {{ feature.description }}
            </p>

          </div>

          <!-- LEFT CARD: ONLINE MENU PREVIEW -->
          <div
            v-if="index === 0"
            class="omf-preview omf-menu-preview"
          >

            <div class="omf-preview-label">
              Explore Our Menu
            </div>

            <!-- CATEGORY TABS -->
            <div class="omf-category-tabs">

              <button
                v-for="category in menu.categories"
                :key="category"
                type="button"
                :class="{
                  active: selectedCategory === category
                }"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>

            </div>

            <!-- MENU ITEMS -->
            <div class="omf-menu-list">

              <div
                v-for="item in (
                  selectedCategory === 'Sides'
                    ? menu.items.slice(1)
                    : selectedCategory === 'Burgers'
                      ? menu.items.slice(0, 1)
                      : menu.items
                )"
                :key="item.id"
                class="omf-menu-item"
              >

                <div class="omf-item-image">

                  <img
                    v-if="imageAvailable(item.id)"
                    :src="item.image"
                    :alt="item.name"
                    loading="lazy"
                    @error="handleImageError(item.id)"
                  />

                  <i
                    v-else
                    class="fa-solid fa-utensils"
                  ></i>

                </div>

                <div class="omf-item-info">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.price }}</span>
                </div>

                <span class="omf-item-plus">
                  <i class="fa-solid fa-plus"></i>
                </span>

              </div>

            </div>

            <div class="omf-preview-action">
              Explore Full Menu
            </div>

          </div>

          <!-- CENTER CARD BOTTOM LABEL -->
          <div
            v-if="index === 1"
            class="omf-featured-bottom"
          >
            <span>{{ feature.label }}</span>
          </div>

          <!-- RIGHT CARD: CONNECTED MENU PREVIEW -->
          <div
            v-if="index === 2"
            class="omf-preview omf-sync-preview"
          >

            <div class="omf-preview-label">
              Connected Menu Management
            </div>

            <div class="omf-sync-header">

              <span class="omf-sync-icon">
                <i class="fa-solid fa-utensils"></i>
              </span>

              <div>
                <strong>{{ sync.business }}</strong>
                <small>Menu management</small>
              </div>

            </div>

            <!-- CONNECTED CHANNELS -->
            <div class="omf-sync-channels">

              <div
                v-for="channel in sync.channels"
                :key="channel.id"
                class="omf-sync-channel"
              >

                <span class="omf-channel-icon">
                  <i :class="channel.icon"></i>
                </span>

                <div>
                  <strong>{{ channel.title }}</strong>
                  <small>{{ channel.status }}</small>
                </div>

                <i class="fa-solid fa-circle-check"></i>

              </div>

            </div>

            <div class="omf-sync-footer">
              <i class="fa-solid fa-link"></i>
              {{ sync.status }}
            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
