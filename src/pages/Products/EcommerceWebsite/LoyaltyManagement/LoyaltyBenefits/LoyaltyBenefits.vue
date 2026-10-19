<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { benefitsContent, menuCards, loyaltyBenefits, icons } from './LoyaltyBenefits.js'
import './LoyaltyBenefits.css'

const menuRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  const el = menuRef.value
  if (!el) return

  // Respect reduced-motion and old browsers: just show everything
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      // true when scrolled into view, false when it leaves -> replays on every scroll
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
  <section id="loyalty-benefits" class="lbf-section" aria-labelledby="lbf-title">
    <div class="lbf-shell">
      <div class="lbf-photo-column">
        <div class="lbf-photo">
          <img :src="benefitsContent.photo" :alt="benefitsContent.photoAlt" loading="lazy" />
          <div class="lbf-photo-overlay"></div>

          <!-- Animated menu cards (appear one by one on scroll) -->
          <div
            ref="menuRef"
            :class="['lbf-menu', { 'is-visible': isVisible }]"
            role="img"
            aria-label="Illustrative menu cards with loyalty points"
          >
            <article
              v-for="card in menuCards"
              :key="card.id"
              :class="['lbf-dish', `lbf-dish--${card.variant}`]"
            >
              <div class="lbf-dish-body">
                <div>
                  <h4 class="lbf-dish-name">{{ card.name }}</h4>
                  <p class="lbf-dish-desc">{{ card.description }}</p>
                </div>
                <div class="lbf-dish-meta">
                  <span class="lbf-dish-price">{{ card.price }}</span>
                  <span class="lbf-likes">
                    <svg class="lbf-svg" viewBox="0 0 24 24" aria-hidden="true" v-html="icons.heart"></svg>
                    {{ card.likes }}
                  </span>
                </div>
              </div>

              <div class="lbf-dish-media">
                <img :src="card.image" :alt="card.imageAlt" loading="lazy" />
                <span v-if="card.badge" class="lbf-badge">
                  <svg class="lbf-svg" viewBox="0 0 24 24" aria-hidden="true" v-html="icons.sparkles"></svg>
                  {{ card.badge }}
                </span>
                <span class="lbf-points-pill">
                  <svg class="lbf-svg lbf-svg--fill" viewBox="0 0 24 24" aria-hidden="true" v-html="icons.star"></svg>
                  {{ card.points }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div class="lbf-copy">
        <h2 id="lbf-title">
          {{ benefitsContent.heading }}<br />
          <span>{{ benefitsContent.subheading }}</span>
        </h2>

        <div class="lbf-list">
          <article v-for="benefit in loyaltyBenefits" :key="benefit.title" class="lbf-item">
            <div class="lbf-icon">
              <svg class="lbf-svg" viewBox="0 0 24 24" aria-hidden="true" v-html="icons[benefit.icon]"></svg>
            </div>
            <div class="lbf-item-content">
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>