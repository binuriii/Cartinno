<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  kitchenContent,
  orderCards,
  kitchenFeatures,
  icons
} from './KitchenFeaturesData.js'
import './KitchenFeatures.css'

const menuRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  const el = menuRef.value
  if (!el) return

  const reduce = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (reduce || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting
    },
    { threshold: 0.4 }
  )

  observer.observe(el)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section
    id="kitchen-features"
    class="kf-section"
    aria-labelledby="kf-title"
  >
    <div class="kf-shell">
      <!-- Left: image and animated order cards -->
      <div class="kf-photo-column">
        <div class="kf-photo">
          <img
            :src="kitchenContent.photo"
            :alt="kitchenContent.photoAlt"
            loading="lazy"
          />
          <div class="kf-photo-overlay"></div>

          <div
            ref="menuRef"
            :class="['kf-menu', { 'is-visible': isVisible }]"
            role="img"
            aria-label="Illustrative live kitchen tickets"
          >
            <article
              v-for="card in orderCards"
              :key="card.id"
              :class="['kf-dish', `kf-dish--${card.variant}`]"
            >
              <div class="kf-dish-body">
                <div>
                  <h4 class="kf-dish-name">{{ card.name }}</h4>
                  <p class="kf-dish-desc">{{ card.description }}</p>
                </div>

                <div class="kf-dish-meta">
                  <span class="kf-dish-price">{{ card.price }}</span>

                  <span class="kf-likes">
                    <svg
                      class="kf-svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      v-html="icons.clock"
                    ></svg>
                    {{ card.time }}
                  </span>
                </div>
              </div>

              <div class="kf-dish-media">
                <img
                  :src="card.image"
                  :alt="card.imageAlt"
                  loading="lazy"
                />

                <span v-if="card.badge" class="kf-badge">
                  <svg
                    class="kf-svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    v-html="icons.sparkles"
                  ></svg>
                  {{ card.badge }}
                </span>

                <span class="kf-points-pill" :class="{'is-ready': card.status === 'READY', 'is-fired': card.status === 'FIRED'}">
                  <svg
                    class="kf-svg kf-svg--fill"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    v-html="icons.check"
                  ></svg>
                  {{ card.status }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- Right: numbered kitchen features -->
      <div class="kf-copy">
        <h2 id="kf-title">
          {{ kitchenContent.heading }}<br />
          <span>{{ kitchenContent.subheading }}</span>
        </h2>

        <div class="kf-list">
          <article
            v-for="feature in kitchenFeatures"
            :key="feature.number"
            class="kf-item"
          >
            <div class="kf-number" aria-hidden="true">
              {{ feature.number }}
            </div>

            <div class="kf-item-content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>