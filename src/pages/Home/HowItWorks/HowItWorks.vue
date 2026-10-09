
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import './HowItWorks.css'

import {
  label,
  headline,
  intro,
  steps
} from './HowItWorksData.js'

const section = ref(null)
const visible = ref(false)
const activeStep = ref(0)
const reducedMotion = ref(false)

const ANIMATION_DURATION = 3000

let animationTimer = null
let observer = null
let motionQuery = null

const stopAnimation = () => {
  if (animationTimer !== null) {
    clearInterval(animationTimer)
    animationTimer = null
  }
}

const startAnimation = () => {
  stopAnimation()

  if (
    !visible.value ||
    reducedMotion.value ||
    document.hidden ||
    steps.length < 2
  ) {
    return
  }

  animationTimer = setInterval(() => {
    activeStep.value =
      (activeStep.value + 1) % steps.length
  }, ANIMATION_DURATION)
}

const handleVisibility = () => {
  startAnimation()
}

const handleMotionChange = (event) => {
  reducedMotion.value = event.matches
  startAnimation()
}

onMounted(() => {
  motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  reducedMotion.value = motionQuery.matches

  motionQuery.addEventListener?.(
    'change',
    handleMotionChange
  )

  document.addEventListener(
    'visibilitychange',
    handleVisibility
  )

  if (
    section.value &&
    'IntersectionObserver' in window
  ) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true
          observer.disconnect()
          startAnimation()
        }
      },
      {
        threshold: 0.12
      }
    )

    observer.observe(section.value)
  } else {
    visible.value = true
    startAnimation()
  }

  if (reducedMotion.value) {
    visible.value = true
  }
})

onBeforeUnmount(() => {
  stopAnimation()
  observer?.disconnect()

  motionQuery?.removeEventListener?.(
    'change',
    handleMotionChange
  )

  document.removeEventListener(
    'visibilitychange',
    handleVisibility
  )
})
</script>

<template>
  <section
    ref="section"
    id="how-it-works"
    class="hiw"
    :class="{ 'is-visible': visible }"
  >
    <div class="hiw-container">

      <div class="hiw-header">
        <h2 class="hiw-title">
          {{ headline.first }}
          <span>{{ headline.second }}</span>
        </h2>

        <p class="hiw-intro">
          {{ intro }}
        </p>
      </div>

      <div
        class="hiw-timeline"
        aria-label="Cartinno four-step process"
      >
        <article
          v-for="(step, index) in steps"
          :key="step.tag"
          class="hiw-step"
          :class="{
            'is-active': activeStep === index
          }"
          :style="{
            '--step-index': index
          }"
        >
          <div class="hiw-step-content">
            <div class="hiw-step-heading">
              <h3>{{ step.title }}</h3>

              <span class="hiw-step-badge">
                Step {{ index + 1 }}
              </span>
            </div>

            <p>{{ step.text }}</p>
          </div>

          <span
            class="hiw-step-line"
            aria-hidden="true"
          ></span>
        </article>
      </div>

    </div>
  </section>
</template>
