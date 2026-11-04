<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "./FeaturesSection.css";
import { featuresContent, featuresList } from "./FeaturesSectionData.js";

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  if (!sectionRef.value) return;

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer?.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(sectionRef.value);
  } else {
    isVisible.value = true;
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="fs-section"
    :class="{ 'fs-visible': isVisible }"
  >
    <div class="fs-container">

      <!-- HEADER -->
      <div class="fs-header">
        <h2 class="fs-main-title">
          {{ featuresContent.title1 }} <br>
          {{ featuresContent.title2 }}
          
        </h2>
      </div>

      <!-- TIMELINE -->
      <div class="fs-list-container">

        <!-- DASHED VERTICAL LINE -->
        <div class="fs-dashed-line"></div>

        <div
          v-for="(item, index) in featuresList"
          :key="item.id"
          class="fs-row"
          :style="{ '--fs-delay': `${index * 160}ms` }"
        >

          <!-- TEXT COLUMN -->
          <div class="fs-text-column">

            <div class="fs-number-wrapper">
              <span class="fs-number">
                {{ item.id }}
              </span>
            </div>

            <div class="fs-content-wrap">
              <h3 class="fs-title">
                {{ item.title }}
              </h3>

              <p class="fs-description">
                {{ item.description }}
              </p>
            </div>

          </div>

          <!-- IMAGE COLUMN -->
          <div class="fs-image-column">
            <div class="fs-image-wrapper">

              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
              />

              <div class="fs-img-overlay"></div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
