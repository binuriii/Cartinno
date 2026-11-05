<script setup>
import { ref, computed, onMounted } from 'vue'
import { useReveal } from '../shared/useReveal.js'
import { journeyContent, journeySteps, cta, scenes, icons } from './DailyOperationsJourneyData.js'
import './DailyOperationsJourney.css'

const { root, ready, inView } = useReveal({ threshold: 0.2 })
const active = ref(0)
const hovering = ref(false)
const reduceMotion = ref(false)
const step = computed(() => journeySteps[active.value])
const paused = computed(() => hovering.value || !inView.value)

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
function select(i) { active.value = i }
function next() { active.value = (active.value + 1) % journeySteps.length }
function onEnter(e) { hovering.value = e.pointerType === 'mouse' }
function onKey(e) {
  if (e.key === 'ArrowRight') select((active.value + 1) % journeySteps.length)
  if (e.key === 'ArrowLeft') select((active.value + journeySteps.length - 1) % journeySteps.length)
}
</script>

<template>
  <section id="daily-operations-journey" ref="root" :class="['cpj-section', { 'is-ready': ready, 'is-in': inView }]" aria-labelledby="cpj-title">
    <div class="cpj-container">
      <header class="cpj-header">
        <h2 id="cpj-title" class="cpj-title">
          <span class="cpj-line"><span style="--l:0">{{ journeyContent.title1 }}</span></span>
          <span class="cpj-line"><span style="--l:1">{{ journeyContent.title2 }}</span></span>
        </h2>
        <p class="cpj-description">{{ journeyContent.description }}</p>
      </header>

      <div class="cpj-tabs-wrap" @pointerenter="onEnter" @pointerleave="hovering=false" @focusout="hovering=false">
        <div class="cpj-tabs" role="tablist" aria-label="Daily operations workflow" @keydown="onKey">
          <button v-for="(s,i) in journeySteps" :id="`cpj-tab-${s.id}`" :key="s.id" type="button" role="tab"
            :aria-selected="i===active" :aria-controls="`cpj-panel-${s.id}`" :tabindex="i===active?0:-1"
            :class="['cpj-tab',{ 'is-active':i===active }]" :style="{ '--tint':s.tint }" @click="select(i)">
            <strong>{{ s.tab }}</strong><span>{{ s.tabText }}</span>
            <i v-if="i===active && !reduceMotion" :class="['cpj-bar',{ 'is-paused':paused }]"
              :style="{ animationDuration:journeyContent.duration+'ms' }" @animationend="next"></i>
          </button>
        </div>

        <div :id="`cpj-panel-${step.id}`" role="tabpanel" :aria-labelledby="`cpj-tab-${step.id}`"
          :class="['cpj-panel',{ 'is-first':active===0,'is-last':active===journeySteps.length-1 }]"
          :style="{ '--tint':step.tint,'--a':step.accent,'--b':step.accent2 }">
          <div :key="step.id" class="cpj-panel-inner">
            <div class="cpj-copy">
              <h3>{{ step.title }}</h3><p>{{ step.description }}</p>
              <a :href="cta.href" class="cpj-button">{{ cta.text }}</a>
            </div>
            <div class="cpj-stage" aria-hidden="true">
              <div class="cpj-card">
                <strong class="cpj-card-title">{{ step.panelTitle }}</strong>
                <ul v-if="step.id==='organise'" class="cpj-options">
                  <li v-for="(o,n) in scenes.organise" :key="o.title" :style="{ '--n':n }">
                    <span class="cpj-radio"><svg viewBox="0 0 24 24" v-html="icons.check"></svg></span>
                    <span class="cpj-opt-text"><b>{{ o.title }}</b><small>{{ o.text }}</small></span>
                  </li>
                </ul>
                <div v-else-if="step.id==='process'" class="cpj-connect">
                  <div class="cpj-link"><span class="cpj-box">{{ scenes.process.left }}</span><span class="cpj-wire"><i></i><i></i></span><span class="cpj-box cpj-box--brand">cartinno<em>.</em></span></div>
                  <div class="cpj-status"><span class="cpj-status-a"><u></u>{{ scenes.process.connecting }}</span><span class="cpj-status-b"><svg viewBox="0 0 24 24" v-html="icons.check"></svg>{{ scenes.process.connected }}</span></div>
                  <ul class="cpj-checks cpj-checks--late"><li v-for="(c,n) in scenes.process.checks" :key="c" :style="{ '--n':n }"><svg viewBox="0 0 24 24" v-html="icons.check"></svg>{{ c }}</li></ul>
                </div>
                <div v-else-if="step.id==='coordinate'" class="cpj-launch">
                  <ul class="cpj-checks"><li v-for="(c,n) in scenes.coordinate.checks" :key="c" :style="{ '--n':n }"><b>{{ c }}</b><svg viewBox="0 0 24 24" v-html="icons.check"></svg></li></ul>
                  <span class="cpj-ready"><u></u>{{ scenes.coordinate.ready }}</span>
                </div>
                <div v-else class="cpj-grow">
                  <div class="cpj-total"><strong>{{ scenes.review.total }}</strong><small>{{ scenes.review.totalLabel }}</small><span class="cpj-add"><svg viewBox="0 0 24 24" v-html="icons.plus"></svg>{{ scenes.review.chip }}</span></div>
                  <div class="cpj-bars"><span v-for="(h,n) in scenes.review.bars" :key="n" :style="{ '--h':h+'%','--n':n }"><i></i><small>{{ scenes.review.days[n] }}</small></span></div>
                </div>
              </div>
              <div class="cpj-float"><span class="cpj-pill"><u></u>{{ step.float.tag }}</span><strong>{{ step.float.title }}</strong><small>{{ step.float.text }}</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
