<script setup>
import { useReveal } from '../shared/useReveal.js'
import { connectionsContent, callCard, connectionCards, icons } from './CloudPhoneConnectionsData.js'
import './CloudPhoneConnections.css'

const { root, ready, inView } = useReveal({ threshold: 0.15 })
</script>

<template>
  <section
    id="cloud-phone-connections"
    ref="root"
    :class="['cpc-section', { 'is-ready': ready, 'is-in': inView }]"
    aria-labelledby="cpc-title"
  >
    <div class="cpc-container">
      <h2 id="cpc-title" class="cpc-title">
        <span class="cpc-line"><span>{{ connectionsContent.title }}</span></span>
      </h2>

      <div class="cpc-grid">
        <!-- LARGE PHOTO + LIVE CALL CARD -->
        <figure class="cpc-photo">
          <img :src="connectionsContent.photo" :alt="connectionsContent.photoAlt" loading="lazy" />
          <div class="cpc-call" aria-hidden="true">
            <span class="cpc-call-avatar">{{ callCard.initials }}</span>
            <span class="cpc-call-text">
              <small>{{ callCard.label }}</small>
              <strong>{{ callCard.name }}</strong>
              <em>{{ callCard.meta }}</em>
            </span>
            <span class="cpc-call-answer">
              <svg viewBox="0 0 24 24" v-html="icons.phone"></svg>
            </span>
          </div>
        </figure>

        <!-- RIGHT COLUMN -->
        <div class="cpc-side">
          <div class="cpc-cards">
            <a
              v-for="(card, i) in connectionCards"
              :key="card.id"
              :href="card.href"
              class="cpc-card"
              :style="{ '--i': i, '--tint': card.tint }"
            >
              <img :src="card.image" :alt="card.alt" loading="lazy" />
              <h3>{{ card.title }}</h3>
            </a>
          </div>

          <div class="cpc-text">
            <p>{{ connectionsContent.description }}</p>
            <a :href="connectionsContent.button.href" class="cpc-button">{{ connectionsContent.button.text }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
