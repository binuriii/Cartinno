<script setup>
import { ref, computed } from 'vue'
import './HowItWorks.css'

import {
  label,
  headline,
  intro,
  steps
} from './HowItWorksData.js'

const active = ref(0)

const activeStep = computed(() => {
  return steps[active.value]
})
</script>

<template>
  <section
    class="hiw"
    id="how-it-works"
  >
    <div class="hiw-grid">

      <!-- LEFT -->
      <div class="hiw-left">

        <ul class="hiw-tags">
          <li
            v-for="(s, i) in steps"
            :key="s.tag"
          >
            <button
              type="button"
              class="hiw-tag-btn"
              :class="{ on: i === active }"
              :aria-pressed="i === active"
              @click="active = i"
            >
              {{ s.tag }}
            </button>
          </li>
        </ul>

        <p class="hiw-label">
          {{ label }}
        </p>

        <h2 class="hiw-title">
          {{ headline }}
        </h2>

        <p class="hiw-intro">
          {{ intro }}
        </p>

      </div>

      <!-- MIDDLE -->
      <div class="hiw-phone">

        <div class="hiw-phone-frame">

          <Transition
            name="hiw-swap"
            mode="out-in"
          >
            <div
              class="hiw-card"
              :key="active"
            >

              <div class="hiw-card-head">
                <h3>
                  {{ activeStep.title }}
                </h3>
              </div>

              <p>
                {{ activeStep.text }}
              </p>

              <div class="hiw-card-media">

                <img
                  v-if="activeStep.image"
                  :src="activeStep.image"
                  :alt="activeStep.title"
                />

                <i
                  v-else
                  class="fa-solid fa-shop"
                  aria-hidden="true"
                ></i>

              </div>

            </div>
          </Transition>

        </div>

      </div>

      <!-- RIGHT -->
      <div class="hiw-right">

        <Transition
          name="hiw-swap"
          mode="out-in"
        >
          <p :key="active">
            <strong>
              {{ activeStep.title }}
            </strong>

            — {{ activeStep.text }}
          </p>
        </Transition>

      </div>

    </div>
  </section>
</template>