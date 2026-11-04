<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import {
  salesProcessContent,
  salesProcessSections,
  salesOrderLines,
  salesChannels,
  salesTasks
} from './SalesManagementProcessData.js'
import './SalesManagementProcess.css'

const section = ref(null)
let observer

function mediaUrl(path) {
  if (!path) return ''
  if (/^(https?:\/\/|\/\/|data:|blob:)/i.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.replace(/^\/+/, '').replace(/^public\//i, '')
  return `${base.endsWith('/') ? base : `${base}/`}${encodeURI(cleanPath)}`
}

onMounted(() => {
  if (!section.value) return
  const panels = section.value.querySelectorAll('.smp-panel')
  if (!('IntersectionObserver' in window)) {
    panels.forEach((panel) => panel.classList.add('is-visible'))
    return
  }
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting)
    })
  }, { threshold: 0.08 })
  panels.forEach((panel) => observer.observe(panel))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="sales-process" ref="section" class="smp-section" aria-labelledby="smp-heading">
    <div class="smp-container">
      <header class="smp-header">
        <div class="smp-header-copy">
          <p class="smp-eyebrow">{{ salesProcessContent.eyebrow }}</p>
          <h2 id="smp-heading" class="smp-heading">
            {{ salesProcessContent.heading }}
            <span>{{ salesProcessContent.highlight }}</span>
          </h2>
        </div>
      </header>

      <div class="smp-panels">
        <article
          v-for="item in salesProcessSections"
          :key="item.id"
          class="smp-panel"
          :class="`smp-panel--${item.id}`"
          :aria-labelledby="`smp-title-${item.id}`"
        >
          <div class="smp-copy">
            <div class="smp-copy-top">
              <span class="smp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path :d="item.icon" /></svg>
              </span>
              <span class="smp-step">STEP {{ item.number }}</span>
            </div>
            <h3 :id="`smp-title-${item.id}`">{{ item.title }}</h3>
            <p class="smp-description">{{ item.description }}</p>
            <ul class="smp-benefits">
              <li v-for="benefit in item.benefits" :key="benefit">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
                {{ benefit }}
              </li>
            </ul>
          </div>

          <div class="smp-scene">
            <img class="smp-landscape" :src="mediaUrl(item.image)" alt="" :style="{ objectPosition: 'center' }" loading="lazy" decoding="async" />
            <div class="smp-scene-shade" aria-hidden="true"></div>

            <div v-if="item.id === 'orders'" class="smp-window smp-audit-window">
              <div class="smp-window-header">
                <div class="smp-window-brand"><span class="smp-status-dot"></span>Cartinno Sales</div>
                <span class="smp-window-status">Order overview</span>
              </div>
              <div class="smp-audit-toolbar"><span>Sales activity</span><span class="smp-audit-badge">Live workflow</span></div>
              <div class="smp-code-viewport" aria-hidden="true">
                <div class="smp-code-track">
                  <div v-for="copy in 2" :key="copy" class="smp-code-group">
                    <div v-for="(line, index) in salesOrderLines" :key="`${copy}-${index}`" class="smp-code-line" :class="`smp-code-line--${line.type}`">
                      <span class="smp-code-number">{{ String(index + 1).padStart(2, '0') }}</span>
                      <span class="smp-code-label">{{ line.label }}</span>
                      <span class="smp-code-value">{{ line.value }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="smp-audit-footer"><span class="smp-audit-pulse"></span>Keeping order information connected</div>
            </div>

            <div v-else-if="item.id === 'insights'" class="smp-window smp-insights-window">
              <div class="smp-window-header">
                <div class="smp-window-brand"><span class="smp-status-dot"></span>Sales overview</div>
                <span class="smp-window-status">Illustrative data</span>
              </div>
              <div class="smp-total"><strong>2,950</strong><span>sales across channels</span></div>
              <div class="smp-segments" aria-hidden="true">
                <span v-for="source in salesChannels" :key="source.label" :style="{ flex: source.share, background: source.color }"></span>
              </div>
              <div class="smp-traffic-list">
                <div v-for="source in salesChannels" :key="source.label" class="smp-traffic-row">
                  <span class="smp-traffic-name"><i :style="{ background: source.color }"></i>{{ source.label }}</span>
                  <strong>{{ source.value }}</strong><span>{{ source.share }}%</span>
                </div>
              </div>
              <div class="smp-chart" aria-hidden="true">
                <svg viewBox="0 0 340 85" fill="none">
                  <path d="M0 20h340M0 48h340M0 76h340" class="smp-chart-grid" />
                  <path d="M4 70 35 62 66 67 97 43 128 49 159 33 190 39 221 22 252 29 283 14 314 18 336 8" class="smp-chart-line" pathLength="1" />
                </svg>
              </div>
              <div class="smp-insights-footer">
                <div><span>View</span><strong>Sales channels</strong></div>
                <div><span>Purpose</span><strong>Spot opportunities</strong></div>
              </div>
            </div>

            <div v-else class="smp-task-stack">
              <div v-for="task in salesTasks" :key="task.id" class="smp-window smp-task-window">
                <div class="smp-window-header">
                  <div class="smp-window-brand"><span class="smp-status-dot"></span>{{ task.title }}</div>
                  <span class="smp-mini-check">✓</span>
                </div>
                <p class="smp-task-subtitle">{{ task.subtitle }}</p>
                <ul class="smp-task-tags"><li v-for="tag in task.tags" :key="tag">{{ tag }}</li></ul>
                <div class="smp-task-details">
                  <div><span>{{ task.metricLabel }}</span><strong>{{ task.metricValue }}</strong></div>
                  <div><span>Items reviewed</span><strong>{{ task.completed }} / {{ task.total }}</strong></div>
                </div>
                <div class="smp-progress-label"><span>Workflow progress</span><span>{{ Math.round(task.completed / task.total * 100) }}%</span></div>
                <div class="smp-progress-track"><span :style="{ width: `${task.completed / task.total * 100}%` }"></span></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
