
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import {
  giftCardHowItWorksContent,
  giftCardSteps
} from './GiftCardHowItWorksData.js'

import './GiftCardHowItWorks.css'

const sectionRef = ref(null)
const visibleSteps = ref(new Set())
const selectedAmount = ref(1)

let observer = null

function chooseAmount(index) {
  selectedAmount.value = index
}

onMounted(() => {
  const elements = sectionRef.value?.querySelectorAll(
    '.gchi-step'
  )

  if (!elements?.length) return

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    visibleSteps.value = new Set(
      giftCardSteps.map(step => step.id)
    )
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const updated = new Set(visibleSteps.value)

      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        const id = Number(entry.target.dataset.stepId)
        updated.add(id)

        observer.unobserve(entry.target)
      })

      visibleSteps.value = updated
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -25px 0px'
    }
  )

  elements.forEach(element => observer.observe(element))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="gchi-section"
    id="gift-card-how-it-works"
  >
    <div class="gchi-container">

      <!-- LEFT-ALIGNED SECTION HEADER -->
      <header class="gchi-header">

        <h2 class="gchi-heading">
          {{ giftCardHowItWorksContent.title1 }}<br />
          {{ giftCardHowItWorksContent.title2 }}
        </h2>

        <p class="gchi-intro">
          {{ giftCardHowItWorksContent.description }}
        </p>

      </header>

      <!-- THREE STEPS -->
      <div class="gchi-grid">

        <article
          v-for="step in giftCardSteps"
          :key="step.id"
          class="gchi-step"
          :class="[
            `gchi-step-${step.theme}`,
            { 'gchi-visible': visibleSteps.has(step.id) }
          ]"
          :data-step-id="step.id"
        >

          <!-- CARD MEDIA -->
          <div class="gchi-media">

            <!-- CUSTOM IMAGE -->
            <img
              v-if="step.image"
              :src="step.image"
              :alt="step.imageAlt"
              class="gchi-custom-image"
              loading="lazy"
            />

            <!-- STEP 01 - INTERACTIVE GIFT CARD -->
            <div
              v-else-if="step.id === 1"
              class="gchi-preview gchi-choose-preview"
            >
              <span class="gchi-preview-label">
                {{ step.previewLabel }}
              </span>

              <div class="gchi-gift-card">
                <div class="gchi-gift-brand">
                  <span>cartinno</span>
                  <i
                    class="fa-solid fa-gift"
                    aria-hidden="true"
                  ></i>
                </div>

                <div class="gchi-gift-middle">
                  <span>GIFT CARD</span>

                  <strong>
                    {{ step.amounts[selectedAmount] }}
                  </strong>
                </div>

                <div class="gchi-gift-bottom">
                  A little something special
                </div>
              </div>

              <div
                class="gchi-amounts"
                aria-label="Choose a sample gift card value"
              >
                <button
                  v-for="(amount, index) in step.amounts"
                  :key="amount"
                  type="button"
                  class="gchi-amount"
                  :class="{
                    'gchi-amount-active':
                      selectedAmount === index
                  }"
                  :aria-pressed="selectedAmount === index"
                  @click="chooseAmount(index)"
                >
                  {{ amount }}
                </button>
              </div>
            </div>

            <!-- STEP 02 - PERSONAL MESSAGE -->
            <div
              v-else-if="step.id === 2"
              class="gchi-preview gchi-message-preview"
            >
              <span class="gchi-preview-label">
                {{ step.previewLabel }}
              </span>

              <div class="gchi-message-card">
                <div class="gchi-message-icon">
                  <i
                    class="fa-regular fa-heart"
                    aria-hidden="true"
                  ></i>
                </div>

                <span class="gchi-message-overline">
                  A SPECIAL GIFT
                </span>

                <h4>{{ step.previewTitle }}</h4>

                <p>{{ step.message }}</p>

                <div class="gchi-message-signature">
                  <span>To</span>
                  <strong>{{ step.recipient }}</strong>
                </div>
              </div>

              <div
                class="gchi-floating-heart"
                aria-hidden="true"
              >
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>

            <!-- STEP 03 - GIFT & ENJOY -->
            <div
              v-else
              class="gchi-preview gchi-success-preview"
            >
              <span class="gchi-preview-label">
                {{ step.previewLabel }}
              </span>

              <div class="gchi-success-card">
                <div class="gchi-success-check">
                  <i
                    class="fa-solid fa-check"
                    aria-hidden="true"
                  ></i>
                </div>

                <h4>{{ step.successMessage }}</h4>

                <p>{{ step.redemptionLabel }}</p>

                <div class="gchi-gift-ticket">
                  <div class="gchi-ticket-icon">
                    <i
                      class="fa-solid fa-gift"
                      aria-hidden="true"
                    ></i>
                  </div>

                  <div>
                    <strong>Cartinno Gift Card</strong>
                    <span>Ready for redemption</span>
                  </div>

                  <i
                    class="fa-solid fa-arrow-up-right-from-square"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>

          </div>

          <!-- STEP CONTENT -->
          <div class="gchi-step-content">
            <span class="gchi-step-number">
              {{ step.number }}
            </span>

            <h3 class="gchi-step-title">
              {{ step.title }}
            </h3>

            <p class="gchi-step-description">
              {{ step.description }}
            </p>
          </div>

        </article>

      </div>
    </div>
  </section>
</template>
