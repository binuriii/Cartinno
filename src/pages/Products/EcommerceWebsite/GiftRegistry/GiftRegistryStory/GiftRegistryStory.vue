<script setup>
import { ref } from 'vue'
import { useRegistryMotion } from '../useRegistryMotion.js'
import { registryStoryContent, registryStoryCards } from './GiftRegistryStory.js'

const sectionRef = ref(null)
useRegistryMotion(sectionRef)
</script>

<template>
    <!-- SECTION 03: full photograph and light editorial cards -->
    <section ref="sectionRef" class="gr-section gr-story" aria-labelledby="gr-story-title">
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

</template>

<!-- Scoped styles cannot affect the existing four-card section. -->
<style scoped src="../GiftRegistrySections.css"></style>
