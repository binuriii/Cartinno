<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Hero from '../../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../../components/InnerPages/Testimonials/Testimonials.vue'
import CampaignGrowth from './CampaignGrowth/CampaignGrowth.vue'
import CampaignIdeas from './CampaignIdeas/CampaignIdeas.vue'
import CampaignBenefits from './CampaignBenefits/CampaignBenefits.vue'
import { marketingCampaignsHero, marketingCampaignsFAQs } from './MarketingCampaigns.js'

const page = ref(null)
const paused = ref(false)
const reduced = ref(false)
const tabVisible = ref(true)
let revealObserver, sectionObserver, motionPreference
function updateVisibility() { tabVisible.value = !document.hidden }
function updateMotion() { reduced.value = motionPreference.matches }
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotion()
  motionPreference.addEventListener('change', updateMotion)
  updateVisibility()
  document.addEventListener('visibilitychange', updateVisibility)
  const elements = page.value.querySelectorAll('[data-mc-reveal]')
  const sections = page.value.querySelectorAll('[data-mc-section]')
  if (!('IntersectionObserver' in window)) {
    sections.forEach(el => el.classList.add('mc-in-view'))
    return
  }
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('mc-entered')
      revealObserver.unobserve(entry.target)
    })
  }, { threshold: 0.08 })
  elements.forEach(el => {
    if (!reduced.value) el.classList.add('mc-reveal-ready')
    revealObserver.observe(el)
  })
  sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('mc-in-view', entry.isIntersecting))
  }, { threshold: 0 })
  sections.forEach(el => sectionObserver.observe(el))
})
onBeforeUnmount(() => {
  revealObserver?.disconnect()
  sectionObserver?.disconnect()
  motionPreference?.removeEventListener('change', updateMotion)
  document.removeEventListener('visibilitychange', updateVisibility)
})
</script>
<template>
  <main ref="page" class="marketing-campaigns-page"
    :class="{ 'mc-animations-paused': paused || reduced || !tabVisible, 'mc-reduced': reduced }">
    <Hero v-bind="marketingCampaignsHero" />
    <CampaignGrowth />
    <CampaignBenefits :paused="paused" :reduced="reduced" @toggle-motion="paused = !paused" />
    <CampaignIdeas />
    <FAQ title="Frequently Asked Questions"
      description="Everything you need to know about Cartinno Marketing Campaigns."
      :items="marketingCampaignsFAQs" />
    <Testimonials />
  </main>
</template>
<style src="./MarketingCampaigns.css"></style>
