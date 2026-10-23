
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

import {
  giftCardOccasionsContent,
  giftCardOccasions
} from './GiftCardOccasionsData.js'

import './GiftCardOccasions.css'

const sectionRef = ref(null)
const visibleCards = ref(new Set())
let observer = null

const isInternalLink = (link) =>
  typeof link === 'string' &&
  link.startsWith('/') &&
  !link.startsWith('//')

onMounted(() => {
  const cards = sectionRef.value?.querySelectorAll(
    '.gco-card'
  )

  if (!cards?.length) return

  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {
    visibleCards.value = new Set(
      giftCardOccasions.map(card => card.id)
    )
    return
  }

  observer = new IntersectionObserver(
    entries => {
      const updated = new Set(visibleCards.value)

      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        updated.add(
          Number(entry.target.dataset.cardId)
        )

        observer.unobserve(entry.target)
      })

      visibleCards.value = updated
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    }
  )

  cards.forEach(card => observer.observe(card))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="gco-section"
    id="gift-card-occasions"
  >
    <div class="gco-container">

      <!-- CENTERED HEADING -->
      <header class="gco-header">
        <h2 class="gco-heading">
          {{ giftCardOccasionsContent.title }}
        </h2>

        <p class="gco-description">
          {{ giftCardOccasionsContent.description }}
        </p>
      </header>

      <!-- SIX OCCASION CARDS -->
      <div class="gco-grid">

        <article
          v-for="card in giftCardOccasions"
          :key="card.id"
          class="gco-card"
          :class="[
            `gco-card-${card.theme}`,
            `gco-card-${card.size}`,
            {
              'gco-visible': visibleCards.has(card.id)
            }
          ]"
          :data-card-id="card.id"
        >

          <!-- TEXT CONTENT -->
          <div class="gco-card-content">

            <span class="gco-card-subtitle">
              {{ card.subtitle }}
            </span>

            <h3 class="gco-card-title">
              {{ card.title }}
            </h3>

            <p class="gco-card-description">
              {{ card.description }}
            </p>

            <!-- OPTIONAL LINK -->
            <component
              :is="isInternalLink(card.link)
                ? RouterLink
                : 'a'"
              v-if="card.link"
              class="gco-card-button"
              v-bind="isInternalLink(card.link)
                ? { to: card.link }
                : { href: card.link }"
            >
              Explore Gifts
              <i
                class="fa-solid fa-arrow-right"
                aria-hidden="true"
              ></i>
            </component>

          </div>

          <!-- OCCASION IMAGE -->
          <div class="gco-card-art">

            <img
              v-if="card.image"
              :src="card.image"
              :alt="card.imageAlt"
              class="gco-card-image"
              loading="lazy"
            />

            <!-- FALLBACK ILLUSTRATION -->
            <div
              v-else
              class="gco-art-placeholder"
              aria-hidden="true"
            >
              <div class="gco-placeholder-circle">
                <i
                  :class="{
                    'fa-solid fa-cake-candles':
                      card.theme === 'birthday',
                    'fa-solid fa-heart':
                      card.theme === 'thankyou',
                    'fa-solid fa-trophy':
                      card.theme === 'congratulations',
                    'fa-solid fa-ring':
                      card.theme === 'anniversary',
                    'fa-solid fa-gift':
                      card.theme === 'justbecause',
                    'fa-solid fa-heart-circle-check':
                      card.theme === 'wedding'
                  }"
                ></i>
              </div>
              <span class="gco-placeholder-sparkle">
                ✦
              </span>
            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
