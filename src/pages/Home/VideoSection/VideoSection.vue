<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
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

const base = import.meta.env.BASE_URL

const mainEl = ref(null)
const videoEl = ref(null)
const playing = ref(false)
const muted = ref(true)

let observer = null

/* YouTube / Vimeo links need an iframe; anything else (mp4, webm) needs <video> */
const isEmbed = /youtube\.com|youtu\.be|vimeo\.com/.test(main.video)

/* "cartinno-video.mp4" is looked up in /public, absolute URLs are left alone */
const videoSrc = /^(https?:)?\/\//.test(main.video) || main.video.startsWith('/')
  ? main.video
  : `${base}${main.video}`

const embedSrc = computed(() => {
  const sep = main.video.includes('?') ? '&' : '?'
  return `${main.video}${sep}autoplay=1&mute=${muted.value ? 1 : 0}&rel=0&playsinline=1`
})

const tryPlay = async () => {
  await nextTick()
  videoEl.value?.play?.().catch(() => {})
}

/* click: user gesture, so sound is allowed */
const playVideo = () => {
  muted.value = false
  playing.value = true
  tryPlay()
}

/* scroll: browsers only allow autoplay when muted */
const autoPlay = () => {
  if (!playing.value) {
    muted.value = true
    playing.value = true
  }
  tryPlay()
}

const pauseVideo = () => {
  videoEl.value?.pause?.()
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !mainEl.value || !('IntersectionObserver' in window)) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) autoPlay()
      else pauseVideo()
    },
    { threshold: 0.45 }
  )
  observer.observe(mainEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section class="vs" id="case-studies">

    <h2 class="vs-title">
      {{ headline }}
    </h2>

    <div class="vs-grid">

      <!-- BIG VIDEO CARD -->
      <article ref="mainEl" class="vs-main">

        <div class="vs-main-media">

          <!-- POSTER UNTIL PLAYING -->
          <template v-if="!playing">
            <img
              class="vs-main-poster"
              :src="main.poster"
              :alt="main.title"
            />

            <div class="vs-main-overlay"></div>
          </template>

          <!-- MP4 / WEBM -->
          <video
            v-else-if="!isEmbed"
            ref="videoEl"
            class="vs-main-video"
            style="position:absolute;inset:0;width:100%;height:100%;max-width:100%;object-fit:cover;display:block;background:#000;"
            :src="videoSrc"
            :poster="main.poster"
            :muted="muted"
            autoplay
            loop
            playsinline
            disablepictureinpicture
            disableremoteplayback
            controlslist="nodownload nofullscreen noremoteplayback"
            preload="auto"
          ></video>

          <!-- YOUTUBE / VIMEO -->
          <iframe
            v-else
            class="vs-main-iframe"
            :src="embedSrc"
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

          <button
            v-if="!playing"
            type="button"
            class="vs-play"
            aria-label="Play case study video"
            @click="playVideo"
          >
            <span class="vs-play-icon">
              <i class="fa-solid fa-play" aria-hidden="true"></i>
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