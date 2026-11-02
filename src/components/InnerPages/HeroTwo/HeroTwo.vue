<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import './HeroTwo.css'

const props = defineProps({
  /* Use \n to break the title into lines */
  title: {
    type: String,
    default: 'Your Intelligent\nPartner, On Demand'
  },

  description: {
    type: String,
    default:
      'Streamline tasks, make smarter decisions, and stay one step ahead. Our AI agent works quietly in the background—so you can focus on what matters most.'
  },

  primaryButton: {
    type: Object,
    default: () => ({ text: 'Try It Free', link: '/#demo' })
  },

  secondaryButton: {
    type: Object,
    default: () => null
  },

  /* Big rounded image card */
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  imagePosition: { type: String, default: 'center center' },

  /* Top-left stat on the image. Pass null to hide */
  stat: {
    type: Object,
    default: () => ({ value: '98%', label: 'Get More Done, Effortlessly' })
  },

  /* Bottom-right text on the image. Pass null to hide */
  feature: {
    type: Object,
    default: () => ({
      title: 'Advanced Integrations',
      text: 'Connect with your favorite tools to create a seamless workflow.'
    })
  },

  /* Bottom-center notch. Each item: { name, icon? (image url) } */
  logos: {
    type: Array,
    default: () => [
      { name: 'Supa Blox' },
      { name: 'Hype Blox' },
      { name: 'Ultra Blox' },
      { name: 'Frame Blox' }
    ]
  },

  /* Dark shade over the image so white text stays readable (0 - 1) */
  shade: { type: Number, default: 0.18 }
})

const titleLines = computed(() => props.title.split('\n'))

const mediaStyle = computed(() => ({
  '--ht-shade': Math.min(1, Math.max(0, props.shade))
}))

const imageStyle = computed(() => ({
  backgroundImage: props.image ? `url("${props.image}")` : 'none',
  backgroundPosition: props.imagePosition
}))

const isInternal = (link) =>
  typeof link === 'string' && link.startsWith('/') && !link.startsWith('//')

const buttonComponent = (link) => (isInternal(link) ? RouterLink : 'a')

const buttonProps = (link) =>
  isInternal(link) ? { to: link } : { href: link || '#' }
</script>

<template>
  <section class="hero-two">
    <div class="hero-two-container">
      <!-- TEXT -->
      <div class="hero-two-content">
        <h1 class="hero-two-title">
          <span
            v-for="(line, i) in titleLines"
            :key="i"
            class="hero-two-line"
          >
            {{ line }}
          </span>
        </h1>

        <p v-if="description" class="hero-two-description">
          {{ description }}
        </p>

        <div class="hero-two-actions">
          <component
            :is="buttonComponent(primaryButton?.link)"
            v-if="primaryButton?.text"
            v-bind="buttonProps(primaryButton.link)"
            class="hero-two-btn hero-two-btn-primary"
          >
            {{ primaryButton.text }}
          </component>

          <component
            :is="buttonComponent(secondaryButton?.link)"
            v-if="secondaryButton?.text"
            v-bind="buttonProps(secondaryButton.link)"
            class="hero-two-btn hero-two-btn-secondary"
          >
            {{ secondaryButton.text }}
          </component>
        </div>
      </div>

      <!-- IMAGE CARD -->
      <div class="hero-two-media" :style="mediaStyle">
        <div
          class="hero-two-media-image"
          :style="imageStyle"
          role="img"
          :aria-label="imageAlt"
        ></div>
        <div class="hero-two-media-shade" aria-hidden="true"></div>

        <div v-if="stat" class="hero-two-stat">
          <strong class="hero-two-stat-value">{{ stat.value }}</strong>
          <span class="hero-two-stat-label">{{ stat.label }}</span>
        </div>

        <div v-if="feature" class="hero-two-feature">
          <strong class="hero-two-feature-title">{{ feature.title }}</strong>
          <span class="hero-two-feature-text">{{ feature.text }}</span>
        </div>

        <div v-if="logos?.length" class="hero-two-notch">
          <ul class="hero-two-logos">
            <li v-for="logo in logos" :key="logo.name" class="hero-two-logo">
              <img
                v-if="logo.icon"
                :src="logo.icon"
                alt=""
                class="hero-two-logo-icon"
              />
              <span>{{ logo.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>