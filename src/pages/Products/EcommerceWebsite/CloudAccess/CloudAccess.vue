<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'

import CloudAccessOverview from './CloudAccessOverview/CloudAccessOverview.vue'
import CloudAccessJourney from './CloudAccessJourney/CloudAccessJourney.vue'
import CloudAccessGrowth from './CloudAccessGrowth/CloudAccessGrowth.vue'
import { cloudAccessHero, cloudAccessFAQs } from './CloudAccess.js'
import './CloudAccess.css'

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
      entry.target.classList.add('ca-visible')
      observer.unobserve(entry.target)
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

  root.classList.add('ca-motion-ready')
  root.querySelectorAll('[data-cloud-reveal]').forEach((element) => revealObserver.observe(element))
})

onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <main ref="pageRef" class="cloud-access-page">
    <Hero v-bind="cloudAccessHero" />

    <CloudAccessOverview />
    <CloudAccessJourney />
    <CloudAccessGrowth />

    <FAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Cloud Access."
      :items="cloudAccessFAQs"
    />
    <Testimonials />
  </main>
</template>
