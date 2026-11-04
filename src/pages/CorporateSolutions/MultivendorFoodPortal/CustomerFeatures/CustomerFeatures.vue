
<script setup>
import { ref, computed } from 'vue'

import {
  customerFeaturesContent,
  customerFeatures
} from './CustomerFeaturesData.js'

import './CustomerFeatures.css'

const discoveryIds = [1, 3, 4, 10, 11, 12]
const orderingIds = [2, 5, 6, 7, 8, 9]

const discoveryFeatures = customerFeatures.filter(feature =>
  discoveryIds.includes(feature.id)
)

const orderingFeatures = customerFeatures.filter(feature =>
  orderingIds.includes(feature.id)
)

const discoveryActive = ref(0)
const orderingActive = ref(0)

const activeDiscoveryFeature = computed(
  () => discoveryFeatures[discoveryActive.value]
)

const activeOrderingFeature = computed(
  () => orderingFeatures[orderingActive.value]
)

function selectDiscoveryTab(index) {
  discoveryActive.value = index
}

function selectOrderingTab(index) {
  orderingActive.value = index
}
</script>

<template>
  <section class="cuf-section" id="customer-features">
    <div class="cuf-container">

      <!-- SECTION HEADER -->
      <header class="cuf-header">
        <div class="cuf-header-copy">
          <h2 class="cuf-heading">
            {{ customerFeaturesContent.title }}
          </h2>
        </div>

        <p class="cuf-intro">
          {{ customerFeaturesContent.description }}
        </p>
      </header>

      <!-- TWO FEATURE CARDS -->
      <div class="cuf-grid">

        <!-- CARD ONE: DISCOVERY FEATURES -->
        <article class="cuf-panel cuf-panel-blue">

          <div class="cuf-panel-top">
            <div class="cuf-panel-copy">


              <h3>
                Good food.
                <br />
                Great experiences.
              </h3>

              <p>
                Discover dishes, find your favourites, explore offers
                and enjoy a more personalised food ordering experience.
              </p>
            </div>

            <span class="cuf-panel-count">
              01 — 06
            </span>
          </div>

          <!-- DISCOVERY TABS -->
          <div class="cuf-tab-area">

            <div
              class="cuf-tabs"
              role="tablist"
              aria-label="Food discovery features"
            >
              <button
                v-for="(feature, index) in discoveryFeatures"
                :key="feature.id"
                type="button"
                role="tab"
                class="cuf-tab"
                :class="{
                  'cuf-tab-active': discoveryActive === index
                }"
                :aria-selected="discoveryActive === index"
                :aria-controls="`cuf-discovery-panel-${feature.id}`"
                :id="`cuf-discovery-tab-${feature.id}`"
                @click="selectDiscoveryTab(index)"
              >
              
                <span class="cuf-tab-name">
                  {{ feature.shortTitle }}
                </span>
              </button>
            </div>

            <!-- SELECTED FEATURE CONTENT -->
            <Transition name="cuf-tab-content" mode="out-in">
              <div
                :key="activeDiscoveryFeature.id"
                class="cuf-feature-detail cuf-feature-detail-blue"
                role="tabpanel"
                :id="`cuf-discovery-panel-${activeDiscoveryFeature.id}`"
                :aria-labelledby="`cuf-discovery-tab-${activeDiscoveryFeature.id}`"
              >
                <div class="cuf-detail-top">

                  <span class="cuf-detail-number">
                    FEATURE {{ activeDiscoveryFeature.number }}
                  </span>
                </div>

                <h4>{{ activeDiscoveryFeature.title }}</h4>

                <p>{{ activeDiscoveryFeature.description }}</p>

                <div class="cuf-detail-status">
                  <span class="cuf-status-check">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <span>{{ activeDiscoveryFeature.status }}</span>
                </div>

                <div class="cuf-detail-decoration">
                  <i
                    class="fa-solid"
                    :class="activeDiscoveryFeature.icon"
                  ></i>
                </div>
              </div>
            </Transition>

            <div class="cuf-tab-footer">
              <span>Select a feature to explore</span>
              <span>
                {{ String(discoveryActive + 1).padStart(2, '0') }} / 06
              </span>
            </div>

          </div>
        </article>

        <!-- CARD TWO: ORDERING FEATURES -->
        <article class="cuf-panel cuf-panel-light">

          <div class="cuf-panel-top">
            <div class="cuf-panel-copy">
              <span class="cuf-light-brand">
                SIMPLE FOOD ORDERING
              </span>

              <h3>
                Every order.
                <br />
                Made easier.
              </h3>

              <p>
                Keep every part of your ordering journey organised,
                from your cart and delivery details to payments and account.
              </p>
            </div>

            <span class="cuf-panel-count">
              07 — 12
            </span>
          </div>

          <!-- ORDERING TABS -->
          <div class="cuf-tab-area">

            <div
              class="cuf-tabs cuf-tabs-light"
              role="tablist"
              aria-label="Ordering and account features"
            >
              <button
                v-for="(feature, index) in orderingFeatures"
                :key="feature.id"
                type="button"
                role="tab"
                class="cuf-tab"
                :class="{
                  'cuf-tab-active': orderingActive === index
                }"
                :aria-selected="orderingActive === index"
                :aria-controls="`cuf-ordering-panel-${feature.id}`"
                :id="`cuf-ordering-tab-${feature.id}`"
                @click="selectOrderingTab(index)"
              >
                <span class="cuf-tab-name">
                  {{ feature.shortTitle }}
                </span>
              </button>
            </div>

            <!-- SELECTED FEATURE CONTENT -->
            <Transition name="cuf-tab-content" mode="out-in">
              <div
                :key="activeOrderingFeature.id"
                class="cuf-feature-detail cuf-feature-detail-light"
                role="tabpanel"
                :id="`cuf-ordering-panel-${activeOrderingFeature.id}`"
                :aria-labelledby="`cuf-ordering-tab-${activeOrderingFeature.id}`"
              >
                <div class="cuf-detail-top">

                  <span class="cuf-detail-number">
                    FEATURE {{ activeOrderingFeature.number }}
                  </span>
                </div>

                <h4>{{ activeOrderingFeature.title }}</h4>

                <p>{{ activeOrderingFeature.description }}</p>

                <div class="cuf-detail-status">
                  <span class="cuf-status-check">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <span>{{ activeOrderingFeature.status }}</span>
                </div>

                <div class="cuf-detail-decoration">
                  <i
                    class="fa-solid"
                    :class="activeOrderingFeature.icon"
                  ></i>
                </div>
              </div>
            </Transition>

            <div class="cuf-tab-footer">
              <span>Select a feature to explore</span>
              <span>
                {{ String(orderingActive + 1).padStart(2, '0') }} / 06
              </span>
            </div>

          </div>
        </article>

      </div>
    </div>
  </section>
</template>
