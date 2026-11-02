<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './AIPhoneOrderingBenefits.css'

import {
  aiPhoneOrderingBenefitsContent as content,
  aiPhoneOrderingBenefits as benefits,
  aiPhoneOrderingBenefitsPreview as preview
} from './AIPhoneOrderingBenefitsData.js'

const sectionRef = ref(null)
const visible = ref(false)

let observer = null

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
      if (entry?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.1 }
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
    id="ai-phone-ordering-benefits"
    class="apb-section"
    :class="{ 'apb-visible': visible }"
  >
    <div class="apb-container">
      <header class="apb-header">
        <h2 class="apb-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>
      </header>

      <article class="apb-main-card">
        <div class="apb-call-scene">
          <div class="apb-call-window">
            <div class="apb-window-topbar">
              <div class="apb-window-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>

              <span>{{ preview.restaurant }}</span>
            </div>

            <div class="apb-restaurant-photo">
              <img
                :src="preview.restaurantImage"
                :alt="`${preview.restaurant} restaurant interior`"
                loading="lazy"
              />
            </div>

            <div class="apb-call-content">

              <h3>{{ preview.restaurant }}</h3>

              <p class="apb-phone-number">
                {{ preview.phoneNumber }}
              </p>

              <div class="apb-waveform" aria-hidden="true">
                <span
                  v-for="bar in 17"
                  :key="bar"
                  :style="{ '--apb-bar': bar }"
                ></span>
              </div>

              <p class="apb-call-status">
                {{ preview.status }}
              </p>
            </div>
          </div>

          <div class="apb-call-float">
            <div class="apb-float-photo">
              <img
                :src="preview.burgerImage"
                alt="Classic burger"
                loading="lazy"
              />
            </div>

            <div>
              <strong>Order captured</strong>
              <span>Classic burger · 1</span>
            </div>
          </div>
        </div>

        <div class="apb-main-content">
          <span class="apb-benefit-label">
            {{ benefits[0].number }} / {{ benefits[0].label }}
          </span>

          <h3>{{ benefits[0].title }}</h3>

          <p>{{ benefits[0].description }}</p>
        </div>
      </article>

      <div class="apb-bottom-grid">
        <article class="apb-order-card">
          <div class="apb-card-copy">
            <span class="apb-benefit-label">
              {{ benefits[1].number }} / {{ benefits[1].label }}
            </span>

            <h3>{{ benefits[1].title }}</h3>

            <p>{{ benefits[1].description }}</p>
          </div>

          <div class="apb-order-scene">
            <div class="apb-order-back">
              <span></span>
              <div>
                <i></i>
                <i></i>
              </div>
            </div>

            <div class="apb-order-middle">
              <span></span>
              <div>
                <i></i>
                <i></i>
              </div>
            </div>

            <div class="apb-order-front">
              <div class="apb-order-photo">
                <img
                  :src="preview.burgerImage"
                  alt="Freshly prepared classic burger"
                  loading="lazy"
                />
              </div>

              <div class="apb-order-details">
                <strong>Classic burger</strong>
                <small>Freshly prepared</small>
                <span>Phone order · Qty 1</span>
              </div>
            </div>

            <div class="apb-order-action">
              Order details captured
            </div>
          </div>
        </article>

        <article class="apb-workflow-card">
          <div class="apb-card-copy">
            <span class="apb-benefit-label">
              {{ benefits[2].number }} / {{ benefits[2].label }}
            </span>

            <h3>{{ benefits[2].title }}</h3>

            <p>{{ benefits[2].description }}</p>
          </div>

          <div class="apb-workflow-scene">
            <div class="apb-kitchen-photo">
              <img
                :src="preview.kitchenImage"
                alt="Restaurant kitchen and food preparation workspace"
                loading="lazy"
              />
            </div>

            <div class="apb-workflow-panel">
              <div class="apb-workflow-header">
                <img
                  :src="preview.lemonadeImage"
                  alt="Fresh lemonade"
                  loading="lazy"
                />

                <div>
                  <strong>Phone order</strong>
                  <span>{{ preview.restaurant }}</span>
                </div>
              </div>

              <div class="apb-workflow-row">
                <span>Classic burger</span>
                <strong>× 1</strong>
              </div>

              <div class="apb-workflow-row">
                <span>Fresh lemonade</span>
                <strong>× 1</strong>
              </div>

              <div class="apb-workflow-status">
                Order details ready
              </div>
            </div>

            <div class="apb-workflow-float">
              Connected ordering
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>