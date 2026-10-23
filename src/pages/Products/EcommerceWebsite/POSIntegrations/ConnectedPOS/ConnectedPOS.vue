<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { content, sceneDuration } from './ConnectedPOSData.js'
import './ConnectedPOS.css'

const root = ref(null)
const paused = ref(false)
const state = reactive(Object.fromEntries(content.features.map(feature => [
  feature.id, { index: 0, elapsed: 0, visible: false }
])))
const products = [
  { name: 'House blend', symbol: '☕', stock: 82, color: '#e9c79b' },
  { name: 'Fresh pastries', symbol: '🥐', stock: 12, color: '#f3d2a4' },
  { name: 'Cold drinks', symbol: '🥤', stock: 64, color: '#b9d9cb' }
]
let frameId = 0
let lastTime = null
let observer
let sizeObserver
let preference

function scene(feature) { return feature.scenes[state[feature.id].index] }
function selectScene(feature, index) {
  const item = state[feature.id]
  item.index = (index + feature.scenes.length) % feature.scenes.length
  item.elapsed = 0
}
function progress(feature, index) {
  const item = state[feature.id]
  return index < item.index ? 100 : index > item.index ? 0 : item.elapsed / sceneDuration * 100
}
function frame(now) {
  // Reset timing on every frame, including while paused, to avoid jumping on resume.
  const delta = lastTime === null ? 0 : Math.min(now - lastTime, 100)
  lastTime = now
  if (!paused.value && !document.hidden) {
    content.features.forEach(feature => {
      const item = state[feature.id]
      if (!item.visible) return
      item.elapsed += delta
      if (item.elapsed >= sceneDuration) {
        item.elapsed %= sceneDuration
        item.index = (item.index + 1) % feature.scenes.length
      }
    })
  }
  frameId = requestAnimationFrame(frame)
}
function preferenceChanged(event) { paused.value = event.matches }

onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  paused.value = preference.matches
  preference.addEventListener('change', preferenceChanged)
  // Measure the existing cards so sticky positioning also works on short screens.
  const cards = root.value.querySelectorAll('[data-feature]')
  const measureCard = card => {
    card.style.setProperty('--cpos-card-height', `${card.getBoundingClientRect().height}px`)
  }
  cards.forEach(measureCard)
  if ('ResizeObserver' in window) {
    sizeObserver = new ResizeObserver(entries => entries.forEach(entry => measureCard(entry.target)))
    cards.forEach(card => sizeObserver.observe(card))
  }
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { state[entry.target.dataset.feature].visible = entry.isIntersecting })
    }, { threshold: .15 })
    root.value.querySelectorAll('[data-feature]').forEach(card => observer.observe(card))
  } else Object.values(state).forEach(item => { item.visible = true })
  frameId = requestAnimationFrame(frame)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  observer?.disconnect()
  sizeObserver?.disconnect()
  preference?.removeEventListener('change', preferenceChanged)
})
</script>

<template>
  <section ref="root" class="cpos-stories" :class="{ 'cpos-is-paused': paused }" aria-label="Connected POS integrations">
    
    <div class="cpos-container">
      <header class="cpos-section-header">
        <h2>{{ content.title1 }}<br />{{ content.title2 }}</h2>
        <p>{{ content.description }}</p>
      </header>
      <div class="cpos-controls">
        <button type="button" :aria-pressed="paused" @click="paused = !paused">
          {{ paused ? 'Play previews' : 'Pause previews' }}
        </button>
      </div>

      <article v-for="(feature, featureIndex) in content.features" :key="feature.id"
        :data-feature="feature.id" class="cpos-card"
        :style="{ '--cpos-stack-index': featureIndex }"
        :class="['cpos-' + feature.theme, { 'cpos-reversed': featureIndex === 1 }]">
        <div class="cpos-copy">
          <span class="cpos-feature-number">0{{ featureIndex + 1 }} / CONNECTED COMMERCE</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>

        <div class="cpos-stage">
          <div class="cpos-browser">
            <div class="cpos-browser-bar" aria-hidden="true"><span></span><span></span><span></span><small>cartinno</small></div>
            <div class="cpos-player" :class="'cpos-player-' + feature.id"
              :style="{ background: scene(feature).background, '--scene-accent': scene(feature).accent }">
              <div class="cpos-step-bars" role="group" :aria-label="feature.title + ' scenes'">
                <button v-for="(step, index) in feature.scenes" :key="step.label" type="button"
                  :aria-label="'Show scene ' + (index + 1) + ': ' + step.title"
                  :aria-current="state[feature.id].index === index ? 'step' : undefined"
                  @click="selectScene(feature, index)">
                  <span class="cpos-bar-track"><span :style="{ width: progress(feature, index) + '%' }"></span></span>
                </button>
              </div>
              <div class="cpos-scene-brand"><b>cartinno</b><span>{{ scene(feature).label }}</span></div>
              <Transition :name="'cpos-scene-' + state[feature.id].index" mode="out-in">
                <div :key="feature.id + state[feature.id].index" class="cpos-scene-body">
                  <!-- SALES: one complete interface at a time. -->
                  <template v-if="feature.id === 'sales'">
                    <div v-if="state.sales.index === 0" class="cpos-ui-panel">
                      <div class="cpos-ui-header"><b>Online store</b><span>New order</span></div>
                      <div class="cpos-large-product">☕ <span>🥐</span></div>
                      <div class="cpos-ui-row"><b>House blend + pastry</b><span>× 2</span></div>
                      <div class="cpos-ui-row"><span>Order #1042</span><b>Rs. 2,400</b></div>
                      <div class="cpos-ui-action">Order received ✓</div>
                    </div>
                    <div v-else-if="state.sales.index === 1" class="cpos-ui-panel">
                      <div class="cpos-ui-header"><b>Counter checkout</b><span>In-store</span></div>
                      <div class="cpos-product-tiles"><div>☕<small>Coffee</small></div><div>🥐<small>Pastry</small></div><div>🥤<small>Drinks</small></div></div>
                      <div class="cpos-ui-row"><span>Order #1043</span><b>Rs. 4,850</b></div>
                      <div class="cpos-ui-action">Sale recorded ✓</div>
                    </div>
                    <div v-else class="cpos-ui-panel">
                      <div class="cpos-ui-header"><b>All orders</b><span>Connected</span></div>
                      <div v-for="(order, index) in ['#1042', '#1043', '#1044']" :key="order" class="cpos-list-row"><span class="cpos-list-icon">{{ index === 1 ? '▣' : '↗' }}</span><div><b>{{ order }}</b><small>{{ index === 1 ? 'In-store checkout' : 'Online store' }}</small></div><span class="cpos-green-text">Synced ✓</span></div>
                      <div class="cpos-ui-action">One place for every sale</div>
                    </div>
                  </template>

                  <!-- PAYMENTS: options, card terminal, receipt. -->
                  <template v-else-if="feature.id === 'payments'">
                    <div v-if="state.payments.index === 0" class="cpos-ui-panel">
                      <div class="cpos-ui-header"><b>Checkout</b><span>#1043</span></div>
                      <strong class="cpos-ui-total">Rs. 4,850.00</strong>
                      <div class="cpos-payment-options"><div v-for="method in ['Cash','Card','Wallet','QR']" :key="method" :class="{ selected: method === 'Card' }">{{ method }}</div></div>
                      <div class="cpos-ui-action">Choose your payment</div>
                    </div>
                    <div v-else-if="state.payments.index === 1" class="cpos-terminal-scene">
                      <div class="cpos-payment-card"><small>CONNECTED PAYMENTS</small><b>•••• 1043</b><span>Tap to pay</span></div>
                      <div class="cpos-terminal"><span>Rs. 4,850.00</span><i class="cpos-spinner" aria-hidden="true"></i><small>Processing payment</small></div>
                    </div>
                    <div v-else class="cpos-ui-panel cpos-ui-receipt">
                      <span class="cpos-big-check" aria-hidden="true">✓</span><h4>Payment received</h4><small>Order #1043</small><strong class="cpos-ui-total">Rs. 4,850.00</strong>
                      <div class="cpos-ui-row"><span>Payment method</span><b>Card</b></div><div class="cpos-ui-action">Paid ✓</div>
                    </div>
                  </template>

                  <!-- INVENTORY: overview, quantity change, restock alert. -->
                  <template v-else>
                    <div v-if="state.inventory.index === 0" class="cpos-ui-panel">
                      <div class="cpos-ui-header"><b>Stock overview</b><span>Live</span></div>
                      <div v-for="product in products" :key="product.name" class="cpos-list-row"><span class="cpos-list-icon" :style="{ background: product.color }">{{ product.symbol }}</span><div><b>{{ product.name }}</b><small>{{ product.stock }} available</small></div><span class="cpos-green-text">In stock</span></div>
                    </div>
                    <div v-else-if="state.inventory.index === 1" class="cpos-ui-panel">
                      <div class="cpos-ui-header"><b>Sale #1043</b><span>Stock update</span></div>
                      <div class="cpos-large-product">☕</div><p class="cpos-ui-center">House blend coffee</p>
                      <div class="cpos-stock-change"><span>82</span><i>→</i><b>80</b></div><div class="cpos-ui-action">2 sold · Stock updated ✓</div>
                    </div>
                    <div v-else class="cpos-ui-panel">
                      <div class="cpos-ui-header"><b>Stock alerts</b><span>Attention</span></div>
                      <div class="cpos-large-product">🥐</div><div class="cpos-restock-warning"><b>Fresh pastries running low</b><span>12 remaining · Review stock</span></div>
                      <div class="cpos-sync-pills"><span>Online store ✓</span><span>In-store ✓</span></div>
                    </div>
                  </template>
                </div>
              </Transition>
              <h4 class="cpos-scene-title">{{ scene(feature).title }}</h4>
            </div>
            <div class="cpos-scene-navigation">
              <button type="button" :aria-label="'Previous ' + feature.title + ' scene'" @click="selectScene(feature, state[feature.id].index - 1)">←</button>
              <span>{{ state[feature.id].index + 1 }} / {{ feature.scenes.length }}</span>
              <button type="button" :aria-label="'Next ' + feature.title + ' scene'" @click="selectScene(feature, state[feature.id].index + 1)">→</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
