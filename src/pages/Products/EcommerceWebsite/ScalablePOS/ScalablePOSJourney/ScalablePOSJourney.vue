<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import {
  scalablePOSJourneyContent,
  scalablePOSJourneySteps
} from './ScalablePOSJourney.js'

import { scalablePOSHero } from '../ScalablePOS.js'

import './ScalablePOSJourney.css'

const journeyRef = ref(null)
const journeyInView = ref(false)
const activeStep = ref(0)
const autoplay = ref(true)
const reducedMotion = ref(false)
const sceneDuration = 5600
let observer
let preference
let timer

function stopTimer() {
  if (timer) window.clearInterval(timer)
  timer = null
}
function syncTimer() {
  stopTimer()
  if (!autoplay.value || reducedMotion.value || !journeyInView.value || document.hidden) return
  timer = window.setInterval(() => {
    activeStep.value = (activeStep.value + 1) % scalablePOSJourneySteps.length
  }, sceneDuration)
}
function selectStep(index) {
  activeStep.value = index
  syncTimer()
}
function toggleAutoplay() {
  autoplay.value = !autoplay.value
  syncTimer()
}
function handleMotionChange() {
  reducedMotion.value = preference.matches
  syncTimer()
}
onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = preference.matches
  preference.addEventListener('change', handleMotionChange)
  if ('IntersectionObserver' in window && journeyRef.value) {
    observer = new IntersectionObserver(([entry]) => {
      journeyInView.value = entry.isIntersecting
      syncTimer()
    }, { threshold: 0 })
    observer.observe(journeyRef.value)
  } else {
    journeyInView.value = true
    syncTimer()
  }
  document.addEventListener('visibilitychange', syncTimer)
})
onBeforeUnmount(() => {
  stopTimer()
  observer?.disconnect()
  preference?.removeEventListener('change', handleMotionChange)
  document.removeEventListener('visibilitychange', syncTimer)
})
</script>
<template>
<!-- SECTION 03: interactive three-step scalable POS journey -->
    <section
      ref="journeyRef"
      class="grj-section"
      :class="{ 'grj-in-view': journeyInView, 'grj-playing': autoplay && journeyInView && !reducedMotion }"
      :style="{ '--scene-duration': `${sceneDuration}ms` }"
      aria-labelledby="pos-journey-title"
    >
      <div class="grj-shell">
        <div class="grj-copy" data-pos-reveal>
          <h2 id="pos-journey-title">
            {{ scalablePOSJourneyContent.headingFirst }}
            <span>{{ scalablePOSJourneyContent.headingSecond }}</span>
          </h2>
          <p class="grj-description">{{ scalablePOSJourneyContent.description }}</p>

          <div class="grj-steps">
            <button
              v-for="(step, index) in scalablePOSJourneySteps"
              :key="step.number"
              class="grj-step"
              :class="{ 'grj-step--active': activeStep === index }"
              type="button"
              :aria-pressed="activeStep === index"
              aria-controls="pos-preview"
              @click="selectStep(index)"
            >
              <span class="grj-step-number" aria-hidden="true">{{ step.number }}</span>
              <span class="grj-step-content">
                <strong>{{ step.title }}</strong>
                <small>{{ step.description }}</small>
              </span>
              <span class="grj-step-arrow" aria-hidden="true">↗</span>
              <span v-if="activeStep === index" class="grj-step-progress" aria-hidden="true"></span>
            </button>
          </div>

          <a class="grj-cta" :href="scalablePOSHero.primaryButton.link">
            Get a Free Demo <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="grj-art" data-pos-reveal>
          <div class="grj-art-glow" aria-hidden="true"></div>
          <div id="pos-preview" class="grj-device" role="region" aria-label="Illustrative Cartinno Scalable POS preview">
            <div class="grj-device-top" aria-hidden="true">
              <div class="grj-brand">cartinno<span>®</span></div>
              <span class="grj-app-label">Scalable POS</span>
              <span class="grj-demo-avatar">B</span>
            </div>

            <div class="grj-demo-nav" aria-hidden="true">
              <span>Business overview</span>
              <span>Workspace <b>›</b> {{ ['POS foundation', 'Connected operations', 'Business growth'][activeStep] }}</span>
            </div>

            <Transition name="grj-fade" mode="out-in">
              <div v-if="activeStep === 0" key="foundation" class="grj-scene grj-create-preview" aria-hidden="true">
                <div class="grj-scene-heading">
                  <span class="grj-device-kicker">01 / BUILD YOUR FOUNDATION</span>
                  <h3>Everything starts with a sale.</h3>
                  <p>Bring products, checkout and payments into one workspace.</p>
                </div>
                <div class="pos-dashboard-card">
                  <div class="pos-dashboard-top"><span>Today's sales</span><b>Live overview</b></div>
                  <strong>Rs. 248,650</strong>
                  <small>↑ Sales activity overview</small>
                  <div class="pos-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                </div>
                <div class="grj-form-pair pos-stat-pair">
                  <div class="grj-form-field"><span>TRANSACTIONS</span><strong>128 <b>↗</b></strong></div>
                  <div class="grj-form-field"><span>PAYMENTS</span><strong>Connected <b>✓</b></strong></div>
                </div>
                <div class="grj-fake-button"><span>Open POS workspace</span><span>↗</span></div>
                <div class="grj-scene-success"><span>✓</span> Your POS foundation is ready.</div>
              </div>

              <div v-else-if="activeStep === 1" key="operations" class="grj-scene grj-products-preview" aria-hidden="true">
                <div class="grj-scene-heading">
                  <span class="grj-device-kicker">02 / CONNECT YOUR OPERATIONS</span>
                  <h3>Every part works together.</h3>
                  <p>Bring the moving parts of your business into one view.</p>
                </div>
                <div class="pos-module-grid">
                  <div><span>▦</span><b>Inventory</b><small>Stock overview</small></div>
                  <div><span>◎</span><b>Customers</b><small>Customer activity</small></div>
                  <div><span>♙</span><b>Employees</b><small>Team access</small></div>
                  <div><span>▤</span><b>Reporting</b><small>Business insights</small></div>
                </div>
                <div class="grj-registry-summary">
                  <div class="grj-summary-heart">✓</div>
                  <div><strong>Connected business operations</strong><small>Core tools working in one POS environment</small></div>
                  <span>↗</span>
                </div>
                <div class="grj-fake-button"><span>Manage your operations</span><span>↗</span></div>
              </div>

              <div v-else key="growth" class="grj-scene grj-share-preview" aria-hidden="true">
                <div class="grj-scene-heading">
                  <span class="grj-device-kicker">03 / EXPAND WITH CONFIDENCE</span>
                  <h3>More locations. One view.</h3>
                  <p>Keep your growing business connected as you expand.</p>
                </div>
                <div class="pos-location-list">
                  <div><span class="pos-location-icon">01</span><span><b>City Centre</b><small>Store location</small></span><em>Active</em></div>
                  <div><span class="pos-location-icon">02</span><span><b>Riverside Mall</b><small>Store location</small></span><em>Active</em></div>
                  <div><span class="pos-location-icon">03</span><span><b>North Point</b><small>New location</small></span><em class="pos-pending">Connected</em></div>
                </div>
                <div class="grj-faux-link"><span>Cartinno / All locations</span><span>View overview ↗</span></div>
                <div class="grj-scene-success"><span>✓</span> Ready for your next stage of growth.</div>
              </div>
            </Transition>

            <div class="grj-demo-footer" aria-hidden="true">
              <span><i></i> Your business, beautifully connected.</span>
              <span>Cartinno</span>
            </div>
          </div>

          <div class="grj-preview-controls">
            <div class="grj-page-dots" aria-label="POS preview steps">
              <button
                v-for="(step, index) in scalablePOSJourneySteps"
                :key="step.number"
                type="button"
                :class="{ 'grj-dot--active': activeStep === index }"
                :aria-label="`Show ${step.title}`"
                :aria-pressed="activeStep === index"
                aria-controls="pos-preview"
                @click="selectStep(index)"
              >{{ step.number }}</button>
            </div>
           
          </div>

        </div>
      </div>
    </section>
</template>
