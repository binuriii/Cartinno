<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './KitchenBento.css'
import { bentoContent, bentoCards } from './KitchenBentoData.js'

const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (reduceMotion || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      isVisible.value = true
      observer?.disconnect()
      observer = null
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
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
  <section
    ref="sectionRef"
    id="kitchen-bento"
    class="kb-section"
    :class="{ 'kb-visible': isVisible }"
  >
    <div class="kb-container">
      <!-- CENTERED HEADING -->
      <header class="kb-header">
        <h2 class="kb-heading">
          {{ bentoContent.title1 }}
          <strong>{{ bentoContent.title2 }}</strong>
        </h2>
      </header>

      <!-- BENTO GRID -->
      <div class="kb-grid">

        <!-- TOP WIDE CARD (Order Management) -->
        <article class="kb-card kb-card-top" style="--kb-index: 0">
          <div class="kb-top-visual" aria-hidden="true">
            <div class="kb-mock-ticket">
              <div class="kb-mock-header">In-store • Dine In</div>
              <div class="kb-mock-item"><span>2 x</span> Quesadilla</div>
              <div class="kb-mock-item"><span>2 x</span> Blue lemonade</div>
              <div class="kb-mock-item"><span>1 x</span> Churro</div>
              <div class="kb-mock-btn">Complete <i class="fa-solid fa-check"></i></div>
            </div>

            <div class="kb-floating-notice">
              <span class="kb-notice-icon"><i class="fa-solid fa-bell"></i></span>
              <div>
                <strong>New order received</strong>
                <small>Sent straight to the kitchen</small>
              </div>
            </div>
          </div>
          <div class="kb-card-content">
            <span class="kb-eyebrow">{{ bentoCards.top.eyebrow }}</span>
            <h3 class="kb-card-title">{{ bentoCards.top.title }}</h3>
            <p class="kb-card-description">{{ bentoCards.top.description }}</p>
          </div>
        </article>

        <!-- BOTTOM LEFT CARD (Menu Control) -->
        <article class="kb-card kb-card-bl" style="--kb-index: 1">
          <div class="kb-card-content">
            <span class="kb-eyebrow">{{ bentoCards.bottomLeft.eyebrow }}</span>
            <h3 class="kb-card-title">{{ bentoCards.bottomLeft.title }}</h3>
            <p class="kb-card-description">{{ bentoCards.bottomLeft.description }}</p>
          </div>
          <div class="kb-bl-visual" aria-hidden="true">
            <div class="kb-mock-cards">
              <div class="kb-mock-card side left"></div>
              <div class="kb-mock-card center">
                <div class="kb-mock-img" style="background-image: url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop');"></div>
                <div class="kb-mock-title">Birria Tacos</div>
                <div class="kb-mock-lines">
                  <div></div>
                  <div class="short"></div>
                </div>
                <div class="kb-mock-btn-dark">Mark as sold out</div>
              </div>
              <div class="kb-mock-card side right"></div>
            </div>
          </div>
        </article>

        <!-- BOTTOM RIGHT CARD (Tablet Checkout) -->
        <article class="kb-card kb-card-br" style="--kb-index: 2">
          <img
            :src="bentoCards.bottomRight.image"
            :alt="bentoCards.bottomRight.imageAlt"
            class="kb-bg-image"
            loading="lazy"
          />
          <div class="kb-overlay"></div>
          <div class="kb-card-content">
            <span class="kb-eyebrow">{{ bentoCards.bottomRight.eyebrow }}</span>
            <h3 class="kb-card-title">{{ bentoCards.bottomRight.title }}</h3>
            <p class="kb-card-description">{{ bentoCards.bottomRight.description }}</p>
          </div>
        </article>

      </div>
    </div>
  </section>
</template>