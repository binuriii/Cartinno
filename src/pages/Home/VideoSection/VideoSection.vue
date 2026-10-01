<script setup>
import { ref } from 'vue'
import './VideoSection.css'

import {
  badge,
  headline,
  paragraph,
  linkText,
  linkHref,
  main,
  cards
} from './VideoSectionData.js'

const playing = ref(false)

const playVideo = () => {
  playing.value = true
}
</script>

<template>
  <section class="vs" id="case-studies">

    <h2 class="vs-title">
      {{ headline }}
    </h2>

    <div class="vs-grid">

      <!-- BIG VIDEO CARD -->
      <article class="vs-main">

        <div class="vs-main-media">

          <!-- CUSTOM POSTER -->
          <template v-if="!playing">

            <img
              class="vs-main-poster"
              :src="main.poster"
              :alt="main.title"
            />

            <div class="vs-main-overlay"></div>

          </template>

          <!-- YOUTUBE ONLY AFTER CLICK -->
          <iframe
            v-else
            class="vs-main-iframe"
            :src="`${main.video}&autoplay=1&rel=0`"
            :title="main.title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>

        </div>

        <div
          class="vs-main-body"
          :class="{ 'is-playing': playing }"
        >

          <!-- PLAY BUTTON ABOVE HEADING -->
          <button
            v-if="!playing"
            type="button"
            class="vs-play"
            aria-label="Play case study video"
            @click="playVideo"
          >
            <span class="vs-play-icon">
              <i
                class="fa-solid fa-play"
                aria-hidden="true"
              ></i>
            </span>

            <span class="vs-play-text">
              Watch Story
            </span>
          </button>

          <h3>
            {{ main.title }}
          </h3>

          <p>
            {{ main.text }}
          </p>


        </div>

      </article>

      <!-- RIGHT COLUMN -->
      <div class="vs-side">

        <div class="vs-cards">

          <article
            v-for="c in cards"
            :key="c.title"
            class="vs-card"
            :class="`is-${c.tone}`"
            :style="
              c.image
                ? { backgroundImage: `url('${c.image}')` }
                : null
            "
          >
            <h4>
              {{ c.title }}
            </h4>
          </article>

        </div>

        <p class="vs-text">
          {{ paragraph }}
        </p>

        <a
          :href="linkHref"
          class="vs-link"
        >
          {{ linkText }}

        </a>

      </div>

    </div>

  </section>
</template>