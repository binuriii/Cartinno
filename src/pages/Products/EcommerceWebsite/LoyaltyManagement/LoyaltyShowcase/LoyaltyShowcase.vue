<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  showcaseContent,
  showcaseCards,
  insightBars
} from './LoyaltyShowcase.js'
import './LoyaltyShowcase.css'

const sectionRef = ref(null)
const trackRef = ref(null)
const firstVisible = ref(0)
const visibleCount = ref(4)
const points = ref(0)
const pointsLabel = computed(() => points.value.toLocaleString('en-US'))
const lastStart = computed(() =>
  Math.max(0, showcaseCards.length - visibleCount.value)
)
const progress = computed(() =>
  Math.min(100, ((firstVisible.value + visibleCount.value) / showcaseCards.length) * 100)
)

let sectionObserver
let resizeObserver
let frameId = 0

function measure() {
  const track = trackRef.value
  if (!track || !track.children.length) return

  const cardWidth = track.children[0].getBoundingClientRect().width
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0
  const count = Math.floor((track.clientWidth + gap + 1) / (cardWidth + gap))
  visibleCount.value = Math.max(1, Math.min(showcaseCards.length, count))
  onScroll()
}

function scrollToCard(index) {
  const track = trackRef.value
  if (!track) return
  const next = Math.max(0, Math.min(index, lastStart.value))
  const card = track.children[next]
  const first = track.children[0]
  if (!card || !first) return

  firstVisible.value = next
  track.scrollTo({
    left: card.offsetLeft - first.offsetLeft,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto' : 'smooth'
  })
}

function onScroll() {
  const track = trackRef.value
  if (!track || !track.children.length) return

  const first = track.children[0]
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0
  const step = first.getBoundingClientRect().width + gap
  if (!step) return
  firstVisible.value = Math.max(
    0,
    Math.min(Math.round(track.scrollLeft / step), lastStart.value)
  )
}

function animatePoints() {
  const target = 1280
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    points.value = target
    return
  }
  const start = performance.now()
  const duration = 1600

  const draw = (now) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    points.value = Math.round(target * eased)
    if (t < 1) frameId = requestAnimationFrame(draw)
  }
  frameId = requestAnimationFrame(draw)
}

onMounted(() => {
  measure()
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(measure)
    if (trackRef.value) resizeObserver.observe(trackRef.value)
  } else {
    window.addEventListener('resize', measure)
  }

  if ('IntersectionObserver' in window) {
    sectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      sectionRef.value?.classList.add('is-visible')
      animatePoints()
      sectionObserver.disconnect()
    }, { threshold: 0.12 })
    if (sectionRef.value) sectionObserver.observe(sectionRef.value)
  } else {
    sectionRef.value?.classList.add('is-visible')
    animatePoints()
  }
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
  resizeObserver?.disconnect()
  window.removeEventListener('resize', measure)
  cancelAnimationFrame(frameId)
})
</script>

<template>
  <section
    id="loyalty-showcase"
    ref="sectionRef"
    class="lsc-section"
    aria-labelledby="lsc-heading"
  >
    <div class="lsc-shell">
      <header class="lsc-head">
        <h2 id="lsc-heading">
          {{ showcaseContent.headingFirst }}<br />
          <span>{{ showcaseContent.headingSecond }}</span>
        </h2>
        <p class="lsc-intro">{{ showcaseContent.description }}</p>
      </header>

      <div class="lsc-controls">
        <p>{{ showcaseContent.sectionLabel }}</p>
        <div class="lsc-arrows">
          <button
            type="button"
            aria-label="Previous loyalty features"
            :disabled="firstVisible === 0"
            @click="scrollToCard(firstVisible - 1)"
          >
            <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            aria-label="Next loyalty features"
            :disabled="firstVisible >= lastStart"
            @click="scrollToCard(firstVisible + 1)"
          >
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div
        ref="trackRef"
        class="lsc-track"
        role="region"
        aria-label="Cartinno loyalty solutions carousel"
        tabindex="0"
        @scroll.passive="onScroll"
      >
        <article
          v-for="(card, index) in showcaseCards"
          :key="card.id"
          class="lsc-card"
          :class="`lsc-card--${card.id}`"
          :style="{ '--card-i': index }"
        >
          <div class="lsc-visual" aria-hidden="true">
            <span class="lsc-number">{{ card.number }}</span>
            <span class="lsc-chip">{{ card.chip }}</span>
            <span class="lsc-aura"></span>

            <!-- ANIMATED MINI PRODUCT DASHBOARD -->
            <div class="lsc-mini">
              <div class="lsc-mini-top">
                <span class="lsc-window-dots"><b></b><b></b><b></b></span>
                <span>cartinno / rewards</span>
                <i class="fa-solid fa-ellipsis" aria-hidden="true"></i>
              </div>

              <div class="lsc-mini-content">
                <!-- 01: POINTS WALLET -->
                <template v-if="card.id === 'points'">
                  <div class="lsc-ui-topline"><small>AVAILABLE POINTS</small><i class="fa-solid fa-coins"></i></div>
                  <div class="lsc-points-total">{{ pointsLabel }} <em>pts</em></div>
                  <div class="lsc-progress"><span></span></div>
                  <div class="lsc-ui-bottom"><span>Next reward</span><b>1,500 pts</b></div>
                  <span class="lsc-floating-earn"><i class="fa-solid fa-plus"></i> 120 earned</span>
                </template>

                <!-- 02: MEMBERSHIP JOURNEY -->
                <template v-else-if="card.id === 'tiers'">
                  <small>YOUR MEMBERSHIP</small>
                  <div class="lsc-tier-hero">
                    <div class="lsc-tier-icon"><i class="fa-solid fa-crown"></i></div>
                    <div><strong>Gold member</strong><span>Exclusive benefits</span></div>
                  </div>
                  <div class="lsc-tier-track">
                    <span class="is-done"><i class="fa-solid fa-check"></i></span>
                    <span class="is-done"><i class="fa-solid fa-check"></i></span>
                    <span class="is-current"><i class="fa-solid fa-crown"></i></span>
                  </div>
                  <div class="lsc-tier-labels"><span>Starter</span><span>Silver</span><b>Gold</b></div>
                </template>

                <!-- 03: BIRTHDAY REWARD -->
                <template v-else-if="card.id === 'birthday'">
                  <div class="lsc-confetti"><i v-for="n in 7" :key="n" :style="{ '--piece': n }"></i></div>
                  <div class="lsc-birthday-gift"><i class="fa-solid fa-gift"></i></div>
                  <strong class="lsc-birthday-heading">Happy birthday!</strong>
                  <p class="lsc-birthday-sub">A special treat is waiting</p>
                  <span class="lsc-birthday-pill">Your birthday reward <i class="fa-solid fa-heart"></i></span>
                </template>

                <!-- 04: VOUCHER -->
                <template v-else-if="card.id === 'vouchers'">
                  <small>YOUR EXCLUSIVE OFFER</small>
                  <div class="lsc-voucher">
                    <span class="lsc-voucher-caption">SPECIAL REWARD</span>
                    <strong>15% <em>OFF</em></strong>
                    <span class="lsc-voucher-code">THANKYOU15</span>
                    <i class="fa-solid fa-ticket lsc-voucher-watermark"></i>
                  </div>
                  <p class="lsc-mini-note"><i class="fa-solid fa-circle-check"></i> Ready to redeem</p>
                </template>

                <!-- 05: REFERRALS -->
                <template v-else-if="card.id === 'referrals'">
                  <small>INVITE & EARN</small>
                  <div class="lsc-referral-people">
                    <span>AL</span><span>MK</span><span>+</span>
                  </div>
                  <div class="lsc-referral-line"><i></i><i></i><i></i></div>
                  <strong class="lsc-referral-title">Better together.</strong>
                  <p class="lsc-mini-note">Invite friends. Share rewards.</p>
                </template>

                <!-- 06: LOYALTY ANALYTICS -->
                <template v-else-if="card.id === 'insights'">
                  <div class="lsc-insight-heading">
                    <div><small>REWARDS ACTIVITY</small><strong>+24.8%</strong></div>
                    <span><i class="fa-solid fa-arrow-trend-up"></i> Growth</span>
                  </div>
                  <div class="lsc-chart">
                    <span
                      v-for="(height, barIndex) in insightBars"
                      :key="barIndex"
                      :style="{ '--bar-height': `${height}%`, '--bar-i': barIndex }"
                    ></span>
                  </div>
                  <div class="lsc-chart-labels"><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></div>
                </template>
              </div>
            </div>
          </div>

          <div class="lsc-card-copy">
            <p class="lsc-category">{{ card.category }}</p>
            <h3>{{ card.title }}</h3>
            <p class="lsc-summary">{{ card.description }}</p>
            <a href="#loyalty-benefits" class="lsc-card-link">
              <span>Explore benefit</span>
              <span class="lsc-link-icon"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
            </a>
          </div>
        </article>
      </div>

      <div class="lsc-foot">
        <div class="lsc-meter" role="progressbar" aria-label="Carousel position" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100">
          <span :style="{ width: `${progress}%` }"></span>
        </div>
        <span class="lsc-count">
          {{ String(firstVisible + 1).padStart(2, '0') }} —
          {{ String(Math.min(showcaseCards.length, firstVisible + visibleCount)).padStart(2, '0') }} /
          {{ String(showcaseCards.length).padStart(2, '0') }}
        </span>
      </div>
    </div>
  </section>
</template>
