<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './CateringFeatures.css'

import {
  cateringContent as content,
  cateringFeatures as features,
  cateringMenuPreview as menu,
  cateringOrderPreview as order
} from './CateringFeaturesData.js'

const sectionRef = ref(null)
const visible = ref(false)

const selectedCategory = ref('Popular')
const selectedItems = ref(new Set())

const failedImages = ref(new Set())
const featuredFailed = ref(false)

let observer = null

const filteredItems = computed(() => {
  if (selectedCategory.value === 'Popular') {
    return menu.items.slice(0, 2)
  }

  return menu.items.filter(
    item => item.category === selectedCategory.value
  )
})

const selectedCount = computed(
  () => selectedItems.value.size
)

function addItem(id) {
  const next = new Set(selectedItems.value)

  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }

  selectedItems.value = next
}

function imageAvailable(id) {
  return !failedImages.value.has(id)
}

function handleImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

onMounted(() => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reduceMotion ||
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
    id="catering-features"
    class="cf-section"
    :class="{ 'cf-visible': visible }"
  >
    <div class="cf-container">

      <!-- SECTION HEADING -->
      <header class="cf-header">
        <h2 class="cf-heading">
          {{ content.title1 }}
          <br />
          {{ content.title2 }}
        </h2>
      </header>

      <!-- THREE FEATURE CARDS -->
      <div class="cf-cards">

        <article
          v-for="(feature, index) in features"
          :key="feature.id"
          class="cf-card"
          :class="[
            `cf-card-${index + 1}`,
            {
              'cf-card-featured':
                feature.theme === 'featured'
            }
          ]"
          :style="{ '--cf-index': index }"
        >

          <!-- CENTER FEATURED IMAGE -->
          <template v-if="feature.theme === 'featured'">

            <img
              v-if="!featuredFailed"
              :src="content.featuredImage"
              :alt="content.featuredImageAlt"
              class="cf-featured-image"
              loading="lazy"
              @error="featuredFailed = true"
            />

            <div
              v-else
              class="cf-featured-fallback"
              aria-hidden="true"
            >
              <i class="fa-solid fa-utensils"></i>
            </div>

            <div
              class="cf-featured-overlay"
              aria-hidden="true"
            ></div>

          </template>

          <!-- FEATURE CONTENT -->
          <div class="cf-card-content">

            <h3 class="cf-card-title">
              {{ feature.title }}
            </h3>

            <p class="cf-card-description">
              {{ feature.description }}
            </p>

          </div>

          <div
            v-if="index === 0"
            class="cf-preview cf-menu-preview"
          >

            <div class="cf-preview-label">
              Explore Catering Menu
            </div>

            <!-- CATEGORY TABS -->
            <div class="cf-category-tabs">

              <button
                v-for="category in menu.categories"
                :key="category"
                type="button"
                :class="{
                  active: selectedCategory === category
                }"
                :aria-pressed="selectedCategory === category"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>

            </div>

            <!-- MENU ITEMS -->
            <div class="cf-menu-list">

              <div
                v-for="item in filteredItems"
                :key="item.id"
                class="cf-menu-item"
              >

                <div class="cf-item-image">

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
                    aria-hidden="true"
                  ></i>

                </div>

                <div class="cf-item-info">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.price }}</span>
                </div>

                <button
                  type="button"
                  class="cf-item-plus"
                  :class="{
                    'cf-item-added':
                      selectedItems.has(item.id)
                  }"
                  :aria-label="
                    selectedItems.has(item.id)
                      ? `Remove ${item.name}`
                      : `Add ${item.name}`
                  "
                  :aria-pressed="selectedItems.has(item.id)"
                  @click="addItem(item.id)"
                >
                  <i
                    :class="
                      selectedItems.has(item.id)
                        ? 'fa-solid fa-check'
                        : 'fa-solid fa-plus'
                    "
                    aria-hidden="true"
                  ></i>
                </button>

              </div>

            </div>

            <div class="cf-preview-action">

              {{ selectedCount }}
              {{ selectedCount === 1 ? 'item' : 'items' }}
              selected
            </div>

          </div>

          <div
            v-if="index === 1"
            class="cf-featured-bottom"
          >
            <span>{{ feature.label }}</span>
          </div>

          <div
            v-if="index === 2"
            class="cf-preview cf-order-preview"
          >

            <div class="cf-preview-label">
              {{ order.title }}
            </div>

            <div class="cf-order-header">

              <span class="cf-order-icon">
                <i
                  class="fa-solid fa-utensils"
                  aria-hidden="true"
                ></i>
              </span>

              <div>
                <strong>{{ order.business }}</strong>
                <small>{{ order.orderId }}</small>
              </div>

            </div>

            <!-- ORDER DETAILS -->
            <div class="cf-order-details">

              <div
                v-for="detail in order.details"
                :key="detail.id"
                class="cf-order-detail"
              >

                <span>{{ detail.label }}</span>

                <strong>{{ detail.value }}</strong>
              </div>

            </div>

            <!-- CONNECTED OPERATIONS -->
            <div class="cf-order-channels">

              <div
                v-for="channel in order.channels"
                :key="channel.id"
                class="cf-order-channel"
              >

                <span class="cf-channel-icon">
                  <i
                    :class="channel.icon"
                    aria-hidden="true"
                  ></i>
                </span>

                <div>
                  <strong>{{ channel.title }}</strong>
                  <small>{{ channel.status }}</small>
                </div>

                <i
                  class="fa-solid fa-circle-check cf-check"
                  aria-hidden="true"
                ></i>

              </div>

            </div>

            <div class="cf-order-footer">
             

              {{ order.status }}
            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
