<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './PosIntegrationGrid.css'
import { posGridContent } from './PosIntegrationGridData.js'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

function play() {
  isVisible.value = true
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        play()
        observer?.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
  )
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="pig-section" :class="{ 'is-visible': isVisible }">
    <div class="pig-wrapper">

      <!-- Section Heading -->
      <div class="pig-header">
        <h2 class="pig-title">
          {{ posGridContent.heading.main }}
          <span class="pig-title-muted">{{ posGridContent.heading.muted }}</span>
        </h2>
      </div>

      <!-- Bento Grid -->
      <div class="pig-grid">

        <!-- Top Large Card (Full Width) -->
        <div class="pig-card pig-card-top">
          <div class="pig-top-visual">
            <div class="pig-menu">
              <div
                v-for="item in posGridContent.cards.top.items"
                :key="item.name"
                class="pig-menu-item"
              >
                <img class="pig-thumb" :src="item.src" :alt="item.name" loading="lazy" />
                <div class="pig-menu-text">
                  <span class="pig-menu-name">{{ item.name }}</span>
                  <span class="pig-skel"></span>
                  <span class="pig-skel"></span>
                  <span class="pig-price">{{ item.price }}</span>
                </div>
                <span class="pig-add"></span>
              </div>
            </div>
          </div>
          <div class="pig-top-content">
            <span class="pig-label">{{ posGridContent.cards.top.label }}</span>
            <h3>{{ posGridContent.cards.top.title }}</h3>
          </div>
        </div>

        <!-- Bottom Left Card (Dark Image Background) -->
        <div class="pig-card pig-card-bottom-left">
          <div
            class="pig-bg-image"
            role="img"
            :aria-label="posGridContent.cards.bottomLeft.image.alt"
            :style="{ backgroundImage: `url(${posGridContent.cards.bottomLeft.image.src})` }"
          ></div>
          <div class="pig-overlay"></div>

          <div class="pig-bl-content">
            <span class="pig-label pig-label-light">{{ posGridContent.cards.bottomLeft.label }}</span>
            <h3>{{ posGridContent.cards.bottomLeft.title }}</h3>
          </div>
        </div>

        <!-- Bottom Right Card (White Background + Orbit) -->
        <div class="pig-card pig-card-bottom-right">
          <div class="pig-orbit" aria-hidden="true">
            <span class="pig-ring pig-ring-1"></span>
            <span class="pig-ring pig-ring-2"></span>
            <span class="pig-ring pig-ring-3"></span>

            <div
              v-for="(tile, i) in posGridContent.cards.bottomRight.tiles"
              :key="i"
              class="pig-tile"
              :class="`pig-t${i + 1}`"
            >
              <img :src="tile.src" alt="" loading="lazy" />
              <span v-if="tile.add" class="pig-add"></span>
              <span v-if="tile.badge" class="pig-tile-badge">{{ tile.badge }}</span>
            </div>
          </div>

          <div class="pig-br-content">
            <span class="pig-label">{{ posGridContent.cards.bottomRight.label }}</span>
            <h3>{{ posGridContent.cards.bottomRight.title }}</h3>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>