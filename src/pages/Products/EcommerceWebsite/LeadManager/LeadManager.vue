<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Reuse Cartinno's existing inner-page components (as on the SEO page).
// AppHeader and AppFooter already live in App.vue. Do not repeat them here.
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import LeadOverview from './LeadOverview/LeadOverview.vue'
import LeadJourney from './LeadJourney/LeadJourney.vue'
import LeadGrowth from './LeadGrowth/LeadGrowth.vue'
import { leadManagerHero, leadManagerFAQs } from './LeadManager.js'
import './LeadManager.css'

const pageRef = ref(null)
let revealObserver = null

onMounted(() => {
  const root = pageRef.value
  if (!root || typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return

  revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('lm-visible')
      observer.unobserve(entry.target)
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

  // Only opt elements into animation after JS + IntersectionObserver are ready.
  root.classList.add('lm-motion-ready')
  root.querySelectorAll('[data-lead-reveal]').forEach((element) => revealObserver.observe(element))
})

onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <main ref="pageRef" class="lm-page">
    <Hero v-bind="leadManagerHero" />

    <!-- 01: Preserved first section -->
    <LeadOverview />

    <!-- 02: Photo left + numbered features right -->
    <LeadJourney />

    <!-- 03: Premium photo bento with CTA -->
    <LeadGrowth />

    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Lead Manager."
      :items="leadManagerFAQs"
    />
    <Testimonials />
  </main>
</template>
