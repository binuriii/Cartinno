<script setup>
import {
  peopleContent,
  peopleCards
} from './DeliveryOperationsData.js'
</script>

<template>
  <section
    class="dp-section"
    aria-labelledby="dp-heading"
  >
    <div class="dp-container">

      <div class="dp-layout">

        <!-- LEFT COLUMN -->
        <div class="dp-left">

          <!-- HEADING -->
          <header class="dp-head">

            <p
              v-if="peopleContent.eyebrow"
              class="dp-eyebrow"
            >
              {{ peopleContent.eyebrow }}
            </p>

            <h2 id="dp-heading">
              {{ peopleContent.title }}
            </h2>

            <p class="dp-description">
              {{ peopleContent.description }}
            </p>

          </header>

          <!-- LEFT IMAGE -->
          <div
            v-if="peopleCards[0]"
            class="dp-image dp-image-left"
          >
            <img
              :src="peopleCards[0].image"
              :alt="peopleCards[0].alt"
              loading="lazy"
              decoding="async"
            />
          </div>

        </div>

        <!-- RIGHT COLUMN -->
        <div class="dp-right">

          <!-- LARGE TOP IMAGE -->
          <div
            v-if="peopleCards[1]"
            class="dp-image dp-image-main"
          >
            <img
              :src="peopleCards[1].image"
              :alt="peopleCards[1].alt"
              loading="lazy"
              decoding="async"
            />
          </div>

          <!-- SMALL BOTTOM IMAGE -->
          <div class="dp-bottom-row">

            <div
              v-if="peopleCards[2]"
              class="dp-image dp-image-bottom"
            >
              <img
                :src="peopleCards[2].image"
                :alt="peopleCards[2].alt"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style scoped src="./DeliveryOperations.css"></style>
