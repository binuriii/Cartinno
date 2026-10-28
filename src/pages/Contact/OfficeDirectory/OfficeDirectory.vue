
<script setup>
import {
  contactHeading,
  offices,
  countries
} from './office-directory-data.js'

import './office-directory.css'

const base = import.meta.env.BASE_URL

const imagePath = (path) =>
  `${base}${path.replace(/^\.\//, '')}`

const telHref = (phone) =>
  `tel:${phone.replace(/[^\d+]/g, '')}`
</script>

<template>
  <section class="co-section">
    <div class="co-container">
      <div class="co-heading">
        <h2 class="co-title">
          {{ contactHeading.title }}
        </h2>

        <p class="co-description">
          {{ contactHeading.description }}
        </p>
      </div>

      <div class="co-panel">
        <div class="co-offices">
          <article
            v-for="office in offices"
            :key="office.id"
            class="co-office"
          >
            <img
              :src="imagePath(office.flag)"
              :alt="office.name + ' flag'"
              class="co-office-flag"
              width="78"
              height="52"
              loading="lazy"
            />

            <h3 class="co-office-name">
              {{ office.name }}
            </h3>

            <p class="co-office-address">
              <span
                v-for="line in office.address"
                :key="line"
              >
                {{ line }}
              </span>
            </p>

            <p
              v-for="(line, index) in office.lines"
              :key="index"
              class="co-office-line"
            >
              <template v-if="line.label">
                {{ line.label }}:
              </template>

              <a
                :href="telHref(line.tel)"
                :class="{ 'is-strong': line.label }"
              >
                {{ line.value }}
              </a>
            </p>

            <p class="co-office-email">
              Email:
              <a :href="`mailto:${office.email}`">
                {{ office.email }}
              </a>
            </p>
          </article>
        </div>
      </div>

      <ul class="co-countries">
        <li
          v-for="country in countries"
          :key="country.id"
          class="co-country"
        >
          <span class="co-country-flag">
            <img
              :src="imagePath(country.flag)"
              :alt="country.name + ' flag'"
              width="28"
              height="20"
              loading="lazy"
            />
          </span>

          <span class="co-country-copy">
            <span class="co-country-name">
              {{ country.name }}
            </span>

            <a
              :href="telHref('+' + country.phone)"
              class="co-country-phone"
            >
              {{ country.phone }}
            </a>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
