<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import {
  giftRegistryHero, giftRegistryFAQs,
  registryFeaturesContent, registryFeatureCards,
  registryStoryContent, registryStoryCards,
  registryJourneyContent, registryJourneySteps, registryJourneyProducts, registryJourneyImages
} from './GiftRegistry.js'

const pageRef = ref(null)
const featuresRef = ref(null)
const journeyRef = ref(null)
const featuresInView = ref(true)
const journeyInView = ref(false)
const activeStep = ref(0)
const autoplay = ref(true)
const sequenceVersion = ref(0)
const sceneDuration = 5600
const reducedMotion = ref(false)

let revealObserver
let visibilityObserver
let preference
let timer

function hideFailedImage(event) {
  event.target.hidden = true
}

function stopTimer() {
  if (timer) window.clearInterval(timer)
  timer = null
}

function syncTimer() {
  stopTimer()
  if (!autoplay.value || reducedMotion.value ||
      !journeyInView.value || document.hidden) return
  sequenceVersion.value += 1
  timer = window.setInterval(() => {
    activeStep.value = (activeStep.value + 1) % registryJourneySteps.length
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

function setupMotion() {
  revealObserver?.disconnect()
  visibilityObserver?.disconnect()
  stopTimer()
  reducedMotion.value = preference.matches
  const page = pageRef.value
  if (!page) return
  page.querySelectorAll('[data-gr-reveal]').forEach((el) => {
    el.classList.remove('gr-reveal-ready', 'gr-revealed')
  })
  if (!('IntersectionObserver' in window)) {
    featuresInView.value = true
    journeyInView.value = true
    syncTimer()
    return
  }
  if (!reducedMotion.value) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('gr-revealed')
        revealObserver.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    page.querySelectorAll('[data-gr-reveal]').forEach((el) => {
      el.classList.add('gr-reveal-ready')
      revealObserver.observe(el)
    })
  }
  visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === featuresRef.value) featuresInView.value = entry.isIntersecting
      if (entry.target === journeyRef.value) journeyInView.value = entry.isIntersecting
    })
    syncTimer()
  }, { threshold: 0 })
  if (featuresRef.value) visibilityObserver.observe(featuresRef.value)
  if (journeyRef.value) visibilityObserver.observe(journeyRef.value)
}

onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  setupMotion()
  preference.addEventListener('change', setupMotion)
  document.addEventListener('visibilitychange', syncTimer)
})

onBeforeUnmount(() => {
  stopTimer()
  revealObserver?.disconnect()
  visibilityObserver?.disconnect()
  preference?.removeEventListener('change', setupMotion)
  document.removeEventListener('visibilitychange', syncTimer)
})
</script>

<template>
  <main ref="pageRef" class="gift-registry-page">
    <Hero v-bind="giftRegistryHero" />

  <section ref="featuresRef" class="grf-section" :class="{ 'grf-visible': featuresInView }" aria-labelledby="gr-features-title">
    <div class="grf-shell">
      <header class="grf-heading">
        <h2 id="gr-features-title">{{ registryFeaturesContent.headingFirst }}<span>{{ registryFeaturesContent.headingSecond }}</span></h2>
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

    <!-- SECTION 03: full photograph and light editorial cards -->
    <section class="gr-section gr-story" aria-labelledby="gr-story-title">
      <div class="gr-shell">
        <header class="gr-heading gr-heading--center" data-gr-reveal>
          <h2 id="gr-story-title">{{ registryStoryContent.headingFirst }}<span>{{ registryStoryContent.headingSecond }}</span></h2>
          <p>{{ registryStoryContent.description }}</p>
        </header>

        <figure class="gr-story-photo" data-gr-reveal>
          <!-- Natural height shows the complete image rather than cropping it. -->
          <img :src="registryStoryContent.image" :alt="registryStoryContent.imageAlt" loading="lazy" decoding="async" />
          <figcaption><span aria-hidden="true">♡</span>{{ registryStoryContent.photoCaption }}</figcaption>
        </figure>

        <div class="gr-story-grid">
          <article v-for="(card, index) in registryStoryCards" :key="card.id"
            class="gr-story-card" :class="`gr-tone--${card.variant}`"
            :style="{ '--gr-delay': `${index * 90}ms` }" data-gr-reveal>
            <span class="gr-editorial-number" aria-hidden="true">{{ card.number }}</span>
            <div class="gr-story-copy"><h3>{{ card.title }}</h3><p>{{ card.description }}</p></div>
          </article>
        </div>
      </div>
    </section>


    <section
      ref="journeyRef"
      class="grj-section"
      :class="{ 'grj-in-view': journeyInView, 'grj-playing': autoplay && journeyInView && !reducedMotion }"
      :style="{ '--scene-duration': `${sceneDuration}ms` }"
      aria-labelledby="gr-journey-title"
    >
      <div class="grj-shell">
        <div class="grj-copy" data-gr-reveal>
          <h2 id="gr-journey-title">
            {{ registryJourneyContent.headingFirst }}
            <span>{{ registryJourneyContent.headingSecond }}</span>
          </h2>
          <p class="grj-description">{{ registryJourneyContent.description }}</p>

          <div class="grj-steps">
            <button
              v-for="(step, index) in registryJourneySteps"
              :key="step.number"
              class="grj-step"
              :class="{ 'grj-step--active': activeStep === index }"
              type="button"
              :aria-pressed="activeStep === index"
              aria-controls="grj-preview"
              @click="selectStep(index)"
            >
              <span class="grj-step-number" aria-hidden="true">{{ step.number }}</span>
              <span class="grj-step-content"><strong>{{ step.title }}</strong><small>{{ step.description }}</small></span>
              <span class="grj-step-arrow" aria-hidden="true">↗</span>
              <span v-if="activeStep === index" :key="`${index}-${sequenceVersion}`" class="grj-step-progress" aria-hidden="true"></span>
            </button>
          </div>
          <a class="grj-cta" :href="giftRegistryHero.primaryButton.link">Get a Free Demo <span aria-hidden="true">↗</span></a>
        </div>

        <div class="grj-art" data-gr-reveal>
          <div class="grj-art-glow" aria-hidden="true"></div>
          <div id="grj-preview" class="grj-device" role="region" aria-label="Illustrative Cartinno gift registry preview">
            <div class="grj-device-top" aria-hidden="true">
              <div class="grj-brand">cartinno<span>®</span></div>
              <span class="grj-app-label">Gift registry</span>
              <span class="grj-demo-avatar">A</span>
            </div>
            <div class="grj-demo-nav" aria-hidden="true">
              <span>My registry</span><span>Overview <b>›</b> {{ ['Create a registry', 'Choose gifts', 'Share your wishes'][activeStep] }}</span>
            </div>
            <Transition name="grj-fade" mode="out-in">
              <div v-if="activeStep === 0" key="create" class="grj-scene grj-create-preview" aria-hidden="true">
                <div class="grj-scene-heading"><span class="grj-device-kicker">01 / MAKE IT PERSONAL</span><h3>A moment of your own.</h3><p>Every thoughtful gift starts with a little wish.</p></div>
                <div class="grj-cover">
                  <img :src="registryJourneyImages.cover" alt="" decoding="async" @error="hideFailedImage" />
                  <span class="grj-cover-shade"></span>
                  <div><span>OUR NEXT CHAPTER</span><strong>Anna &amp; James</strong><small>A celebration of us.</small></div>
                  <span class="grj-cover-label">Wedding registry</span>
                </div>
                <div class="grj-form-field"><span>REGISTRY NAME</span><strong>Our new beginning<span class="grj-typing-caret"></span></strong></div>
                <div class="grj-form-pair"><div class="grj-form-field"><span>OCCASION</span><strong>Wedding <b>⌄</b></strong></div><div class="grj-form-field"><span>CELEBRATION DATE</span><strong>18 December <b>◇</b></strong></div></div>
                <div class="grj-fake-button"><span>Create my registry</span><span>↗</span></div>
                <div class="grj-scene-success"><span>✓</span> Your story starts here.</div>
              </div>
              <div v-else-if="activeStep === 1" key="products" class="grj-scene grj-products-preview" aria-hidden="true">
                <div class="grj-scene-heading"><span class="grj-device-kicker">02 / GATHER YOUR FAVOURITES</span><h3>Little things. Lots of love.</h3><p>A collection that feels beautifully like you.</p></div>
                <div class="grj-products-toolbar"><span>All favourites <b>03</b></span><span>♡ Saved with love</span></div>
                <div class="grj-preview-products">
                  <div v-for="(product,index) in registryJourneyProducts" :key="product.id" class="grj-preview-product" :style="{ '--item-delay': `${index * 160}ms` }">
                    <div class="grj-product-image" :style="{ background: product.background }"><img :src="product.image" :alt="product.alt" decoding="async" :style="{ objectPosition: product.position }" @error="hideFailedImage" /><span class="grj-product-heart">♥</span></div>
                    <small>{{ product.category }}</small><strong>{{ product.name }}</strong><span class="grj-product-selected">✓ Added to registry</span>
                  </div>
                </div>
                <div class="grj-registry-summary"><div class="grj-summary-heart">♡</div><div><strong>All your favourites, together.</strong><small>3 thoughtful gifts on your wish list</small></div><span>✓</span></div>
                <div class="grj-fake-button"><span>Continue to sharing</span><span>↗</span></div>
              </div>
              <div v-else key="share" class="grj-scene grj-share-preview" aria-hidden="true">
                <div class="grj-scene-heading"><span class="grj-device-kicker">03 / SHARE A LITTLE JOY</span><h3>Good things are better shared.</h3><p>Invite your favourite people into your story.</p></div>
                <div class="grj-invitation">
                  <div class="grj-invitation-images"><img v-for="product in registryJourneyProducts" :key="product.id" :src="product.image" :alt="product.alt" decoding="async" @error="hideFailedImage" /></div>
                  <span class="grj-invite-heart">♡</span><small>YOU'RE PART OF OUR STORY</small><strong>Anna &amp; James</strong><p>A little wish list for our new beginning.</p>
                </div>
                <div class="grj-faux-link"><span>cartinno.com / registry / our-day</span><span>Copy link ↗</span></div>
                <div class="grj-share-methods"><span>✉ &nbsp; Email</span><span>♡ &nbsp; Loved ones</span><span>↗ &nbsp; Share link</span></div>
                <div class="grj-scene-success"><span>✓</span> Your registry is ready to share.</div>
              </div>
            </Transition>
            <div class="grj-demo-footer" aria-hidden="true"><span><i></i> Your moment, beautifully connected.</span><span>Cartinno</span></div>
          </div>
          <div class="grj-preview-controls">
            <div class="grj-page-dots" aria-label="Registry preview steps">
              <button v-for="(step,index) in registryJourneySteps" :key="step.number" type="button"
                :class="{ 'grj-dot--active': activeStep === index }" :aria-label="`Show ${step.title}`"
                :aria-pressed="activeStep === index" aria-controls="grj-preview" @click="selectStep(index)">{{ step.number }}</button>
            </div>
            <button v-if="!reducedMotion" class="grj-motion-toggle" type="button" @click="toggleAutoplay">{{ autoplay ? 'Pause preview' : 'Play preview' }}</button>
          </div>
          <small class="grj-demo-caption">Illustrative Cartinno registry experience</small>
        </div>
      </div>
    </section>


    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Gift Registry."
      :items="giftRegistryFAQs"
    />
    <Testimonials />
  </main>
</template>

<style scoped src="./GiftRegistry.css"></style>
