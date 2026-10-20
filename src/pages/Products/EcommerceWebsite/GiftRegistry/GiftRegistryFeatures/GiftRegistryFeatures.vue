<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { registryFeaturesContent, registryFeatureCards } from './GiftRegistryFeatures.js'
import './GiftRegistryFeatures.css'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    isVisible.value = entry.isIntersecting
  }, { threshold: 0 })
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="grf-section" :class="{ 'grf-visible': isVisible }" aria-label="Gift registry features">
    <div class="grf-shell">
      <header class="grf-heading">
        <h2>{{ registryFeaturesContent.headingFirst }}<span>{{ registryFeaturesContent.headingSecond }}</span></h2>
       
        <p>{{ registryFeaturesContent.description }}</p>
      </header>

      <div class="grf-cards">
        <article v-for="(card, index) in registryFeatureCards" :key="card.id" class="grf-card" :class="`grf-card--${card.variant}`" :style="{ '--grf-order': index }">
          <div class="grf-card-copy">
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>

          <div class="grf-window-wrap" aria-hidden="true">
            <div class="grf-browser" :class="`grf-browser--${card.id}`">
              <div class="grf-browser-bar"><span class="grf-dots"><i></i><i></i><i></i></span><small>cartinno / {{ card.id === 'choose' ? 'wish list' : card.id === 'track' ? 'dashboard' : card.id === 'share' ? 'share' : 'registry' }}</small><span class="grf-browser-lock">◇</span></div>

              <div v-if="card.id === 'create'" class="grf-ui grf-ui--create">
                <div class="grf-profile"><span class="grf-avatar">♡</span><div><small>YOUR NEXT CELEBRATION</small><strong>Make your moment yours.</strong></div></div>
                <div class="grf-field"><small>REGISTRY NAME</small><strong>Our special day<span class="grf-caret"></span></strong></div>
                <div class="grf-field"><small>OCCASION</small><strong>Wedding <span>⌄</span></strong></div>
                <div class="grf-ui-button">Create my registry <span>↗</span></div>
                <div class="grf-ui-note"><span>✓</span> A little list. A lot of love.</div>
              </div>

              <div v-else-if="card.id === 'choose'" class="grf-ui grf-ui--choose">
                <div class="grf-mini-header"><small>MY FAVOURITES</small><span>♡ 08 saved</span></div>
                <div class="grf-gifts">
                  <div class="grf-gift"><div class="grf-product-art"><svg viewBox="0 0 100 90" fill="none"><ellipse cx="48" cy="75" rx="30" ry="5" fill="#ddd1c6"/><path d="M27 32h42v24c0 23-42 23-42 0Z" fill="#e3c6a9"/><path d="M69 37h7c15 0 15 21-7 21" stroke="#c2a283" stroke-width="7"/><ellipse cx="48" cy="32" rx="21" ry="6" fill="#b28b67"/><path d="M40 20c-6-8 6-8 0-15M54 20c-6-8 6-8 0-15" stroke="#c4b2a2" stroke-width="2" stroke-linecap="round"/></svg></div><small>Coffee set</small><b>♥</b></div>
                  <div class="grf-gift"><div class="grf-product-art"><svg viewBox="0 0 100 90" fill="none"><ellipse cx="50" cy="78" rx="25" ry="5" fill="#d3d7c8"/><path d="M49 52V15m0 21L34 23m15 5 13-12" stroke="#778b5d" stroke-width="3"/><ellipse cx="33" cy="21" rx="6" ry="11" transform="rotate(-35 33 21)" fill="#9aae80"/><ellipse cx="63" cy="16" rx="6" ry="10" transform="rotate(35 63 16)" fill="#8ea774"/><path d="M38 43h24l7 24c4 16-42 16-38 0Z" fill="#e8d5bd"/><ellipse cx="50" cy="43" rx="12" ry="3" fill="#c2aa8f"/></svg></div><small>Home decor</small><b>♥</b></div>
                </div>
                <div class="grf-added"><span>✓</span> Added to your registry</div>
                <div class="grf-ui-note">All your favourites, together.</div>
              </div>

              <div v-else-if="card.id === 'share'" class="grf-ui grf-ui--share">
                <span class="grf-heart">♥</span>
                <strong>You're invited!</strong>
                <p>One list. All your favourite things.</p>
                <div class="grf-share-url"><span>gift-registry / our-day</span><b>↗</b></div>
                <div class="grf-sharing"><span>✉</span><span>♡</span><span>↗</span></div>
                <div class="grf-ui-note">Share a little happiness.</div>
              </div>

              <div v-else class="grf-ui grf-ui--track">
                <div class="grf-mini-header"><small>YOUR REGISTRY</small><span>View gifts ↗</span></div>
                <strong class="grf-track-count">06 <small>gifts on your list</small></strong>
                <div class="grf-progress"><span></span></div>
                <div class="grf-tags"><span>Chosen</span><span>Saved</span><span>Shared</span></div>
                <div class="grf-track-row"><span class="grf-present">♧</span><div><b>Thoughtful surprise</b><small>Selected with love</small></div><i>✓</i></div>
                <div class="grf-ui-note">Every detail, beautifully organised.</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
