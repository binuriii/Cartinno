<script setup>
import { useReveal } from '../shared/useReveal.js'
import { featuresContent, featureCards } from './CloudPhoneFeaturesData.js'
import './CloudPhoneFeatures.css'

const { root, ready, inView } = useReveal({ threshold: 0.12 })
</script>

<template>
  <section
    id="cloud-phone-features"
    ref="root"
    :class="['cpf-section', { 'is-ready': ready, 'is-in': inView }]"
    aria-labelledby="cpf-title"
  >
    <div class="cpf-container">
      <!-- HEADING -->
      <header class="cpf-header">
        <h2 id="cpf-title" class="cpf-title">
          <span class="cpf-line"><span style="--l: 0">{{ featuresContent.title1 }}</span></span>
          <span class="cpf-line"><span style="--l: 1">{{ featuresContent.title2 }}</span></span>
        </h2>
        <p class="cpf-description">{{ featuresContent.description }}</p>
      </header>

      <!-- THREE CARDS -->
      <div class="cpf-cards">
        <article
          v-for="(card, i) in featureCards"
          :key="card.id"
          :class="['cpf-card', `cpf-card--${card.theme}`]"
          :style="{ '--i': i }"
        >
          <div class="cpf-meta">
            <span>{{ card.label }}</span>
            <span>{{ card.number }}</span>
          </div>
          <h3 class="cpf-card-title">{{ card.title }}</h3>
          <p class="cpf-card-description">{{ card.description }}</p>

          <!-- CARD IMAGE -->
          <figure class="cpf-image">
            <img :src="card.image" :alt="card.alt" loading="lazy" />
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>