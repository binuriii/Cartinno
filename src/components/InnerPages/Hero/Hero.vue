
<script setup>
import {
  computed,
  ref,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { RouterLink } from 'vue-router'
import './Hero.css'

const props = defineProps({
  fixedLine: {
    type: String,
    default: 'Build your business.'
  },

  rotatingWords: {
    type: Array,
    default: () => [
      'Sell smarter.',
      'Grow faster.',
      'Reach more customers.'
    ]
  },

  description: {
    type: String,
    default:
      'Everything you need to build, sell, and grow with Cartinno.'
  },

  backgroundImage: {
    type: String,
    default: ''
  },

  backgroundPosition: {
    type: String,
    default: 'center center'
  },

  overlayOpacity: {
    type: Number,
    default: 0.65
  },

  primaryButton: {
    type: Object,
    default: () => ({
      text: 'Get a Free Demo',
      link: '/#demo'
    })
  },

  secondaryButton: {
    type: Object,
    default: () => null
  },

  interval: {
    type: Number,
    default: 3500
  }
})

const activeIndex = ref(0)
const reduceMotion = ref(false)

let rotationTimer = null
let motionQuery = null

const currentPhrase = computed(() => {
  return props.rotatingWords[
    activeIndex.value % (props.rotatingWords.length || 1)
  ] || ''
})

const backgroundStyle = computed(() => ({
  backgroundImage: props.backgroundImage
    ? `url("${props.backgroundImage}")`
    : 'none',

  backgroundPosition: props.backgroundPosition
}))

const overlayStyle = computed(() => ({
  '--hero-overlay-opacity': Math.min(
    1,
    Math.max(0, props.overlayOpacity)
  )
}))

const isInternal = (link) => {
  return (
    typeof link === 'string' &&
    link.startsWith('/') &&
    !link.startsWith('//')
  )
}

const buttonComponent = (link) => {
  return isInternal(link) ? RouterLink : 'a'
}

const buttonProps = (link) => {
  return isInternal(link)
    ? { to: link }
    : { href: link || '#' }
}

const stopRotation = () => {
  if (rotationTimer !== null) {
    clearInterval(rotationTimer)
    rotationTimer = null
  }
}

const startRotation = () => {
  stopRotation()

  if (
    reduceMotion.value ||
    props.rotatingWords.length <= 1
  ) {
    return
  }

  rotationTimer = setInterval(() => {
    activeIndex.value =
      (activeIndex.value + 1) %
      props.rotatingWords.length
  }, Math.max(1200, props.interval))
}

const updateMotion = () => {
  reduceMotion.value = motionQuery?.matches || false
  activeIndex.value = 0
  startRotation()
}

watch(
  () => [props.rotatingWords, props.interval],
  () => {
    activeIndex.value = 0
    startRotation()
  }
)

onMounted(() => {
  motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  reduceMotion.value = motionQuery.matches

  motionQuery.addEventListener?.(
    'change',
    updateMotion
  )

  startRotation()
})

onBeforeUnmount(() => {
  stopRotation()

  motionQuery?.removeEventListener?.(
    'change',
    updateMotion
  )
})
</script>

<template>
  <section class="inner-hero">

    <!-- BACKGROUND IMAGE -->
    <div
      class="inner-hero-image"
      :style="backgroundStyle"
      aria-hidden="true"
    ></div>

    <!-- LIGHT OVERLAY -->
    <div
      class="inner-hero-overlay"
      :style="overlayStyle"
      aria-hidden="true"
    ></div>

    <!-- MAIN CONTENT -->
    <div class="inner-hero-container">

      <div class="inner-hero-content">

        <!-- ANIMATED HEADING -->
        <h1 class="inner-hero-title">

          <!-- FIXED LINE -->
          <span class="inner-hero-fixed">
            {{ fixedLine }}
          </span>

          <!-- CHANGING LINE -->
          <span class="inner-hero-changing">

            <Transition
              v-if="!reduceMotion"
              name="inner-hero-word"
              mode="out-in"
            >
              <span
                :key="activeIndex"
                class="inner-hero-word"
              >
                {{ currentPhrase }}
              </span>
            </Transition>

            <span
              v-else
              class="inner-hero-word"
            >
              {{ rotatingWords[0] }}
            </span>

          </span>

        </h1>

        <!-- DESCRIPTION -->
        <p class="inner-hero-description">
          {{ description }}
        </p>

        <!-- BUTTONS -->
        <div class="inner-hero-actions">

          <component
            :is="buttonComponent(primaryButton?.link)"
            v-if="primaryButton?.text"
            v-bind="buttonProps(primaryButton.link)"
            class="inner-hero-btn inner-hero-btn-primary"
          >
            {{ primaryButton.text }}

          </component>

          <component
            :is="buttonComponent(secondaryButton?.link)"
            v-if="secondaryButton?.text"
            v-bind="buttonProps(secondaryButton.link)"
            class="inner-hero-btn inner-hero-btn-secondary"
          >
            {{ secondaryButton.text }}
          </component>

        </div>

      </div>
    </div>

  </section>
</template>
