
<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue'

import {
  resellerBrand as brand,
  resellerHowItWorksContent as content,
  resellerHowItWorksSteps as steps,
  resellerNetworkMembers as members,
  resellerCatalogProducts as products,
  resellerStorefronts as storefronts,
  resellerPerformanceMetrics as metrics,
  resellerRecentOrders as orders,
  resellerSalesChart as chart
} from './ResellerHowItWorksData.js'

import './ResellerHowItWorks.css'

const root = ref(null)
const activeStep = ref(0)
const visibleMobileSteps = ref(new Set())
const brandImageLoaded = ref(true)
const brokenImages = ref(new Set())

const currentStep = computed(() => steps[activeStep.value])
const getMember = id => members.find(m => m.id === id)
const getProduct = id => products.find(p => p.id === id)

let scrollFrame = 0
let mobileObserver = null
let desktopQuery = null

function imageFailed(key) {
  brokenImages.value = new Set([...brokenImages.value, key])
}

function imageWorks(key) {
  return !brokenImages.value.has(key)
}

function updateActiveStep() {
  if (!desktopQuery?.matches || scrollFrame) return

  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0

    const elements = root.value?.querySelectorAll('.rhw-step')
    if (!elements?.length) return

    const target = window.innerHeight * 0.52
    let closest = 0
    let smallestDistance = Infinity

    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect()
      const middle = rect.top + rect.height / 2
      const distance = Math.abs(middle - target)

      if (distance < smallestDistance) {
        smallestDistance = distance
        closest = index
      }
    })

    activeStep.value = closest
  })
}

function jumpToStep(index) {
  const target = root.value?.querySelectorAll('.rhw-step')[index]
  if (!target) return

  activeStep.value = index

  target.scrollIntoView({
    behavior: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches ? 'auto' : 'smooth',
    block: 'center'
  })
}

onMounted(async () => {
  await nextTick()

  desktopQuery = window.matchMedia('(min-width: 1025px)')

  window.addEventListener('scroll', updateActiveStep, {
    passive: true
  })
  window.addEventListener('resize', updateActiveStep)

  desktopQuery.addEventListener('change', updateActiveStep)

  const mobileSteps = root.value?.querySelectorAll(
    '.rhw-mobile-step'
  )

  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    visibleMobileSteps.value = new Set(steps.map(s => s.id))
  } else {
    mobileObserver = new IntersectionObserver(entries => {
      const next = new Set(visibleMobileSteps.value)

      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        next.add(Number(entry.target.dataset.step))
        mobileObserver.unobserve(entry.target)
      })

      visibleMobileSteps.value = next
    }, { threshold: 0.1 })

    mobileSteps?.forEach(step => mobileObserver.observe(step))
  }

  updateActiveStep()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveStep)
  window.removeEventListener('resize', updateActiveStep)
  desktopQuery?.removeEventListener('change', updateActiveStep)
  mobileObserver?.disconnect()

  if (scrollFrame) cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <section
    ref="root"
    class="rhw-section"
    id="reseller-how-it-works"
  >
    <div class="rhw-container">

      <!-- CENTERED HEADING -->
      <header class="rhw-header">
        <h2 class="rhw-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>

        <p class="rhw-description">
          {{ content.description }}
        </p>
      </header>

      <!-- DESKTOP: STEPS + STICKY DASHBOARD -->
      <div class="rhw-desktop">

        <div class="rhw-steps">
          <div class="rhw-step-line" aria-hidden="true"></div>

          <button
            v-for="(step, index) in steps"
            :key="step.id"
            type="button"
            class="rhw-step"
            :class="{ 'rhw-step-active': activeStep === index }"
            :aria-current="activeStep === index ? 'step' : undefined"
            @click="jumpToStep(index)"
          >
            <span class="rhw-step-number">
              {{ step.number }}
            </span>

            <span class="rhw-step-copy">
              <strong class="rhw-step-title">
                {{ step.title }}
              </strong>

              <span class="rhw-step-text">
                {{ step.description }}
              </span>

              <span class="rhw-step-more">
                See it in action
                <i
                  class="fa-solid fa-arrow-right"
                  aria-hidden="true"
                ></i>
              </span>
            </span>
          </button>
        </div>

        <div class="rhw-stage-column">
          <div class="rhw-sticky">

            <div class="rhw-dashboard">

              <!-- CARTINNO HEADER -->
              <div class="rhw-appbar">
                <div class="rhw-brand">
                  <img
                    v-if="brandImageLoaded"
                    :src="brand.logo"
                    :alt="brand.name"
                    class="rhw-brand-image"
                    @error="brandImageLoaded = false"
                  />

                  <template v-else>
                    <span class="rhw-logo">C</span>
                    <strong>{{ brand.name }}</strong>
                  </template>
                </div>

                <div class="rhw-app-actions">
                  <span class="rhw-bell">
                    <i class="fa-regular fa-bell"></i>
                    <span></span>
                  </span>

                  <span class="rhw-profile">
                    <img
                      v-if="imageWorks('profile')"
                      :src="members[0].avatar"
                      alt=""
                      @error="imageFailed('profile')"
                    />
                    <span v-else>MC</span>
                  </span>
                </div>
              </div>

              <div class="rhw-viewport">
                <Transition name="rhw-switch" mode="out-in">

                  <!-- SCENE 01: RESELLER NETWORK -->
                  <div
                    v-if="activeStep === 0"
                    key="network"
                    class="rhw-scene rhw-network-scene"
                  >
                    <div class="rhw-scene-heading">
                      <div>
                        <span class="rhw-scene-eyebrow">
                          RESELLER NETWORK
                        </span>
                        <h3>Your network, connected.</h3>
                        <p>Partners, products, and orders in one place.</p>
                      </div>

                      <span class="rhw-demo-action">
                        <i class="fa-solid fa-plus"></i>
                        Invite
                      </span>
                    </div>

                    <div class="rhw-network-board">
                      <div
                        class="rhw-network-rings"
                        aria-hidden="true"
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

                      <!-- LEFT THREE PARTNERS -->
                      <div class="rhw-network-group">
                        <div
                          v-for="(member, index) in members.slice(0, 3)"
                          :key="member.id"
                          class="rhw-member"
                          :style="{ '--delay': `${index * 100}ms` }"
                        >
                          <div class="rhw-member-main">
                            <span class="rhw-avatar">
                              <img
                                v-if="imageWorks(`member-${member.id}`)"
                                :src="member.avatar"
                                :alt="member.name"
                                @error="imageFailed(`member-${member.id}`)"
                              />
                              <span v-else>{{ member.name.charAt(0) }}</span>
                            </span>

                            <div class="rhw-member-name">
                              <strong>{{ member.name }}</strong>
                              <span>{{ member.store }}</span>
                            </div>

                            <span class="rhw-member-check">
                              <i class="fa-solid fa-check"></i>
                            </span>
                          </div>

                          <span class="rhw-connected">
                            <i></i> Connected
                          </span>
                        </div>
                      </div>

                      <!-- CENTER OWNER CARD -->
                      <div class="rhw-owner-card">
                        <div class="rhw-owner-top">
                          

                          <span class="rhw-verified">
                            <i class="fa-solid fa-circle-check"></i>
                            Verified
                          </span>
                        </div>

                        <strong>{{ brand.businessName }}</strong>
                        <p>Business owner</p>

                        <div class="rhw-owner-stats">
                          <div>
                            <strong>6</strong>
                            <span>Resellers</span>
                          </div>

                          <div>
                            <strong>24</strong>
                            <span>Orders today</span>
                          </div>
                        </div>
                      </div>

                      <!-- RIGHT THREE PARTNERS -->
                      <div class="rhw-network-group">
                        <div
                          v-for="(member, index) in members.slice(3)"
                          :key="member.id"
                          class="rhw-member"
                          :style="{ '--delay': `${index * 100 + 150}ms` }"
                        >
                          <div class="rhw-member-main">
                            <span class="rhw-avatar">
                              <img
                                v-if="imageWorks(`member-${member.id}`)"
                                :src="member.avatar"
                                :alt="member.name"
                                @error="imageFailed(`member-${member.id}`)"
                              />
                              <span v-else>{{ member.name.charAt(0) }}</span>
                            </span>

                            <div class="rhw-member-name">
                              <strong>{{ member.name }}</strong>
                              <span>{{ member.store }}</span>
                            </div>

                            <span class="rhw-member-check">
                              <i class="fa-solid fa-check"></i>
                            </span>
                          </div>

                          <span class="rhw-connected">
                            <i></i> Connected
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="rhw-network-footer">
                      <span class="rhw-success-pill">
                        <i class="fa-solid fa-check"></i>
                        6 resellers connected
                      </span>

                      <div class="rhw-health">
                        Network health
                        <strong>98%</strong>
                        <span class="rhw-health-track">
                          <span></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- SCENE 02: SHARED CATALOG -->
                  <div
                    v-else-if="activeStep === 1"
                    key="catalog"
                    class="rhw-scene rhw-catalog-scene"
                  >
                    <div class="rhw-scene-heading">
                      <div>
                        <span class="rhw-scene-eyebrow">
                          SHARED CATALOG
                        </span>
                        <h3>One catalog. Every storefront.</h3>
                        <p>6 products, priced and ready to sell.</p>
                      </div>

                      <span class="rhw-success-pill">
                        <i class="fa-solid fa-check"></i>
                        Catalog shared
                      </span>
                    </div>

                    <div class="rhw-products">
                      <div
                        v-for="(product, index) in products"
                        :key="product.id"
                        class="rhw-product-card"
                        :style="{ '--delay': `${index * 65}ms` }"
                      >
                        <div
                          class="rhw-product-image"
                          :class="`rhw-product-${product.color}`"
                        >
                          <img
                            v-if="imageWorks(`product-${product.id}`)"
                            :src="product.image"
                            :alt="product.imageAlt"
                            loading="lazy"
                            @error="imageFailed(`product-${product.id}`)"
                          />

                          <i
                            v-else
                            class="fa-solid fa-box"
                            aria-hidden="true"
                          ></i>

                          <span class="rhw-sync-check">
                            <i class="fa-solid fa-check"></i>
                          </span>
                        </div>

                        <div class="rhw-product-info">
                          <strong>{{ product.name }}</strong>
                          <span>{{ product.price }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="rhw-storefront-panel">
                      <div class="rhw-storefront-heading">
                        <strong>Live on 3 storefronts</strong>
                        <span>Products synced · just now</span>
                      </div>

                      <div class="rhw-storefront-grid">
                        <div
                          v-for="store in storefronts"
                          :key="store.id"
                          class="rhw-storefront-card"
                        >
                          <div class="rhw-storefront-top">
                            <span class="rhw-store-avatar">
                              <img
                                v-if="imageWorks(`member-${store.memberId}`)"
                                :src="getMember(store.memberId)?.avatar"
                                :alt="store.name"
                                @error="imageFailed(`member-${store.memberId}`)"
                              />
                              <span v-else>
                                {{ store.name.charAt(0) }}
                              </span>
                            </span>

                            <div>
                              <strong>{{ store.name }}</strong>
                              <small>{{ store.products }}</small>
                            </div>
                          </div>

                          <span class="rhw-synced-label">
                            <i></i> Synced
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- SCENE 03: PERFORMANCE -->
                  <div
                    v-else
                    key="performance"
                    class="rhw-scene rhw-analytics-scene"
                  >
                    <div class="rhw-scene-heading">
                      <div>
                        <span class="rhw-scene-eyebrow">
                          PERFORMANCE
                        </span>
                        <h3>Every partner. Every order.</h3>
                        <p>A live view of your reseller business.</p>
                      </div>

                      <span class="rhw-success-pill">
                        <i class="rhw-live-dot"></i>
                        Live
                      </span>
                    </div>

                    <div class="rhw-metrics">
                      <div
                        v-for="metric in metrics"
                        :key="metric.id"
                        class="rhw-metric"
                      >
                        <small>{{ metric.label }}</small>
                        <strong>{{ metric.value }}</strong>
                        <span>
                          <i class="fa-solid fa-arrow-trend-up"></i>
                          {{ metric.trend }}
                        </span>
                      </div>
                    </div>

                    <div class="rhw-performance-grid">
                      <!-- LINE CHART -->
                      <div class="rhw-chart-card">
                        <div class="rhw-panel-heading">
                          <div>
                            <strong>Sales performance</strong>
                            <small>Last 6 months</small>
                          </div>

                          <span class="rhw-growth-badge">
                            <i class="fa-solid fa-arrow-trend-up"></i>
                            +32.4%
                          </span>
                        </div>

                        <div class="rhw-chart">
                          <div class="rhw-chart-labels">
                            <span>$60k</span>
                            <span>$40k</span>
                            <span>$20k</span>
                            <span>$0</span>
                          </div>

                          <svg
                            viewBox="0 0 600 260"
                            preserveAspectRatio="none"
                            class="rhw-chart-svg"
                            role="img"
                            aria-label="Illustrative sales growth chart"
                          >
                            <defs>
                              <linearGradient
                                id="rhw-sales-fill"
                                x1="0" y1="0" x2="0" y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stop-color="#d7454e"
                                  stop-opacity="0.20"
                                />
                                <stop
                                  offset="100%"
                                  stop-color="#d7454e"
                                  stop-opacity="0.01"
                                />
                              </linearGradient>
                            </defs>

                            <path
                              class="rhw-gridline"
                              d="M0 15 H600 M0 88 H600 M0 163 H600 M0 240 H600"
                            />

                            <path
                              class="rhw-chart-area"
                              :d="chart.area"
                              fill="url(#rhw-sales-fill)"
                            />

                            <path
                              class="rhw-chart-line"
                              :d="chart.path"
                              pathLength="1"
                            />

                            <circle
                              cx="600"
                              cy="0"
                              r="6"
                              class="rhw-chart-end"
                            />
                          </svg>

                          <div class="rhw-chart-months">
                            <span
                              v-for="month in chart.months"
                              :key="month"
                            >
                              {{ month }}
                            </span>
                          </div>
                        </div>

                        <div class="rhw-order-toast">
                          <span>
                            <i class="fa-solid fa-cart-shopping"></i>
                          </span>
                          <div>
                            <strong>New order · $246.00</strong>
                            <small>Maya's Market · just now</small>
                          </div>
                        </div>
                      </div>

                      <!-- RECENT ORDERS -->
                      <div class="rhw-orders-card">
                        <div class="rhw-panel-heading">
                          <div>
                            <strong>Recent orders</strong>
                            <small>Across your network</small>
                          </div>
                          <span class="rhw-panel-link">
                            View all
                          </span>
                        </div>

                        <div class="rhw-orders-list">
                          <div
                            v-for="order in orders"
                            :key="order.id"
                            class="rhw-order-row"
                          >
                            <span class="rhw-order-thumb">
                              <img
                                v-if="imageWorks(`product-${order.productId}`)"
                                :src="getProduct(order.productId)?.image"
                                alt=""
                                @error="imageFailed(`product-${order.productId}`)"
                              />
                              <i v-else class="fa-solid fa-box"></i>
                            </span>

                            <div class="rhw-order-copy">
                              <strong>
                                {{ order.id }} · {{ order.amount }}
                              </strong>
                              <small>{{ order.customer }}</small>
                            </div>

                            <span
                              class="rhw-order-status"
                              :class="{
                                'rhw-order-processing':
                                  order.status === 'Processing'
                              }"
                            >
                              {{ order.status }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="rhw-growth-footer">
                      <div class="rhw-avatar-stack">
                        <span
                          v-for="member in members.slice(0, 4)"
                          :key="member.id"
                        >
                          <img
                            v-if="imageWorks(`member-${member.id}`)"
                            :src="member.avatar"
                            :alt="member.name"
                            @error="imageFailed(`member-${member.id}`)"
                          />
                          <span v-else>{{ member.name.charAt(0) }}</span>
                        </span>
                      </div>

                      <p>
                        Network grew to
                        <strong>24 active resellers</strong>
                        this month.
                      </p>

                      <strong class="rhw-growth-value">
                        <i class="fa-solid fa-arrow-trend-up"></i>
                        +32.4%
                      </strong>
                    </div>
                  </div>

                </Transition>
              </div>
            </div>

            <div class="rhw-stage-caption">
              <span>
                <i></i>
                {{ currentStep.label }}
              </span>
              <span>{{ currentStep.number }} / 03</span>
            </div>

          </div>
        </div>
      </div>

      <!-- TABLET / MOBILE -->
      <div class="rhw-mobile">
        <article
          v-for="step in steps"
          :key="step.id"
          class="rhw-mobile-step"
          :class="{
            'rhw-mobile-visible': visibleMobileSteps.has(step.id)
          }"
          :data-step="step.id"
        >
          <div class="rhw-mobile-copy">
            <span class="rhw-mobile-number">
              {{ step.number }}
            </span>

            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>

          <div class="rhw-mobile-dashboard">
            <div class="rhw-mobile-appbar">
              <span class="rhw-logo">C</span>
              <strong>cartinno</strong>
            </div>

            <!-- MOBILE NETWORK -->
            <div
              v-if="step.id === 1"
              class="rhw-mobile-panel"
            >
              <h4>Your network, connected.</h4>

              <div class="rhw-mobile-owner">
                <span class="rhw-logo">C</span>
                <strong>{{ brand.businessName }}</strong>
                <small>Business owner</small>
              </div>

              <div class="rhw-mobile-members">
                <div
                  v-for="member in members"
                  :key="member.id"
                  class="rhw-mobile-member"
                >
                  <span class="rhw-avatar">
                    <img
                      v-if="imageWorks(`member-${member.id}`)"
                      :src="member.avatar"
                      :alt="member.name"
                      @error="imageFailed(`member-${member.id}`)"
                    />
                    <span v-else>
                      {{ member.name.charAt(0) }}
                    </span>
                  </span>

                  <div>
                    <strong>{{ member.name }}</strong>
                    <small>{{ member.store }}</small>
                  </div>

                  <i class="fa-solid fa-circle-check"></i>
                </div>
              </div>
            </div>

            <!-- MOBILE PRODUCTS -->
            <div
              v-else-if="step.id === 2"
              class="rhw-mobile-panel"
            >
              <h4>One catalog. Every storefront.</h4>

              <div class="rhw-mobile-products">
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="rhw-mobile-product"
                >
                  <div class="rhw-mobile-product-image">
                    <img
                      v-if="imageWorks(`product-${product.id}`)"
                      :src="product.image"
                      :alt="product.imageAlt"
                      loading="lazy"
                      @error="imageFailed(`product-${product.id}`)"
                    />
                  </div>

                  <strong>{{ product.name }}</strong>
                  <small>{{ product.price }}</small>
                </div>
              </div>

              <span class="rhw-mobile-confirmation">
                <i class="fa-solid fa-circle-check"></i>
                Catalog shared with your resellers
              </span>
            </div>

            <!-- MOBILE PERFORMANCE -->
            <div
              v-else
              class="rhw-mobile-panel"
            >
              <h4>Every partner. Every order.</h4>

              <div class="rhw-mobile-metrics">
                <div v-for="metric in metrics" :key="metric.id">
                  <small>{{ metric.label }}</small>
                  <strong>{{ metric.value }}</strong>
                  <span>{{ metric.trend }}</span>
                </div>
              </div>

              <div class="rhw-mobile-chart">
                <strong>Sales performance</strong>
                <svg
                  viewBox="0 0 600 260"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Illustrative sales growth"
                >
                  <path
                    :d="chart.path"
                    class="rhw-chart-line"
                    pathLength="1"
                  />
                </svg>
              </div>

              <div
                v-for="order in orders"
                :key="order.id"
                class="rhw-mobile-order"
              >
                <span>{{ order.id }}</span>
                <strong>{{ order.amount }}</strong>
                <small>{{ order.status }}</small>
              </div>
            </div>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>
