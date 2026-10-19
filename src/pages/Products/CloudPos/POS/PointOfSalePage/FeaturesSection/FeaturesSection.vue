<script setup>
import "./FeaturesSection.css";
import { featuresContent, featuresList } from "./FeaturesSectionData.js";
</script>

<template>
  <section class="fs-section">
    <div class="fs-container">
      <h2 class="fs-main-title">{{ featuresContent.title }}</h2>

      <div class="fs-list-container">
        <!-- Dashed vertical line -->
        <div class="fs-dashed-line"></div>

        <div v-for="item in featuresList" :key="item.id" class="fs-row">
          <div class="fs-text-column">
            <!-- Number badge sits exactly on the line -->
            <div class="fs-number-wrapper">
              <span class="fs-number">{{ item.id }}</span>
            </div>
            <div class="fs-content-wrap">
              <h3 class="fs-title">{{ item.title }}</h3>
              <p class="fs-description">{{ item.description }}</p>
            </div>
          </div>

          <div class="fs-image-column">
            <div class="fs-image-wrapper">
              <img :src="item.image" :alt="item.title" loading="lazy" />
              <div class="fs-img-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
