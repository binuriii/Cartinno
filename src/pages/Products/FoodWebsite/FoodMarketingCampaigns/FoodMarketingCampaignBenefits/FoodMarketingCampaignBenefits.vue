<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  foodMarketingCampaignBenefitsContent as content,
  foodMarketingCampaignBenefits as benefits,
  foodCampaignDemo as demo
} from './FoodMarketingCampaignBenefits.js'

import './FoodMarketingCampaignBenefits.css'

const sectionRef = ref(null)
const phase = ref(0)
const inView = ref(false)
const reducedMotion = ref(false)

const stage = computed(() => demo.stages[phase.value])

let observer = null
let timer = null
let motionPreference = null

function stopDemo() {
  if (timer !== null) {
    window.clearInterval(timer)
    timer = null
  }
}

function startDemo() {
  if (
    timer !== null ||
    !inView.value ||
    reducedMotion.value
  ) return

  timer = window.setInterval(() => {
    phase.value = (phase.value + 1) % demo.stages.length
  }, 2600)
}

function selectPhase(index) {
  phase.value = index
}

function updateMotion() {
  reducedMotion.value = motionPreference.matches

  if (reducedMotion.value) {
    stopDemo()
  } else {
    startDemo()
  }
}

watch(inView, (visible) => {
  if (visible) {
    startDemo()
  } else {
    stopDemo()
  }
})

onMounted(() => {
  motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  updateMotion()
  motionPreference.addEventListener('change', updateMotion)

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        inView.value = entry.isIntersecting
      },
      { threshold: 0.08 }
    )

    if (sectionRef.value) {
      observer.observe(sectionRef.value)
    }
  } else {
    inView.value = true
  }
})

onBeforeUnmount(() => {
  stopDemo()
  observer?.disconnect()
  motionPreference?.removeEventListener('change', updateMotion)
})
</script>

<template>
  <section
    ref="sectionRef"
    class="fmc-benefits mcb-v2"
    :class="{
      'fmc-benefits--running': inView && !reducedMotion,
      'fmc-benefits--reduced': reducedMotion
    }"
    aria-labelledby="fmc-benefits-heading"
  >
    <div class="fmc-benefits-shell">

      <!-- HEADING -->
      <header class="fmc-benefits-heading">
        <h2 id="fmc-benefits-heading">
          {{ content.headingFirst }}<br>
          <span>{{ content.headingSecond }}</span>
        </h2>

        <p>{{ content.description }}</p>
      </header>

      <!-- THREE BENEFIT CARDS -->
      <div class="fmc-benefits-grid">

        <article
          v-for="(benefit, index) in benefits"
          :key="benefit.id"
          class="fmc-benefit-reveal"
          :class="`fmc-benefit-reveal--${benefit.id}`"
          :style="{ '--fmc-delay': `${index * 100}ms` }"
        >
          <div
            class="fmc-benefit-card"
            :class="[
              `fmc-benefit-card--${benefit.id}`,
              `fmc-phase-${phase}`
            ]"
          >

            <!-- CARD COPY -->
            <div class="fmc-benefit-copy">

              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>

            <!-- MINI CARTINNO PREVIEW -->
            <div class="fmc-benefit-app" aria-hidden="true">

              <div class="fmc-benefit-appbar">
                <span class="fmc-benefit-brand">
                  cartinno<span>.</span>
                </span>

                <span class="fmc-benefit-app-label">
                  {{ benefit.id === 'visibility' ? 'DISCOVERY' : benefit.id === 'orders' ? 'ONLINE MENU' : 'CAMPAIGNS' }}
                </span>

                <span class="fmc-benefit-avatar">G</span>
              </div>

              <!-- 01: RESTAURANT DISCOVERY -->
              <div
                v-if="benefit.id === 'visibility'"
                class="fmc-benefit-appbody"
              >
                <div class="fmc-benefit-screen-title">
                  <strong>Discover local favourites</strong>
                  <span class="fmc-demo-status">{{ stage.visibility }}</span>
                </div>

                <div class="fmc-discovery-search">
                  <span class="fmc-search-symbol">⌕</span>
                  <span>Find something delicious</span>
                  <span>☷</span>
                </div>

                <div class="fmc-restaurant-preview">
                  <img
                    :src="demo.dishes[0].image"
                    :alt="demo.dishes[0].name"
                    loading="lazy"
                  />

                  <div class="fmc-restaurant-copy">
                    <small>RESTAURANT SPOTLIGHT</small>
                    <strong>{{ demo.restaurant }}</strong>
                    <span>Fresh food. Your next favourite.</span>
                    <div class="fmc-discovery-link">
                      Explore restaurant <b>↗</b>
                    </div>
                  </div>
                </div>

                <div class="fmc-discovery-foot">
                  <span class="fmc-live-dot"></span>
                  {{ stage.visibility }}
                </div>
              </div>

              <!-- 02: MENU AND ORDERING -->
              <div
                v-else-if="benefit.id === 'orders'"
                class="fmc-benefit-appbody"
              >
                <div class="fmc-benefit-screen-title">
                  <strong>Today's menu</strong>
                  <span class="fmc-demo-status">{{ stage.traffic }}</span>
                </div>

                <div class="fmc-menu-feature">
                  <img
                    :src="demo.dishes[phase === 1 ? 1 : 0].image"
                    :alt="demo.dishes[phase === 1 ? 1 : 0].name"
                    loading="lazy"
                  />

                  <div class="fmc-menu-feature-overlay">
                    <small>{{ demo.dishes[phase === 1 ? 1 : 0].category }}</small>
                    <strong>{{ demo.dishes[phase === 1 ? 1 : 0].name }}</strong>
                  </div>
                </div>

                <div class="fmc-menu-details">
                  <div>
                    <span>Discover the menu</span>
                    <strong>Made fresh for you</strong>
                  </div>
                  <span class="fmc-menu-arrow">↗</span>
                </div>

                <div class="fmc-menu-action">
                  <span>Explore menu</span>
                  <b>→</b>
                </div>

                <div class="fmc-discovery-foot">
                  <span class="fmc-live-dot"></span>
                  {{ stage.traffic }}
                </div>
              </div>

              <!-- 03: RETURNING CUSTOMER CAMPAIGN -->
              <div
                v-else
                class="fmc-benefit-appbody"
              >
                <div class="fmc-benefit-screen-title">
                  <strong>Restaurant campaign</strong>
                  <span class="fmc-demo-status">{{ stage.label }}</span>
                </div>

                <div class="fmc-return-promo">
                  <small>FROM OUR KITCHEN TO YOU</small>
                  <strong>{{ stage.returnMessage }}</strong>
                  <span>{{ demo.discount }}</span>
                  <div class="fmc-promo-decoration"></div>
                </div>

                <div class="fmc-return-message">
                  <span class="fmc-return-avatar">G</span>
                  <div>
                    <small>CAMPAIGN PREVIEW</small>
                    <strong>{{ demo.campaign }}</strong>
                    <p>Discover what's new at {{ demo.restaurant }}.</p>
                  </div>
                </div>

                <div class="fmc-menu-action fmc-menu-action--return">
                  <span>Discover this week's favourites</span>
                  <b>↗</b>
                </div>

                <div class="fmc-discovery-foot">
                  <span class="fmc-live-dot"></span>
                  Keep your restaurant top of mind
                </div>
              </div>

              <div class="fmc-benefit-appfooter">
                <span>Illustrative preview</span>

                <div class="fmc-benefit-stepdots">
                  <i
                    v-for="(_, dotIndex) in demo.stages"
                    :key="dotIndex"
                    :class="{ 'fmc-benefit-step-active': phase === dotIndex }"
                  ></i>
                </div>
              </div>

            </div>
          </div>
        </article>

      </div>

    </div>
  </section>
</template>