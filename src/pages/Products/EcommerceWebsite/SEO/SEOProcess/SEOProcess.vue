<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

import {
  seoProcessContent,
  seoProcessSections,
  seoAuditLines,
  seoTraffic,
  seoTasks
} from './SEOProcessData.js'

const section = ref(null)
const paused = ref(false)
const reducedMotion = ref(false)

let observer
let motionPreference

function mediaUrl(path) {
  if (!path) return ''

  if (/^(https?:\/\/|\/\/|data:|blob:)/i.test(path)) {
    return path
  }

  const base = import.meta.env.BASE_URL || '/'

  const cleanPath = path
    .replace(/^\/+/, '')
    .replace(/^public\//i, '')

  return `${base.endsWith('/') ? base : `${base}/`}${encodeURI(cleanPath)}`
}

function onMotionChange(event) {
  reducedMotion.value = event.matches
}

onMounted(() => {
  motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  reducedMotion.value = motionPreference.matches
  motionPreference.addEventListener('change', onMotionChange)

  if (!section.value) return

  const panels = section.value.querySelectorAll('.sp-panel')

  if (!('IntersectionObserver' in window)) {
    panels.forEach((panel) => {
      panel.classList.add('is-visible')
    })

    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          'is-visible',
          entry.isIntersecting
        )
      })
    },
    { threshold: 0.08 }
  )

  panels.forEach((panel) => observer.observe(panel))
})

onBeforeUnmount(() => {
  observer?.disconnect()

  motionPreference?.removeEventListener(
    'change',
    onMotionChange
  )
})
</script>

<template>
  <section
    id="seo-process"
    ref="section"
    class="sp-section"
    :class="{ 'is-paused': paused }"
    aria-labelledby="sp-heading"
  >
    <div class="sp-container">
      <!-- CENTRED SECTION HEADER -->
      <header class="sp-header">
        <div class="sp-header-copy">
          <p class="sp-eyebrow">
            {{ seoProcessContent.eyebrow }}
          </p>

          <h2 id="sp-heading" class="sp-heading">
            {{ seoProcessContent.heading }}

            <span>
              {{ seoProcessContent.highlight }}
            </span>
          </h2>
        </div>


      </header>

      <!-- PROCESS PANELS -->
      <div class="sp-panels">
        <article
          v-for="item in seoProcessSections"
          :key="item.id"
          class="sp-panel"
          :class="`sp-panel--${item.id}`"
          :aria-labelledby="`sp-title-${item.id}`"
        >
          <!-- LEFT CONTENT -->
          <div class="sp-copy">
            <div class="sp-copy-top">
              <span class="sp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path :d="item.icon" />
                </svg>
              </span>

              <span class="sp-step">
                STEP {{ item.number }}
              </span>
            </div>

            <h3 :id="`sp-title-${item.id}`">
              {{ item.title }}
            </h3>

            <p class="sp-description">
              {{ item.description }}
            </p>

            <ul class="sp-benefits">
              <li
                v-for="benefit in item.benefits"
                :key="benefit"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>

                {{ benefit }}
              </li>
            </ul>
          </div>

          <!-- RIGHT VISUAL -->
          <div class="sp-scene">
            <img
              class="sp-landscape"
              :src="mediaUrl(item.image)"
              alt=""
              :style="{
                objectPosition: item.imagePosition || 'center'
              }"
              width="1200"
              height="1200"
              loading="lazy"
              decoding="async"
            />

            <div
              class="sp-scene-shade"
              aria-hidden="true"
            ></div>

            <!-- AUDIT INTERFACE -->
            <div
              v-if="item.id === 'audit'"
              class="sp-window sp-audit-window"
            >
              <div class="sp-window-header">
                <div class="sp-window-brand">
                  <span
                    class="sp-status-dot"
                    aria-hidden="true"
                  ></span>

                  Cartinno SEO
                </div>

                <span class="sp-window-status">
                  Website review
                </span>
              </div>

              <div class="sp-audit-toolbar">
                <span>Search readiness</span>
                <span class="sp-audit-badge">Reviewing</span>
              </div>

              <div
                class="sp-code-viewport"
                aria-hidden="true"
              >
                <div class="sp-code-track">
                  <div
                    v-for="copy in 2"
                    :key="copy"
                    class="sp-code-group"
                  >
                    <div
                      v-for="(line, index) in seoAuditLines"
                      :key="`${copy}-${index}`"
                      class="sp-code-line"
                      :class="`sp-code-line--${line.type}`"
                    >
                      <span class="sp-code-number">
                        {{ String(index + 1).padStart(2, '0') }}
                      </span>

                      <span class="sp-code-label">
                        {{ line.label }}
                      </span>

                      <span class="sp-code-value">
                        {{ line.value }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p class="sp-sr-only">
                Example website review covering page titles,
                headings, content, internal links, image
                descriptions and page speed.
              </p>

              <div class="sp-audit-footer">
                <span
                  class="sp-audit-pulse"
                  aria-hidden="true"
                ></span>

                Building a clearer picture of your website
              </div>
            </div>

            <!-- ANALYTICS INTERFACE -->
            <div
              v-else-if="item.id === 'insights'"
              class="sp-window sp-insights-window"
            >
              <div class="sp-window-header">
                <div class="sp-window-brand">
                  <span
                    class="sp-status-dot"
                    aria-hidden="true"
                  ></span>

                  Search overview
                </div>

                <span class="sp-window-status">
                  Last 30 days
                </span>
              </div>

              <div class="sp-total">
                <strong>11,200</strong>
                <span>organic visits</span>
              </div>

              <div class="sp-segments" aria-hidden="true">
                <span
                  v-for="source in seoTraffic"
                  :key="source.label"
                  :style="{
                    flex: source.share,
                    background: source.color
                  }"
                ></span>
              </div>

              <div class="sp-traffic-list">
                <div
                  v-for="source in seoTraffic"
                  :key="source.label"
                  class="sp-traffic-row"
                >
                  <span class="sp-traffic-name">
                    <i
                      :style="{ background: source.color }"
                      aria-hidden="true"
                    ></i>

                    {{ source.label }}
                  </span>

                  <strong>{{ source.value }}</strong>
                  <span>{{ source.share }}%</span>
                </div>
              </div>

              <div class="sp-chart" aria-hidden="true">
                <svg viewBox="0 0 340 85" fill="none">
                  <path
                    d="M0 20h340M0 48h340M0 76h340"
                    class="sp-chart-grid"
                  />

                  <path
                    d="M4 70 35 62 66 67 97 43 128 49 159 33
                       190 39 221 22 252 29 283 14 314 18 336 8"
                    class="sp-chart-line"
                    pathLength="1"
                  />
                </svg>
              </div>

              <div class="sp-insights-footer">
                <div>
                  <span>Channel</span>
                  <strong>Organic search</strong>
                </div>

                <div>
                  <span>Purpose</span>
                  <strong>Find opportunities</strong>
                </div>
              </div>
            </div>

            <!-- PROGRESS INTERFACE -->
            <div v-else class="sp-task-stack">
              <div
                v-for="task in seoTasks"
                :key="task.id"
                class="sp-window sp-task-window"
              >
                <div class="sp-window-header">
                  <div class="sp-window-brand">
                    <span
                      class="sp-status-dot"
                      aria-hidden="true"
                    ></span>

                    {{ task.title }}
                  </div>

                  <span
                    class="sp-mini-check"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                </div>

                <p class="sp-task-subtitle">
                  {{ task.subtitle }}
                </p>

                <ul
                  class="sp-task-tags"
                  aria-label="Focus areas"
                >
                  <li
                    v-for="tag in task.tags"
                    :key="tag"
                  >
                    {{ tag }}
                  </li>
                </ul>

                <div class="sp-task-details">
                  <div>
                    <span>{{ task.metricLabel }}</span>
                    <strong>{{ task.metricValue }}</strong>
                  </div>

                  <div>
                    <span>Tasks reviewed</span>

                    <strong>
                      {{ task.completed }} / {{ task.total }}
                    </strong>
                  </div>
                </div>

                <div class="sp-progress-label">
                  <span>Review progress</span>

                  <span>
                    {{
                      Math.round(
                        task.completed / task.total * 100
                      )
                    }}%
                  </span>
                </div>

                <div
                  class="sp-progress-track"
                  aria-hidden="true"
                >
                  <span
                    :style="{
                      width: `${task.completed / task.total * 100}%`
                    }"
                  ></span>
                </div>
              </div>
            </div>

            <p class="sp-demo-label">
              Illustrative interface · Sample data
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped src="./SEOProcess.css"></style>