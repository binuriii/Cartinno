<script setup>
import { ref, computed } from 'vue'

import {
  loyaltyFeaturesContent as content,
  loyaltyFeatures as steps,
  loyaltyDemoRestaurant as restaurant,
  loyaltyDemoRewards as rewards,
  loyaltyVisitsPreview as visits,
  loyaltyRewardPreview as reward,
  loyaltyRelationshipPreview as relationship
} from './LoyaltyFeaturesData.js'

import './LoyaltyFeatures.css'

const activeStep = ref(0)
const brokenImages = ref(new Set())

const currentStep = computed(
  () => steps[activeStep.value]
)

function selectStep(index) {
  activeStep.value = index
}

function imageAvailable(item, group) {
  return Boolean(item.image) &&
    !brokenImages.value.has(group + '-' + item.id)
}

function imageError(item, group) {
  brokenImages.value = new Set([
    ...brokenImages.value,
    group + '-' + item.id
  ])
}
</script>

<template>
  <section
    id="loyalty-features"
    class="lf-section"
  >
    <div class="lf-container">

      <!-- SECTION HEADER -->
      <header class="lf-header">

        <h2 class="lf-heading">
          {{ content.title }}
        </h2>

        <p
          v-if="content.description"
          class="lf-intro"
        >
          {{ content.description }}
        </p>

      </header>

      <!-- TWO LARGE PANELS -->
      <div class="lf-grid">

        <!-- =====================================
             LEFT: CUSTOMER REWARDS EXPERIENCE
        ====================================== -->
        <article class="lf-panel lf-panel-color">

          <div class="lf-panel-top">
            <div class="lf-panel-copy">

              <h3>
                Rewards guests
                <br />
                love to use.
              </h3>

              <p>
                Give customers a simple way to earn,
                track, and redeem rewards every time
                they visit.
              </p>

            </div>
          </div>

          <!-- CUSTOMER REWARDS MOCKUP -->
          <div class="lf-rewards-visual">

            <div class="lf-glow lf-glow-one"></div>
            <div class="lf-glow lf-glow-two"></div>

            <div class="lf-rewards-window">

              <!-- TOP BAR -->
              <div class="lf-window-top">

                <span class="lf-window-brand">
                  <i class="fa-solid fa-utensils"></i>
                  {{ restaurant.name }}
                </span>

                <span class="lf-window-menu">
                  <i class="fa-solid fa-bars"></i>
                </span>

              </div>

              <!-- MEMBER INTRO -->
              <div class="lf-member-intro">

                <span>
                  {{ restaurant.subtitle }}
                </span>

                <h4>
                  {{ restaurant.heading }}
                </h4>

                <div class="lf-progress">
                  <div
                    class="lf-progress-fill"
                    :style="{ width: restaurant.progress + '%' }"
                  ></div>
                </div>

                <div class="lf-reward-tabs">
                  <span
                    v-for="(tier, index) in restaurant.tiers"
                    :key="tier"
                    :class="{ active: index === 0 }"
                  >
                    {{ tier }}
                  </span>
                </div>

              </div>

              <!-- REWARD CARDS -->
              <div class="lf-reward-grid">

                <div
                  v-for="item in rewards.slice(0, 2)"
                  :key="item.id"
                  class="lf-reward-card"
                >

                  <div class="lf-reward-photo">

                    <img
                      v-if="imageAvailable(item, 'reward')"
                      :src="item.image"
                      :alt="item.name"
                      loading="lazy"
                      @error="imageError(item, 'reward')"
                    />

                    <i
                      v-else
                      class="fa-solid fa-gift"
                      aria-hidden="true"
                    ></i>

                  </div>

                  <strong>{{ item.name }}</strong>

                  <div class="lf-reward-bottom">
                    <span>{{ item.points }}</span>

                    <span class="lf-reward-plus">
                      <i class="fa-solid fa-plus"></i>
                    </span>
                  </div>

                </div>

              </div>

              <!-- REDEEM BAR -->
              <div class="lf-redeem-bar">

                <span>
                  <i class="fa-solid fa-star"></i>
                  Your points
                </span>

                <span class="lf-redeem-action">
                  {{ restaurant.actionLabel }}
                  <i class="fa-solid fa-arrow-right"></i>
                </span>

              </div>

            </div>

            <!-- FLOATING NOTIFICATION -->
            <Transition
              name="lf-notification"
              mode="out-in"
            >
              <div
                :key="currentStep.id"
                class="lf-floating-notice"
              >

                <span class="lf-notice-icon">
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
             RIGHT: RESTAURANT LOYALTY DASHBOARD
        ====================================== -->
        <article class="lf-panel lf-panel-light">

          <div class="lf-panel-top">
            <div class="lf-panel-copy">

              <h3>
                More than visits.
                <br />
                More connection.
              </h3>

              <p>
                See who keeps coming back and reward
                them from one organized workspace.
              </p>

            </div>
          </div>

          <!-- DASHBOARD MOCKUP -->
          <div class="lf-dashboard-visual">

            <div class="lf-dashboard">

              <!-- DASHBOARD HEADER -->
              <div class="lf-dashboard-top">

                <div class="lf-dashboard-logo">
                  <img
                    src="/cartinno-logo.webp"
                    alt="Cartinno"
                    class="lf-dashboard-logo-image"
                  />
                </div>

                <div class="lf-dashboard-actions">
                  <i class="fa-regular fa-bell"></i>

                  <span class="lf-dashboard-avatar">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>

              </div>

              <!-- DASHBOARD BODY -->
              <div class="lf-dashboard-body">

                <div class="lf-dashboard-heading">

                  <div>
                    <small>
                      Loyalty overview
                    </small>

                    <strong>
                      {{ currentStep.shortTitle }}
                    </strong>
                  </div>

                  <span class="lf-live-pill">
                    <i></i>
                    Connected
                  </span>

                </div>

                <!-- STEP-DEPENDENT CONTENT -->
                <Transition
                  name="lf-dashboard-change"
                  mode="out-in"
                >
                  <div
                    :key="currentStep.id"
                    class="lf-dashboard-dynamic"
                  >

                    <!-- STEP 01: RETURN VISITS -->
                    <template v-if="activeStep === 0">

                      <div class="lf-visit-summary">

                        <span class="lf-summary-icon">
                          <i class="fa-solid fa-rotate"></i>
                        </span>

                        <div>
                          <small>{{ visits.label }}</small>
                          <strong>
                            {{ currentStep.dashboardTitle }}
                          </strong>

                          <span>
                            {{ currentStep.dashboardSubtitle }}
                          </span>
                        </div>

                        <span class="lf-summary-check">
                          <i class="fa-solid fa-check"></i>
                        </span>

                      </div>

                      <div class="lf-dashboard-stats">

                        <div
                          v-for="stat in visits.stats"
                          :key="stat.id"
                          class="lf-dashboard-stat"
                        >

                          <div class="lf-dashboard-stat-icon">

                            <img
                              v-if="imageAvailable(stat, 'stat')"
                              :src="stat.image"
                              :alt="stat.label"
                              loading="lazy"
                              @error="imageError(stat, 'stat')"
                            />

                            <i
                              v-else
                              class="fa-solid fa-star"
                              aria-hidden="true"
                            ></i>

                          </div>

                          <strong>{{ stat.value }}</strong>
                          <span>{{ stat.label }}</span>

                        </div>

                      </div>

                    </template>

                    <!-- STEP 02: CUSTOMER REWARDS -->
                    <template v-else-if="activeStep === 1">

                      <div class="lf-customer-profile">

                        <span class="lf-customer-avatar">
                          {{ reward.initials }}
                        </span>

                        <div>
                          <small>{{ reward.label }}</small>
                          <strong>{{ reward.name }}</strong>
                        </div>

                        <span class="lf-profile-check">
                          <i class="fa-solid fa-check"></i>
                        </span>

                      </div>

                      <div class="lf-customer-details">

                        <div
                          v-for="(detail, index) in reward.details"
                          :key="detail"
                          class="lf-customer-detail"
                        >
                          <i
                            :class="
                              index === 0
                                ? 'fa-solid fa-gift'
                                : 'fa-solid fa-star'
                            "
                          ></i>

                          <span>{{ detail }}</span>

                          <i class="fa-solid fa-check"></i>
                        </div>

                      </div>

                    </template>

                    <!-- STEP 03: LASTING RELATIONSHIPS -->
                    <template v-else>

                      <div class="lf-relationship-card">

                        <small>{{ relationship.label }}</small>

                        <strong>{{ relationship.amount }}</strong>

                        <div class="lf-relationship-status">
                          <i class="fa-solid fa-circle-check"></i>
                          Returning guest
                        </div>

                      </div>

                      <div class="lf-favorite-row">

                        <div>
                          <small>{{ relationship.feeLabel }}</small>
                          <strong>{{ relationship.feeValue }}</strong>
                        </div>

                        <span class="lf-regular-badge">
                          {{ relationship.badge }}
                        </span>

                      </div>

                    </template>

                    <!-- COMMON STEP SUMMARY -->
                    <div class="lf-dashboard-summary">

                      <span class="lf-dashboard-summary-icon">
                        <i :class="currentStep.icon"></i>
                      </span>

                      <div>
                        <small>
                          Cartinno loyalty
                        </small>

                        <strong>
                          {{ currentStep.highlight }}
                        </strong>
                      </div>

                      <span class="lf-summary-check">
                        <i class="fa-solid fa-check"></i>
                      </span>

                    </div>

                  </div>
                </Transition>

              </div>

            </div>

            <!-- FLOATING CONFIRMATION -->
            <Transition
              name="lf-notification"
              mode="out-in"
            >
              <div
                :key="currentStep.id"
                class="lf-floating-confirmation"
              >

                <span class="lf-confirm-icon">
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
      <div class="lf-steps">

        <button
          v-for="(step, index) in steps"
          :key="step.id"
          type="button"
          class="lf-step"
          :class="{
            'lf-step-active': activeStep === index
          }"
          :aria-pressed="activeStep === index"
          @click="selectStep(index)"
        >

          <span class="lf-step-number">
            {{ step.number }}
          </span>

          <span class="lf-step-content">

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