<script setup>
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { campaignIdeasContent as content, campaignIdeas as ideas } from './CampaignIdeas.js'
const selected = ref(null)
const dialog = ref(null)
const activeIdea = computed(() => ideas.find(idea => idea.id === selected.value))
let trigger
async function openIdea(idea,event) {
  trigger = event.currentTarget
  selected.value = idea.id
  await nextTick()
  if (typeof dialog.value.showModal === 'function') dialog.value.showModal()
  else dialog.value.setAttribute('open','')
  await nextTick()
  dialog.value.querySelector('button')?.focus()
}
function closeIdea() {
  dialog.value?.close?.()
  dialog.value?.removeAttribute('open')
  selected.value = null
  trigger?.focus()
}
function handleBackdrop(event) { if (event.target === dialog.value) closeIdea() }
onBeforeUnmount(() => dialog.value?.close?.())
</script>
<template>
  <section class="mc-section mci-section" data-mc-section aria-labelledby="mci-heading">
    <div class="mc-shell">
      <header class="mc-heading" data-mc-reveal>
        <h2 id="mci-heading">{{ content.headingFirst }}<span>{{ content.headingSecond }}</span></h2>
        <p>{{ content.description }}</p>
      </header>
      <div class="mci-grid">
        <div v-for="(idea,index) in ideas" :key="idea.id" class="mci-reveal"
          :class="{ 'mci-reveal--large':index === 0 }" data-mc-reveal :style="{ '--mc-delay':index*100+'ms' }">
          <button type="button" class="mci-card" @click="openIdea(idea,$event)" :aria-label="'Read campaign idea: '+idea.title">
            <img :src="idea.image" :alt="idea.alt" :style="{ objectPosition:idea.position }" width="1200" height="800" loading="lazy" decoding="async">
            <span class="mci-shade" aria-hidden="true"></span>
            <span class="mci-open" aria-hidden="true">↗</span>
            <span class="mci-copy"><small>{{ idea.category }}</small><strong>{{ idea.title }}</strong><span class="mci-read">Explore the idea <span aria-hidden="true">→</span></span></span>
          </button>
        </div>
        <a class="mci-cta" :href="content.ctaLink" data-mc-reveal>
          <span><strong>{{ content.ctaTitle }}</strong><small>{{ content.ctaDescription }}</small></span>
          <span class="mci-cta-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
    <dialog ref="dialog" class="mci-dialog" aria-labelledby="mci-dialog-title" @click="handleBackdrop" @cancel.prevent="closeIdea">
      <div v-if="activeIdea" class="mci-dialog-body">
        <button type="button" class="mci-close" @click="closeIdea" aria-label="Close campaign idea">×</button>
        <span class="mci-dialog-label">{{ activeIdea.category }}</span>
        <h3 id="mci-dialog-title">{{ activeIdea.title }}</h3>
        <p>{{ activeIdea.intro }}</p>
        <ol><li v-for="tip in activeIdea.tips" :key="tip">{{ tip }}</li></ol>
        <a :href="content.ctaLink" @click="closeIdea">Discuss your campaign <span aria-hidden="true">↗</span></a>
      </div>
    </dialog>
  </section>
</template>
<style scoped src="./CampaignIdeas.css"></style>
