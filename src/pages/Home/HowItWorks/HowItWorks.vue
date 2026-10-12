<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import './HowItWorks.css'
import { headline, intro, cta, steps } from './HowItWorksData.js'

const active = ref(0)
const visible = ref(false)
const section = ref(null)
let revealObserver = null

const state = i =>
  i === active.value
    ? 'is-active'
    : i < active.value
      ? 'is-past'
      : 'is-next'

const select = i => {
  active.value = i
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !('IntersectionObserver' in window)) {
    visible.value = true
    return
  }
  revealObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      revealObserver?.disconnect()
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })
  if (section.value) revealObserver.observe(section.value)
})

onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <section
    ref="section"
    id="how-it-works"
    class="hiw"
    :class="{ 'is-visible': visible }"
    :style="{ '--n': steps.length, '--i': active }"
  >
    <div class="hiw-dots" aria-hidden="true"></div>

    <div ref="inner" class="hiw-inner">
      <header class="hiw-head">
        <h2>
          {{ headline.first }}
          <br />
          {{ headline.second }}
        </h2>
        <p>{{ intro }}</p>
      </header>

      <div
        class="hiw-tabs"
        role="tablist"
        aria-label="Cartinno four-step process"
        :style="{ '--i': active }"
      >
        <span class="hiw-tab-bg" aria-hidden="true"></span>

        <button
          v-for="(s, i) in steps"
          :key="s.tag"
          type="button"
          role="tab"
          :id="`hiw-tab-${i}`"
          :aria-controls="`hiw-panel-${i}`"
          :aria-selected="active === i"
          :tabindex="active === i ? 0 : -1"
          :class="['hiw-tab', { on: active === i }]"
          @click="select(i)"
          @keydown.right.prevent="select((i + 1) % steps.length)"
          @keydown.left.prevent="select((i - 1 + steps.length) % steps.length)"
        >
          <strong>{{ i + 1 }}. {{ s.title }}</strong>
          <span>{{ s.text }}</span>
        </button>
      </div>

      <div
        class="hiw-stage"
        :class="{ 'is-first': active === 0, 'is-last': active === steps.length - 1 }"
      >
        <article
          v-for="(s, i) in steps"
          :key="s.tag"
          class="hiw-panel"
          :class="state(i)"
          role="tabpanel"
          :id="`hiw-panel-${i}`"
          :aria-labelledby="`hiw-tab-${i}`"
          :aria-hidden="active !== i"
          :inert="active !== i"
        >
          <div class="hiw-copy">
            <h3>{{ s.heading }}</h3>
            <p>{{ s.detail }}</p>
            <RouterLink class="hiw-btn" :to="cta.href">
              {{ cta.label }}
            </RouterLink>
          </div>

          <div class="hiw-visual">
            <div class="hiw-card">
              <div :class="['hiw-bg', `tone-${i}`]" aria-hidden="true"></div>
              <div class="hiw-glass">
                <div class="hiw-body" :key="`visual-content-${i}-${active}`">
                  <h4>{{ s.visual.title }}</h4>

                  <!-- STEP 1: CHOOSE -->
                  <ul v-if="s.visual.type === 'options'" class="hiw-opts">
                    <li
                      v-for="(o, n) in s.visual.items"
                      :key="o"
                      :class="['hiw-opt', { on: n === 0 }]"
                      :style="{ '--item-i': n }"
                    >
                      <i></i>{{ o }}
                    </li>
                  </ul>

                  <!-- STEP 2: SET UP -->
                  <template v-else-if="s.visual.type === 'checklist'">
                    <ul class="hiw-list">
                      <li
                        v-for="(c, n) in s.visual.items"
                        :key="c"
                        :style="{ '--item-i': n }"
                      >
                        <span class="hiw-tick">✓</span>{{ c }}
                      </li>
                    </ul>
                    <div class="hiw-progress"><span></span></div>
                    <small class="hiw-progress__txt">{{ s.visual.progress }}</small>
                  </template>

                  <!-- STEP 3: TRAIN & LAUNCH -->
                  <template v-else-if="s.visual.type === 'training'">
                    <div class="hiw-rows">
                      <div
                        v-for="(r, n) in s.visual.items"
                        :key="r"
                        class="hiw-row"
                        :style="{ '--item-i': n }"
                      >
                        <b>{{ r }}</b>
                        <span class="hiw-tick">✓</span>
                      </div>
                    </div>
                    <span class="hiw-live hiw-live--block">
                      <i></i>{{ s.visual.status }}
                    </span>
                  </template>

                  <!-- STEP 4: GROW -->
                  <template v-else>
                    <div class="hiw-care">
                      <strong>{{ s.visual.number }}</strong>
                      <span>{{ s.visual.numberLabel }}</span>
                    </div>
                    <div class="hiw-chips">
                      <span
                        v-for="(c, n) in s.visual.items"
                        :key="c"
                        :class="['hiw-chip', { on: n === 0 }]"
                      >{{ c }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <!-- FLOATING INFORMATION CARD -->
            <div class="hiw-float">
              <span :class="s.float.live ? 'hiw-live' : 'hiw-badge'">
                <i v-if="s.float.live"></i>{{ s.float.tag }}
              </span>
              <b>{{ s.float.title }}</b>
              <small>{{ s.float.note }}</small>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
