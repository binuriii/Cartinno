<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  campaignBenefitsContent as content,
  campaignBenefits as cards,
  campaignDemo as demo,
  demoAudiences as audiences,
  campaignDemoFrames as frames,
  campaignDemoTiming
} from './CampaignBenefits.js'

const props = defineProps({ paused: Boolean, reduced: Boolean })
const emit = defineEmits(['toggle-motion'])
const section = ref(null)
const phase = ref(0)
const inView = ref(false)
const documentVisible = ref(true)
const systemReduced = ref(false)
const frame = computed(() => frames[phase.value])
const motionReduced = computed(() => props.reduced || systemReduced.value)
const running = computed(() => inView.value && documentVisible.value && !props.paused && !motionReduced.value)
const duration = campaignDemoTiming.phaseDuration
let timer = null
let startedAt = 0
let remaining = duration
let observer
let preference
let disposed = false


function stopTimer() {
  if (timer !== null) {
    window.clearTimeout(timer)
    timer = null
    remaining = Math.max(0, remaining - (performance.now() - startedAt))
  }
}
function startTimer() {
  if (disposed || !running.value || timer !== null) return
  startedAt = performance.now()
  timer = window.setTimeout(() => {
    timer = null
    if (disposed || !running.value) return
    phase.value = (phase.value + 1) % frames.length
    remaining = duration
    startTimer()
  }, remaining)
}
function selectPhase(index) {
  stopTimer()
  phase.value = index
  remaining = duration
  startTimer()
}
function updateVisibility() { documentVisible.value = !document.hidden }
function updateMotion() { systemReduced.value = preference.matches }

watch(running, value => value ? startTimer() : stopTimer())
onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotion()
  preference.addEventListener('change', updateMotion)
  updateVisibility()
  document.addEventListener('visibilitychange', updateVisibility)
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      inView.value = entry.isIntersecting
    }, { threshold: 0 })
    observer.observe(section.value)
  } else inView.value = true
})
onBeforeUnmount(() => {
  disposed = true
  stopTimer()
  observer?.disconnect()
  preference?.removeEventListener('change', updateMotion)
  document.removeEventListener('visibilitychange', updateVisibility)
})
</script>

<template>
  <section ref="section" class="mc-section mcb-section mcb-v2" data-mc-section
    :class="{ 'mcb-is-running': running, 'mcb-is-reduced': motionReduced }"
    aria-labelledby="mcb-heading">
    <div class="mc-shell">
      <header class="mc-heading mcb-heading" data-mc-reveal>
        <h2 id="mcb-heading">{{ content.headingFirst }}<span>{{ content.headingSecond }}</span></h2>
        <p>{{ content.description }}</p>
      </header>

      <div class="mcb-grid">
        <div v-for="(card,index) in cards" :key="card.id"
          class="mcb-reveal" :class="'mcb-reveal--' + card.id"
          data-mc-reveal :style="{ '--mc-delay': Math.min(index,2) * 100 + 'ms' }">
          <article class="mcb-card" :class="'mcb-card--' + card.id">
            <div class="mcb-copy">
              <div class="mcb-eyeline"><span>{{ card.label }}</span><span>{{ card.number }}</span></div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>

            <!-- These mini interfaces are illustrative, not live account controls. -->
            <div class="mcb-app" :class="['mcb-app--' + card.id, 'mcb-phase-' + phase]" aria-hidden="true">
              <div class="mcb-appbar">
                <span class="mcb-brand">cartinno<span>.</span></span>
                <span class="mcb-appbar-label">{{ card.id === 'insights' ? 'INSIGHTS' : 'MARKETING' }}</span>
                <span class="mcb-avatar">C</span>
              </div>

              <!-- 01: Draft → preview → campaign ready -->
              <div v-if="card.id === 'offers'" class="mcb-body">
                <div class="mcb-screen-title"><strong>New campaign</strong><span class="mcb-status" :class="{ 'mcb-status--success': phase === 2 }">{{ frame.offer }}</span></div>
                <div class="mcb-promo">
                  <small>THE WEEKEND EDIT</small>
                  <strong>A little more<br>to love.</strong>
                  <span class="mcb-promo-discount">{{ demo.discount }}<small>OFF</small></span>
                  <svg class="mcb-promo-flower" viewBox="0 0 100 100" fill="none">
                    <path d="M50 5C68 5 60 30 66 34S95 32 95 50 70 60 66 66 68 95 50 95 40 70 34 66 5 68 5 50 30 40 34 34 32 5 50 5Z" fill="currentColor"/>
                  </svg>
                </div>
                <div class="mcb-input"><small>CAMPAIGN NAME</small><span>{{ demo.name }}</span><i class="mcb-input-check" :class="{ 'mcb-show': phase > 0 }">✓</i></div>
                <div class="mcb-input mcb-code-input" :class="{ 'mcb-field-highlight': phase === 0 }"><small>OFFER CODE</small><span class="mcb-code">{{ demo.code }}</span><i class="mcb-cursor-line" v-if="phase === 0"></i></div>
                <div class="mcb-action" :class="{ 'mcb-action--complete': phase === 2 }"><span>{{ phase === 2 ? 'Campaign ready' : phase === 1 ? 'Confirm campaign' : 'Preview campaign' }}</span><b>{{ phase === 2 ? '✓' : '→' }}</b></div>
                <div class="mcb-notice" :class="{ 'mcb-notice--visible': phase === 2 }"><span>✓</span> Your next campaign is ready.</div>
                <svg class="mcb-pointer" viewBox="0 0 24 28"><path d="M2 2v22l6-6 5 9 4-2-5-9h9L2 2Z" fill="#292832" stroke="white" stroke-width="1.5"/></svg>
              </div>

              <!-- 02: Customer groups selected one by one -->
              <div v-else-if="card.id === 'audience'" class="mcb-body">
                <div class="mcb-screen-title"><strong>Build your audience</strong><span class="mcb-demo-label">DEMO</span></div>
                <div class="mcb-search"><svg viewBox="0 0 20 20"><circle cx="8" cy="8" r="5"/><path d="m12 12 5 5"/></svg><span>Find a customer group</span></div>
                <div class="mcb-audience-list">
                  <div v-for="(audience,i) in audiences" :key="audience.initials"
                    class="mcb-audience-row" :class="{ 'mcb-row-selected': i <= phase }">
                    <span class="mcb-initials" :class="'mcb-tone--' + audience.tone">{{ audience.initials }}</span>
                    <div><strong>{{ audience.name }}</strong><small>{{ audience.count }} customers</small></div>
                    <span class="mcb-checkbox">{{ i <= phase ? '✓' : '' }}</span>
                  </div>
                </div>
                <div class="mcb-audience-total"><div><small>SELECTED AUDIENCE</small><strong :key="frame.selectedCount" class="mcb-number-enter">{{ frame.selectedCount }}<span> customers</span></strong></div><span class="mcb-audience-symbol">◎</span></div>
                <div class="mcb-screen-foot"><span class="mcb-dot"></span>{{ frame.audience }}</div>
              </div>

              <!-- 03: Email composition → email preview → SMS preview -->
              <div v-else-if="card.id === 'channels'" class="mcb-body mcb-message-body">
                <div class="mcb-screen-title"><strong>Your next message</strong><span class="mcb-status">{{ frame.channel }}</span></div>
                <div class="mcb-tabs"><span :class="{ 'mcb-tab-active': phase < 2 }">Email</span><span :class="{ 'mcb-tab-active': phase === 2 }">SMS</span></div>
                <div class="mcb-message-stage">
                  <div class="mcb-email" :class="{ 'mcb-email--away': phase === 2 }">
                    <div class="mcb-email-to"><span>To: Your selected audience</span><span>•••</span></div>
                    <div class="mcb-email-content"><small>A LITTLE INSPIRATION</small><strong>{{ demo.emailSubject }}</strong><p>{{ demo.emailCopy }}</p>
                      <div class="mcb-product-art"><svg viewBox="0 0 160 70" fill="none"><path d="M49 22h46v22a20 20 0 0 1-20 20h-6a20 20 0 0 1-20-20V22Z" fill="#fdf9f5"/><path d="M95 27h8a11 11 0 0 1 0 22H95" stroke="#fdf9f5" stroke-width="6"/><ellipse cx="72" cy="22" rx="23" ry="5" fill="#d6c5ba"/><path d="M66 13c-8-6 8-8 1-14M79 13c-7-6 7-8 1-14" stroke="#fff9" stroke-width="2" stroke-linecap="round"/></svg></div>
                      <span class="mcb-email-button">Explore the collection <b>↗</b></span>
                    </div>
                  </div>
                  <div class="mcb-phone" :class="{ 'mcb-phone--visible': phase === 2 }">
                    <div class="mcb-phone-top"><span>9:41</span><span class="mcb-island"></span><span>▰</span></div>
                    <div class="mcb-phone-contact"><span>C</span><strong>Your store</strong><small>Messages</small></div>
                    <div class="mcb-bubble">{{ demo.smsCopy }}<span>View collection ↗</span></div>
                    <small class="mcb-phone-delivery">Message preview · Ready</small>
                    <div class="mcb-phone-home"></div>
                  </div>
                </div>
                <div class="mcb-screen-foot"><span class="mcb-dot"></span>{{ phase === 0 ? 'Writing your story' : phase === 1 ? 'Email preview ready' : 'SMS preview ready' }}</div>
              </div>

              <!-- 04: A complete calendar and scheduled campaign interface -->
              <div v-else-if="card.id === 'schedule'" class="mcb-body mcb-schedule-body">
                <div class="mcb-screen-title"><strong>Campaign calendar</strong><span class="mcb-status" :class="{ 'mcb-status--success': phase === 2 }">{{ frame.schedule }}</span></div>
                <div class="mcb-schedule-grid">
                  <div class="mcb-calendar">
                    <div class="mcb-month"><strong>{{ demo.calendarMonth }}</strong><span>‹ &nbsp; ›</span></div>
                    <div class="mcb-weekdays"><span v-for="(day,i) in demo.weekdays" :key="i">{{ day }}</span></div>
                    <div class="mcb-days"><span v-for="(day,i) in demo.calendarCells" :key="i" :class="{ 'mcb-day-selected': day === demo.scheduleDate, 'mcb-day-near': day === 17 || day === 19, 'mcb-day-confirmed': day === demo.scheduleDate && phase === 2 }">{{ day }}<i v-if="day === demo.scheduleDate"></i></span></div>
                  </div>
                  <div class="mcb-agenda">
                    <span class="mcb-agenda-label">YOUR NEXT CAMPAIGN</span><strong>{{ demo.name }}</strong>
                    <div class="mcb-agenda-detail"><span>DATE</span><b>{{ demo.scheduleLabel }}</b></div>
                    <div class="mcb-agenda-detail" :class="{ 'mcb-time-selected': phase > 0 }"><span>TIME</span><b>{{ phase > 0 ? demo.scheduleTime : 'Choose time' }}</b></div>
                    <div class="mcb-agenda-channels"><span>Email</span><span>SMS</span></div>
                    <div class="mcb-schedule-confirm" :class="{ 'mcb-schedule-confirm--ready': phase === 2 }"><span>{{ phase === 2 ? '✓' : '◷' }}</span>{{ phase === 2 ? 'All set for Friday' : 'Prepare your moment' }}</div>
                  </div>
                </div>
              </div>

              <!-- 05: Metrics and a chart animate through demo result snapshots -->
              <div v-else class="mcb-body mcb-insights-body">
                <div class="mcb-screen-title"><strong>Campaign performance</strong><span class="mcb-demo-label">DEMO DATA</span></div>
                <div class="mcb-metric-grid">
                  <div><small>Email engagement</small><strong :key="'e'+phase" class="mcb-number-enter">{{ frame.emailEngagement }}</strong><span>Sample engagement</span></div>
                  <div><small>Link clicks</small><strong :key="'c'+phase" class="mcb-number-enter">{{ frame.clicks }}</strong><span>Sample interactions</span></div>
                  <div><small>Redemptions</small><strong :key="'r'+phase" class="mcb-number-enter">{{ frame.redemptions }}</strong><span>Sample voucher use</span></div>
                </div>
                <div class="mcb-chart-heading"><strong>{{ demo.name }}</strong><span>Last 7 days</span></div>
                <div class="mcb-chart"><div v-for="(height,i) in frame.bars" :key="i" class="mcb-bar-slot"><span :style="{ height: height + '%', transitionDelay: (running ? i * 45 : 0) + 'ms' }"></span></div></div>
                <div class="mcb-chart-axis"><span v-for="day in demo.chartDays" :key="day">{{ day }}</span></div>
                <div class="mcb-screen-foot"><span class="mcb-dot"></span>{{ frame.insight }}</div>
              </div>
              <div class="mcb-app-footer"><span>{{ card.id === 'insights' ? 'Illustrative results' : 'Illustrative workflow' }}</span><span class="mcb-mini-steps"><i v-for="n in 3" :key="n" :class="{ 'mcb-mini-active': phase === n - 1 }"></i></span></div>
            </div>
          </article>
        </div>
      </div>

      <div class="mcb-footer">
        <p>Illustrative interfaces and demo data. Features depend on your Cartinno setup.</p>
        <div class="mcb-playback">
          <div class="mcb-phase-controls" aria-label="Choose a preview stage">
            <button v-for="(item,i) in frames" :key="item.label" type="button"
              :class="{ 'mcb-control-active': phase === i }" :aria-pressed="phase === i"
              :aria-label="'Show ' + item.label + ' preview'" @click="selectPhase(i)">{{ item.label }}</button>
          </div>
          <button class="mcb-motion-button" type="button" :disabled="motionReduced"
            :aria-pressed="paused" @click="emit('toggle-motion')">
            <svg v-if="!paused && !motionReduced" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4v12M14 4v12" stroke="currentColor" stroke-width="2"/></svg>
            <svg v-else viewBox="0 0 20 20" aria-hidden="true"><path d="m6 4 9 6-9 6V4Z" fill="currentColor"/></svg>
            {{ motionReduced ? 'Manual preview' : paused ? 'Play previews' : 'Pause previews' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./CampaignBenefits.css"></style>
