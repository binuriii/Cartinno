<script setup>
import { scalablePOSStoryContent, scalablePOSStoryCards } from './ScalablePOSStory.js'
import './ScalablePOSStory.css'
</script>
<template>
<!-- SECTION 02: lifestyle image and three editorial story cards -->
    <section class="gr-section gr-story" aria-labelledby="pos-story-title">
      <div class="gr-shell">
        <header class="gr-heading gr-heading--center" data-pos-reveal>
          <h2 id="pos-story-title">
            {{ scalablePOSStoryContent.headingFirst }}
            <span>{{ scalablePOSStoryContent.headingSecond }}</span>
          </h2>
          <p>{{ scalablePOSStoryContent.description }}</p>
        </header>

        <figure class="gr-story-photo" data-pos-reveal>
          <img
            :src="scalablePOSStoryContent.image"
            :alt="scalablePOSStoryContent.imageAlt"
            loading="lazy"
            decoding="async"
          />
          <figcaption><span aria-hidden="true">↗</span>{{ scalablePOSStoryContent.photoCaption }}</figcaption>
        </figure>

        <div class="gr-story-grid">
          <article
            v-for="(card, index) in scalablePOSStoryCards"
            :key="card.id"
            class="gr-story-card"
            :class="`gr-tone--${card.variant}`"
            :style="{ '--gr-delay': `${index * 90}ms` }"
            data-pos-reveal
          >
            <span class="gr-editorial-number" aria-hidden="true">{{ card.number }}</span>
            <div class="gr-story-copy">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
</template>
