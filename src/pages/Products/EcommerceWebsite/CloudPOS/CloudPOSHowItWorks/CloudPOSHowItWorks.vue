
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  cloudPOSHowItWorksContent as content,
  cloudPOSHowItWorksSteps as steps,
  cloudPOSDemoProducts as products,
  cloudPOSDemoOrders as orders,
  cloudPOSActivityTimeline as timeline
} from './CloudPOSHowItWorksData.js'

import './CloudPOSHowItWorks.css'

const root = ref(null)
const activeStep = ref(1)
const enteredSteps = ref(new Set())
const failedImages = ref(new Set())

let observer = null
let scrollFrame = null

function getProduct(id) {
  return products.find(product => product.id === id)
}

function hasImage(product) {
  return Boolean(product?.image) &&
    !failedImages.value.has(product.id)
}

function onImageError(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

function revealStep(id) {
  if (enteredSteps.value.has(id)) return

  enteredSteps.value = new Set([
    ...enteredSteps.value,
    id
  ])
}

function updateActiveStep() {
  if (!root.value) return

  const panels = root.value.querySelectorAll(
    '.cphw-step'
  )

  if (!panels.length) return

  const stickyTop =
    parseFloat(getComputedStyle(panels[0]).top) || 0

  let current = 1

  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect()

    if (rect.top <= stickyTop + 12) {
      current = Number(panel.dataset.step)
    }
  })

  activeStep.value = current
}

function handleScroll() {
  if (scrollFrame !== null) return

  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null
    updateActiveStep()
  })
}

onMounted(() => {
  const panels = root.value?.querySelectorAll(
    '.cphw-step'
  )

  if (!panels?.length) return

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reduceMotion ||
    !('IntersectionObserver' in window)
  ) {
    enteredSteps.value = new Set(
      steps.map(step => step.id)
    )
  } else {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const id = Number(
            entry.target.dataset.step
          )

          revealStep(id)
          observer?.unobserve(entry.target)
        })
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -10% 0px'
      }
    )

    panels.forEach(panel => observer.observe(panel))
  }

  window.addEventListener('scroll', handleScroll, {
    passive: true
  })

  window.addEventListener('resize', handleScroll)

  updateActiveStep()
})

onBeforeUnmount(() => {
  observer?.disconnect()

  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)

  if (scrollFrame !== null) {
    cancelAnimationFrame(scrollFrame)
  }
})
</script>

<template>
  <section
    ref="root"
    id="cloud-pos-how-it-works"
    class="cphw-section"
  >
    <div class="cphw-container">

      <!-- LEFT-ALIGNED HEADER -->
      <header class="cphw-header">
        <h2 class="cphw-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>

        <p class="cphw-description">
          {{ content.description }}
        </p>
      </header>

      <!-- STICKY SCROLL PANELS -->
      <div class="cphw-journey">

        <article
          v-for="(step, index) in steps"
          :key="step.id"
          class="cphw-step"
          :class="[
            `cphw-step-${step.id}`,
            {
              'cphw-entered':
                enteredSteps.has(step.id),
              'cphw-active':
                activeStep === step.id
            }
          ]"
          :data-step="step.id"
          :style="{ '--step-index': index }"
        >

          <div class="cphw-step-inner">

            <!-- NUMBER ONLY: NO DASHED LINE -->
            <div
              class="cphw-number-column"
              aria-hidden="true"
            >
              <span class="cphw-number">
                {{ step.number }}
              </span>
            </div>

            <!-- LEFT STEP CONTENT -->
            <div class="cphw-copy">

              <h3>{{ step.title }}</h3>

              <p>{{ step.description }}</p>

              <span class="cphw-powered">
                <i class="fa-solid fa-circle-check"></i>
                Connected with Cartinno
              </span>

              <div
                class="cphw-step-progress"
                aria-hidden="true"
              >
                <span
                  v-for="marker in steps"
                  :key="marker.id"
                  :class="{
                    'cphw-progress-active':
                      marker.id <= step.id
                  }"
                ></span>
              </div>

              <small class="cphw-step-count">
                {{ step.number }} / 03
              </small>
            </div>

            <!-- RIGHT ANIMATED PREVIEW -->
            <div
              class="cphw-preview"
              :class="`cphw-preview-${step.visual}`"
            >

              <!-- =========================
                   STEP 01: PRODUCTS
              ========================== -->
              <template v-if="step.visual === 'products'">
                <div class="cphw-preview-header">
                  <span>PRODUCT CATALOG</span>

                  <span class="cphw-preview-pill">
                    <i></i>
                    Ready
                  </span>
                </div>

                <div class="cphw-stack">
                  <div
                    v-for="(product, productIndex) in products"
                    :key="product.id"
                    class="cphw-stack-card"
                    :class="`cphw-stack-card-${productIndex + 1}`"
                  >
                    <div class="cphw-product-info">
                      <strong>
                        {{ product.name }}
                      </strong>

                      <p>
                        {{ product.description }}
                      </p>

                      <div class="cphw-product-price">
                        <b>{{ product.price }}</b>
                        <i class="fa-regular fa-heart"></i>
                      </div>
                    </div>

                    <div class="cphw-product-photo">
                      <img
                        v-if="hasImage(product)"
                        :src="product.image"
                        :alt="product.name"
                        loading="lazy"
                        @error="onImageError(product.id)"
                      />

                      <i
                        v-else
                        class="fa-solid fa-box"
                        aria-hidden="true"
                      ></i>

                      <span>{{ product.badge }}</span>
                    </div>
                  </div>
                </div>

                <div class="cphw-preview-footer">
                  <i class="fa-solid fa-circle-check"></i>
                  Products ready to sell
                </div>
              </template>

              <!-- =========================
                   STEP 02: CONNECTED ORDERS
              ========================== -->
              <template v-else-if="step.visual === 'orders'">
                <div class="cphw-preview-header">
                  <span>CONNECTED SALES</span>

                  <span class="cphw-preview-pill">
                    <i></i>
                    Synced
                  </span>
                </div>

                <div class="cphw-orders-intro">
                  <span class="cphw-orders-symbol">
                    <i class="fa-solid fa-bag-shopping"></i>
                  </span>

                  <div>
                    <strong>
                      Every sale, one place.
                    </strong>

                    <small>
                      In-store, online and marketplace
                    </small>
                  </div>
                </div>

                <div class="cphw-orders">
                  <div
                    v-for="(order, orderIndex) in orders"
                    :key="order.id"
                    class="cphw-order"
                    :style="{
                      '--item-index': orderIndex
                    }"
                  >
                    <div class="cphw-order-photo">
                      <img
                        v-if="hasImage(getProduct(order.productId))"
                        :src="getProduct(order.productId).image"
                        :alt="getProduct(order.productId).name"
                        loading="lazy"
                        @error="onImageError(order.productId)"
                      />

                      <i
                        v-else
                        class="fa-solid fa-box"
                        aria-hidden="true"
                      ></i>
                    </div>

                    <div class="cphw-order-copy">
                      <strong>
                        {{ getProduct(order.productId)?.name }}
                      </strong>

                      <span>
                        {{ order.channel }} · {{ order.order }}
                      </span>

                      <b>{{ order.price }}</b>
                    </div>

                    <span
                      class="cphw-order-status"
                      :class="{
                        'cphw-processing':
                          order.status === 'Processing'
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                </div>
              </template>

              <!-- =========================
                   STEP 03: BUSINESS ACTIVITY
              ========================== -->
              <template v-else>
                <div class="cphw-preview-header">
                  <span>BUSINESS ACTIVITY</span>

                  <span class="cphw-preview-pill">
                    <i></i>
                    Updated
                  </span>
                </div>

                <!-- NO DASHED LINE -->
                <div class="cphw-activity">
                  <div
                    v-for="(event, eventIndex) in timeline"
                    :key="event.id"
                    class="cphw-activity-event"
                    :style="{
                      '--item-index': eventIndex
                    }"
                  >
                    <span
                      class="cphw-activity-icon"
                      :class="`cphw-icon-${event.color}`"
                    >
                      <i :class="event.icon"></i>
                    </span>

                    <div class="cphw-activity-copy">
                      <strong>
                        {{ event.title }}
                      </strong>

                      <small>
                        {{ event.description }}
                      </small>
                    </div>

                    <i
                      class="fa-solid fa-check cphw-event-check"
                    ></i>
                  </div>
                </div>

                <!-- FLOATING NOTIFICATION -->
                <div class="cphw-notification">
                  <div class="cphw-notification-top">
                    <span class="cphw-notification-icon">
                      <i class="fa-solid fa-bell"></i>
                    </span>

                    <strong>Cartinno Update</strong>

                    <small>Now</small>
                  </div>

                  <p>
                    Your latest sales and inventory
                    activity is ready to review.
                  </p>

                  <span class="cphw-notification-status">
                    <i class="fa-solid fa-check-double"></i>
                    Synced successfully
                  </span>
                </div>
              </template>

            </div>

          </div>
        </article>

      </div>
    </div>
  </section>
</template>
