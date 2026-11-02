
<script setup>
import { ref, computed } from 'vue'

import {
  onlineOrderingBenefitsContent as content,
  onlineOrderingBenefits as steps,
  onlineOrderingDemoRestaurant as restaurant,
  onlineOrderingDemoDishes as dishes,
  onlineOrderingCustomerPreview as customer,
  onlineOrderingRevenuePreview as revenue
} from './OnlineOrderingBenefitsData.js'

import './OnlineOrderingBenefits.css'

const activeStep = ref(0)
const brokenImages = ref(new Set())

const currentStep = computed(
  () => steps[activeStep.value]
)

function selectStep(index) {
  activeStep.value = index
}

function imageAvailable(dish) {
  return Boolean(dish.image) &&
    !brokenImages.value.has(dish.id)
}

function imageError(id) {
  brokenImages.value = new Set([
    ...brokenImages.value,
    id
  ])
}
</script>

<template>
  <section
    id="online-ordering-benefits"
    class="oob-section"
  >
    <div class="oob-container">

      <!-- SECTION HEADER -->
      <header class="oob-header">

        <h2 class="oob-heading">
          {{ content.title }}
        </h2>

        <p class="oob-intro">
          {{ content.description }}
        </p>

      </header>

      <!-- TWO LARGE PANELS -->
      <div class="oob-grid">

        <!-- =====================================
             LEFT: CUSTOMER ORDERING EXPERIENCE
        ====================================== -->
        <article class="oob-panel oob-panel-color">

          <div class="oob-panel-top">
            <div class="oob-panel-copy">

              <h3>
                Delicious food.
                <br />
                Easy ordering.
              </h3>

              <p>
                Give guests a beautiful way to explore
                your menu and order directly from
                your restaurant.
              </p>

            </div>
          </div>

          <!-- CUSTOMER ORDERING MOCKUP -->
          <div class="oob-ordering-visual">

            <div class="oob-glow oob-glow-one"></div>
            <div class="oob-glow oob-glow-two"></div>

            <div class="oob-ordering-window">

              <!-- TOP BAR -->
              <div class="oob-window-top">

                <span class="oob-window-brand">
                  <i class="fa-solid fa-utensils"></i>
                  {{ restaurant.name }}
                </span>

                <span class="oob-window-menu">
                  <i class="fa-solid fa-bars"></i>
                </span>

              </div>

              <!-- RESTAURANT INTRO -->
              <div class="oob-restaurant-intro">

                <span>
                  {{ restaurant.subtitle }}
                </span>

                <h4>
                  What are you craving?
                </h4>

                <div class="oob-food-categories">
                  <span
                    v-for="(category, index) in restaurant.categories"
                    :key="category"
                    :class="{ active: index === 0 }"
                  >
                    {{ category }}
                  </span>
                </div>

              </div>

              <!-- FOOD PRODUCTS -->
              <div class="oob-food-grid">

                <div
                  v-for="dish in dishes.slice(0, 2)"
                  :key="dish.id"
                  class="oob-food-card"
                >

                  <div class="oob-food-photo">

                    <img
                      v-if="imageAvailable(dish)"
                      :src="dish.image"
                      :alt="dish.name"
                      loading="lazy"
                      @error="imageError(dish.id)"
                    />

                    <i
                      v-else
                      class="fa-solid fa-utensils"
                      aria-hidden="true"
                    ></i>

                  </div>

                  <strong>{{ dish.name }}</strong>

                  <div class="oob-food-bottom">
                    <span>{{ dish.price }}</span>

                    <span class="oob-food-plus">
                      <i class="fa-solid fa-plus"></i>
                    </span>
                  </div>

                </div>

              </div>

              <!-- ORDER BAR -->
              <div class="oob-order-bar">

                <span>
                  <i class="fa-solid fa-bag-shopping"></i>
                  Your order
                </span>

                <span class="oob-order-action">
                  {{ restaurant.orderingLabel }}
                  <i class="fa-solid fa-arrow-right"></i>
                </span>

              </div>

            </div>

            <!-- FLOATING NOTIFICATION -->
            <Transition
              name="oob-notification"
              mode="out-in"
            >
              <div
                :key="currentStep.id"
                class="oob-floating-notice"
              >

                <span class="oob-notice-icon">
                  <i class="fa-solid fa-circle-check"></i>
                </span>

                <div>
                  <strong>
                    {{ currentStep.status }}
                  </strong>

                  <span>
                    Powered by Cartinno
                  </span>
                </div>

              </div>
            </Transition>

          </div>
        </article>

        <!-- =====================================
             RIGHT: RESTAURANT DASHBOARD
        ====================================== -->
        <article class="oob-panel oob-panel-light">

          <div class="oob-panel-top">
            <div class="oob-panel-copy">

              <h3>
                More than orders.
                <br />
                More control.
              </h3>

              <p>
                Keep your orders, customers, and
                direct sales connected in one
                organized workspace.
              </p>

            </div>
          </div>

          <!-- DASHBOARD MOCKUP -->
          <div class="oob-dashboard-visual">

            <div class="oob-dashboard">

              <!-- DASHBOARD HEADER -->
              <div class="oob-dashboard-top">

                <div class="oob-dashboard-logo">
                <img
                    src="/cartinno-logo.webp"
                    alt="Cartinno"
                    class="oob-dashboard-logo-image"
                />
                </div>

                <div class="oob-dashboard-actions">
                  <i class="fa-regular fa-bell"></i>

                  <span class="oob-dashboard-avatar">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>

              </div>

              <!-- DASHBOARD BODY -->
              <div class="oob-dashboard-body">

                <div class="oob-dashboard-heading">

                  <div>
                    <small>
                      Restaurant overview
                    </small>

                    <strong>
                      {{ currentStep.shortTitle }}
                    </strong>
                  </div>

                  <span class="oob-live-pill">
                    <i></i>
                    Connected
                  </span>

                </div>

                <!-- STEP-DEPENDENT CONTENT -->
                <Transition
                  name="oob-dashboard-change"
                  mode="out-in"
                >
                  <div
                    :key="currentStep.id"
                    class="oob-dashboard-dynamic"
                  >

                    <!-- STEP 01: DIRECT ORDERS -->
                    <template v-if="activeStep === 0">

                      <div class="oob-order-summary">

                        <span class="oob-summary-icon">
                          <i class="fa-solid fa-bag-shopping"></i>
                        </span>

                        <div>
                          <small>Incoming order</small>
                          <strong>
                            {{ currentStep.dashboardTitle }}
                          </strong>

                          <span>
                            {{ currentStep.dashboardSubtitle }}
                          </span>
                        </div>

                        <span class="oob-summary-check">
                          <i class="fa-solid fa-check"></i>
                        </span>

                      </div>

                      <div class="oob-dashboard-dishes">

                        <div
                          v-for="dish in dishes"
                          :key="dish.id"
                          class="oob-dashboard-dish"
                        >

                          <div class="oob-dashboard-food-photo">

                            <img
                              v-if="imageAvailable(dish)"
                              :src="dish.image"
                              :alt="dish.name"
                              loading="lazy"
                              @error="imageError(dish.id)"
                            />

                            <i
                              v-else
                              class="fa-solid fa-utensils"
                            ></i>

                          </div>

                          <strong>{{ dish.name }}</strong>
                          <span>{{ dish.price }}</span>

                        </div>

                      </div>

                    </template>

                    <!-- STEP 02: CUSTOMER RELATIONSHIPS -->
                    <template v-else-if="activeStep === 1">

                      <div class="oob-customer-profile">

                        <span class="oob-customer-avatar">
                          {{ customer.initials }}
                        </span>

                        <div>
                          <small>{{ customer.label }}</small>
                          <strong>{{ customer.name }}</strong>
                        </div>

                        <span class="oob-profile-check">
                          <i class="fa-solid fa-check"></i>
                        </span>

                      </div>

                      <div class="oob-customer-details">

                        <div
                          v-for="(detail, index) in customer.details"
                          :key="detail"
                          class="oob-customer-detail"
                        >
                          <i
                            :class="
                              index === 0
                                ? 'fa-solid fa-clock-rotate-left'
                                : 'fa-solid fa-user-check'
                            "
                          ></i>

                          <span>{{ detail }}</span>

                          <i class="fa-solid fa-check"></i>
                        </div>

                      </div>

                    </template>

                    <!-- STEP 03: COMMISSION-FREE ORDERS -->
                    <template v-else>

                      <div class="oob-revenue-card">

                        <small>{{ revenue.label }}</small>

                        <strong>{{ revenue.amount }}</strong>

                        <div class="oob-revenue-status">
                          <i class="fa-solid fa-circle-check"></i>
                          Direct website order
                        </div>

                      </div>

                      <div class="oob-fee-row">

                        <div>
                          <small>{{ revenue.feeLabel }}</small>
                          <strong>{{ revenue.feeValue }}</strong>
                        </div>

                        <span class="oob-no-fee">
                          No marketplace fee
                        </span>

                      </div>

                    </template>

                    <!-- COMMON STEP SUMMARY -->
                    <div class="oob-dashboard-summary">

                      <span class="oob-dashboard-summary-icon">
                        <i :class="currentStep.icon"></i>
                      </span>

                      <div>
                        <small>
                          Cartinno online ordering
                        </small>

                        <strong>
                          {{ currentStep.highlight }}
                        </strong>
                      </div>

                      <span class="oob-summary-check">
                        <i class="fa-solid fa-check"></i>
                      </span>

                    </div>

                  </div>
                </Transition>

              </div>

            </div>

            <!-- FLOATING CONFIRMATION -->
            <Transition
              name="oob-notification"
              mode="out-in"
            >
              <div
                :key="currentStep.id"
                class="oob-floating-confirmation"
              >

                <span class="oob-confirm-icon">
                  <i class="fa-solid fa-check"></i>
                </span>

                <div>
                  <strong>
                    {{ currentStep.dashboardTitle }}
                  </strong>

                  <small>
                    {{ currentStep.dashboardSubtitle }}
                  </small>
                </div>

              </div>
            </Transition>

          </div>
        </article>

      </div>

      <!-- =====================================
           THREE INTERACTIVE BENEFIT SELECTORS
      ====================================== -->
      <div class="oob-steps">

        <button
          v-for="(step, index) in steps"
          :key="step.id"
          type="button"
          class="oob-step"
          :class="{
            'oob-step-active': activeStep === index
          }"
          :aria-pressed="activeStep === index"
          @click="selectStep(index)"
        >

          <span class="oob-step-number">
            {{ step.number }}
          </span>

          <span class="oob-step-content">

            <strong>
              {{ step.title }}
            </strong>

            <span>
              {{ step.description }}
            </span>

          </span>

        </button>

      </div>

    </div>
  </section>
</template>
