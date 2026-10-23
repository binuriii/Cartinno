<script setup>
import { storiesContent, loyaltyStories } from './LoyaltyStories.js'
import './LoyaltyStories.css'
</script>

<template>
  <section class="lst-section" aria-labelledby="lst-title">
    <div class="lst-shell">
      <p class="lst-eyebrow">{{ storiesContent.eyebrow }}</p>
      <h2 id="lst-title">{{ storiesContent.titleFirst }}<br /><span>{{ storiesContent.titleSecond }}</span></h2>

      <div class="lst-grid">
        <article
          v-for="(story, index) in loyaltyStories"
          :key="story.id"
          class="lst-story"
          :class="{ 'lst-story--large': index === 0 }"
        >
          <img :src="story.image" :alt="story.alt" loading="lazy" />
          <div class="lst-story-body">
            <span>{{ story.label }}</span>
            <h3>{{ story.title }}</h3>
          </div>
        </article>

        <a class="lst-cta" :href="storiesContent.actionHref">
          <span>
            <strong>{{ storiesContent.actionTitle }}</strong>
            <small>{{ storiesContent.actionDescription }}</small>
          </span>
          <span class="lst-cta-icon"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
        </a>
      </div>
    </div>
  </section>
</template>
