<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './HowItWorks.css'
import { label, headline, intro, cta, steps } from './HowItWorksData.js'

const section = ref(null)
const active = ref(0)
const visible = ref(false)

const AUTOPLAY_MS = 5000
let timer = null
let observer = null
let revealObserver = null
let ticking = false
let inView = false
let reduced = false

const stop = () => {
  if (timer) clearInterval(timer)
  timer = null
}

const start = () => {
  stop()
  if (!inView || reduced || document.hidden || steps.length < 2) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % steps.length
  }, AUTOPLAY_MS)
}

const select = i => {
  active.value = i
  start() // restart the countdown after a manual click
}

const onVisibility = () => start()

/* scroll progress (0 → 1) exposed to CSS as --p for the parallax */
const updateProgress = () => {
  ticking = false
  if (!section.value || reduced) return
  const rect = section.value.getBoundingClientRect()
  const vh = window.innerHeight
  const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)))
  section.value.style.setProperty('--p', p.toFixed(4))
}

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateProgress)
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.addEventListener('visibilitychange', onVisibility)

  observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting
      start()
    },
    { threshold: 0.25 }
  )
  observer.observe(section.value)

  /* one-time reveal when the section scrolls into view */
  if (reduced || !('IntersectionObserver' in window)) {
    visible.value = true
  } else {
    revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true
          revealObserver.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    revealObserver.observe(section.value)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateProgress()
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  revealObserver?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

/* demo content for the visual cards */
const profile = [
  { k: 'Business', v: 'Restaurant & cafe' },
  { k: 'Products', v: '120 menu items' },
  { k: 'Sells on', v: 'Web, in-store' }
]
const goals = ['More online orders', 'Faster checkout', 'Multiple branches']
const swatches = ['#d9444f', '#2d3036', '#f2a65a', '#4f9d8a', '#7b6cf6']
const checklist = ['Products imported', 'Payments connected', 'Domain live', 'Team trained']
</script>

<template>
  <section ref="section" id="how-it-works" class="hiw" :class="{ 'is-visible': visible }">
    <div class="hiw-dots" aria-hidden="true"></div>

    <div class="hiw-inner">
      <header class="hiw-head">
        <h2>{{ headline.first }}<br />{{ headline.second }}</h2>
        <p>{{ intro }}</p>
      </header>

      <div class="hiw-tabs" role="tablist" aria-label="Cartinno four-step process">
        <button
          v-for="(s, i) in steps"
          :key="s.tag"
          type="button"
          role="tab"
          :aria-selected="active === i"
          :class="['hiw-tab', { on: active === i }]"
          @click="select(i)"
        >
          <strong>{{ i + 1 }}. {{ s.title }}</strong>
          <span>{{ s.text }}</span>
        </button>
      </div>

      <div class="hiw-stage">
      <Transition name="hiw-swap" mode="out-in">
        <article
          :key="active"
          :class="['hiw-panel', { 'is-first': active === 0, 'is-last': active === steps.length - 1 }]"
        >
          <div class="hiw-copy">
            <h3>{{ steps[active].heading }}</h3>
            <p>{{ steps[active].detail }}</p>
            <a class="hiw-btn" :href="cta.href">{{ cta.label }}</a>
          </div>

          <div class="hiw-visual">
            <div class="hiw-card">
              <div :class="['hiw-bg', `tone-${active}`]" aria-hidden="true"></div>
              <div class="hiw-glass">
                <!-- 0 · Discover -->
                <div v-if="active === 0" class="hiw-body">
                  <h4>Tell us about your business</h4>
                  <div class="hiw-rows">
                    <div v-for="(r, i) in profile" :key="r.k" class="hiw-row" :style="{ '--i': i }">
                      <small>{{ r.k }}</small>
                      <b>{{ r.v }}</b>
                    </div>
                  </div>
                  <div class="hiw-chips">
                    <span v-for="(g, i) in goals" :key="g" :class="['hiw-chip', { on: i === 0 }]">{{ g }}</span>
                  </div>
                </div>

                <!-- 1 · Customize -->
                <div v-else-if="active === 1" class="hiw-body">
                  <h4>Your storefront</h4>
                  <div class="hiw-wire">
                    <div class="hiw-wire__bar"><i></i><i></i><i></i></div>
                    <div class="hiw-wire__hero"></div>
                    <div class="hiw-wire__tiles"><i></i><i></i><i></i></div>
                  </div>
                  <div class="hiw-swatches">
                    <i v-for="(c, i) in swatches" :key="c" :class="{ on: i === 0 }" :style="{ background: c }"></i>
                  </div>
                </div>

                <!-- 2 · Launch -->
                <div v-else-if="active === 2" class="hiw-body">
                  <h4>Launch checklist</h4>
                  <ul class="hiw-list">
                    <li v-for="(c, i) in checklist" :key="c" :style="{ '--i': i }">
                      <span class="hiw-tick">✓</span>{{ c }}
                    </li>
                  </ul>
                  <div class="hiw-progress"><span></span></div>
                  <small class="hiw-progress__txt">4 of 4 done · ready to go live</small>
                </div>

                <!-- 3 · Scale -->
                <div v-else class="hiw-body hiw-body--line">
                  <h4>Monthly orders</h4>
                  <div class="hiw-linewrap">
                    <svg viewBox="0 0 600 270" class="hiw-line" aria-hidden="true">
                      <defs>
                        <linearGradient id="hiwArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stop-color="#e2606a" stop-opacity=".18" />
                          <stop offset="1" stop-color="#e2606a" stop-opacity="0" />
                        </linearGradient>
                      </defs>
                      <g stroke="#e8dede" stroke-width="2" stroke-dasharray="7 9">
                        <path d="M0 20H600M0 80H600M0 140H600M0 200H600M0 260H600" />
                      </g>
                      <path class="hiw-area" d="M10 220 L130 190 L250 170 L370 110 L490 60 L590 30 L590 260 L10 260Z" fill="url(#hiwArea)" />
                      <path class="hiw-stroke" pathLength="1" d="M10 220 L130 190 L250 170 L370 110 L490 60 L590 30" fill="none" stroke="#e2606a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                      <g class="hiw-dotsg" fill="#e2606a" stroke="#fff" stroke-width="3">
                        <circle cx="10" cy="220" r="8" /><circle cx="130" cy="190" r="8" /><circle cx="250" cy="170" r="8" /><circle cx="370" cy="110" r="8" /><circle cx="490" cy="60" r="8" />
                      </g>
                      <path d="M0 260H600" stroke="#ddd5d5" stroke-width="2" />
                    </svg>
                    <div class="hiw-axis"><span>Month 1</span><span>Month 6</span><span>Month 12</span></div>
                    <div class="hiw-tip">
                      <em>This quarter</em>
                      <p><strong>+38%</strong><i>↑</i></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- floating cards overhanging the left edge -->
            <div v-if="active === 0" class="hiw-float">
              <span class="hiw-avatar">C</span>
              <b>Discovery call</b>
              <small>30 min · Tomorrow, 10:00</small>
            </div>

            <div v-else-if="active === 1" class="hiw-float">
              <b>Brand colors</b>
              <div class="hiw-float__sw"><i></i><i></i><i></i><i></i></div>
              <small>Applied to web, POS and apps</small>
            </div>

            <div v-else-if="active === 2" class="hiw-float">
              <span class="hiw-live"><i></i>Live</span>
              <b>Your store is open</b>
              <small>yourstore.com</small>
            </div>

            <div v-else class="hiw-float">
              <strong class="hiw-float__num">+38%</strong>
              <b>More orders</b>
              <small>vs. previous quarter</small>
            </div>
          </div>
        </article>
      </Transition>
      </div>
    </div>
  </section>
</template>