<script setup>
import './Pricing.css'
import { badge, headline, plans, footnote } from './PricingData.js'
const base = import.meta.env.BASE_URL
</script>

<template>
  <section class="pr" id="pricing">
    <h2 class="pr-title">{{ headline.pre }}<span class="pr-accent">{{ headline.highlight }}</span><br>{{ headline.post }}</h2>

    <div class="pr-cards">
      <article
          v-for="plan in plans"
          :key="plan.name"
          class="pr-card"
          :class="[`is-${plan.tone}`, { 'has-bg': plan.image }]"
          :style="plan.image ? { '--card-bg': `url(${base}${plan.image})` } : null"
        >
        <header class="pr-card-head">
          <h3>{{ plan.name }}</h3>
          <p>{{ plan.tagline }}</p>
        </header>

        <div class="pr-price">
          <span class="pr-old">{{ plan.oldPrice }}</span>
          <span class="pr-new">{{ plan.price }}</span>
          <span class="pr-period">{{ plan.period }}</span>
        </div>

        <ul class="pr-features">
          <li v-for="f in plan.features" :key="f">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            <span>{{ f }}</span>
          </li>
        </ul>

        <a href="#contact" class="pr-btn">{{ plan.cta }}</a>
      </article>
    </div>

    <p class="pr-footnote"><i class="fa-solid fa-check" aria-hidden="true"></i> {{ footnote }}</p>
  </section>
</template>