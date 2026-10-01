<script setup>
import './HeroSection.css'
import { rowOne, rowTwo } from './HeroProjects.js'

const rows = [
  { items: rowOne, reverse: false },
  { items: rowTwo, reverse: true }
]

const cardBackground = (item) =>
  item.image
    ? `center/cover no-repeat url("${item.image}"), linear-gradient(135deg, ${item.from}, ${item.to})`
    : `linear-gradient(135deg, ${item.from}, ${item.to})`
</script>

<template>
  <section class="hero">
    <div class="hero-content">
          <div class="hero-trust">
      <div class="hero-avatars">
        <span class="hero-avatar hero-avatar-logo hero-trust-item trust-1">
          <img src="/cart.png" alt="Cartinno" />
        </span>

        <span class="hero-avatar hero-trust-item trust-2">
          <img src="/bag.jpg" alt="" />
        </span>

        <span class="hero-avatar hero-trust-item trust-3">
          <img src="/location.jpg" alt="" />
        </span>
      </div>

      <p class="hero-trust-text hero-trust-item trust-4">
        Trusted by <strong>1,000+</strong> brands
      </p>
    </div>

      <h1 class="hero-title">
        Enhance Your E-Commerce <br />
        <span class="hero-accent">with Cartinno</span>
      </h1>

      <p class="hero-text">
        From e-commerce websites to cloud POS and food ordering — Cartinno gives growing brands
        one platform to build, sell, and deliver, with support that never clocks out.
      </p>

      <div class="hero-actions">
        <a href="#start" class="hero-btn hero-btn-primary">Start for Free</a>
        <a href="#demo" class="hero-btn hero-btn-light">Book a Demo</a>
      </div>
    </div>

    <div class="hero-rows">
      <div
        v-for="(row, r) in rows"
        :key="r"
        class="hero-track"
        :class="{ rev: row.reverse }"
      >
        <!-- rendered twice so the loop is seamless -->
        <div
          v-for="(item, i) in [...row.items, ...row.items]"
          :key="i"
          class="hero-card"
          :class="item.size"
          :style="{ background: cardBackground(item) }"
          role="img"
          :aria-label="item.name"
        ></div>
      </div>
    </div>
  </section>
</template>