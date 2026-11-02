<script setup>
import { ref } from 'vue'
import './ContactInquiry.css'

import {
  contactInquiryContent,
  referralOptions
} from './ContactInquiryData.js'

const form = ref({
  email: '',
  phone: '',
  company: '',
  description: '',
  referral: '',
  file: null,
  captcha: false
})

const statusMessage = ref('')

function handleFileChange(event) {
  form.value.file = event.target.files?.[0] || null
}

function handleSubmit() {
  statusMessage.value =
    'Please connect your form to a submission service before accepting enquiries.'
}
</script>

<template>
  <section class="ci-section" id="contact-inquiry">
    <div class="ci-container">
      <!-- CENTERED HEADING -->
      <header class="ci-header">
        <h2 class="ci-title">
          {{ contactInquiryContent.title }}
        </h2>

        <p class="ci-description">
          {{ contactInquiryContent.description }}
        </p>
      </header>

      <!-- FORM AND MAP -->
      <div class="ci-panel">
        <div class="ci-form-column">
          <form class="ci-form" @submit.prevent="handleSubmit">
            <div class="ci-fields-grid">
              <!-- EMAIL -->
              <div class="ci-field">
                <label for="ci-email">
                  <span class="ci-required">*</span>
                  Email Address
                </label>

                <input
                  id="ci-email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  required
                />
              </div>

              <!-- PHONE -->
              <div class="ci-field">
                <label for="ci-phone">
                  <span class="ci-required">*</span>
                  Phone
                </label>

                <input
                  id="ci-phone"
                  v-model="form.phone"
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  autocomplete="tel"
                  required
                />
              </div>

              <!-- COMPANY -->
              <div class="ci-field ci-field-full">
                <label for="ci-company">Company</label>

                <input
                  id="ci-company"
                  v-model="form.company"
                  type="text"
                  name="company"
                  placeholder="Your company name"
                  autocomplete="organization"
                />
              </div>

              <!-- DESCRIPTION -->
              <div class="ci-field ci-field-full">
                <label for="ci-description">
                  <span class="ci-required">*</span>
                  Description
                </label>

                <textarea
                  id="ci-description"
                  v-model="form.description"
                  name="description"
                  placeholder="Tell us how we can help..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <!-- REFERRAL SOURCE -->
              <div class="ci-field ci-field-full">
                <label for="ci-referral">
                  <span class="ci-required">*</span>
                  How did you hear about us?
                </label>

                <div class="ci-select-wrap">
                  <select
                    id="ci-referral"
                    v-model="form.referral"
                    name="referral"
                    required
                  >
                    <option value="" disabled>
                      How did you hear about us?
                    </option>

                    <option
                      v-for="option in referralOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- FILE UPLOAD -->
              <div class="ci-field ci-field-full">
                <label for="ci-file">File Upload</label>

                <input
                  id="ci-file"
                  class="ci-file-input"
                  type="file"
                  name="file"
                  @change="handleFileChange"
                />
              </div>
            </div>

            <!-- CAPTCHA PLACEHOLDER -->
            <label class="ci-captcha">
              <input
                v-model="form.captcha"
                type="checkbox"
                name="captcha"
              />

              <span>I'm not a robot</span>

              <span class="ci-captcha-logo" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 4a16 16 0 0 1 14 8h-8a8 8 0 0 0-13-2l5 5H5V4l5 5A16 16 0 0 1 20 4Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M34 12a16 16 0 0 1-7 21l-4-7a8 8 0 0 0 3-12l-2 7-7-12h14l-2 3Z"
                    fill="#34A853"
                  />
                  <path
                    d="M27 33a16 16 0 0 1-23-13h8a8 8 0 0 0 13 5l-7-1 12-7 1 14-4-3Z"
                    fill="#FBBC05"
                  />
                </svg>

                <small>reCAPTCHA</small>
              </span>
            </label>

            <button class="ci-submit" type="submit">
              Send Enquiry
            </button>

            <p
              v-if="statusMessage"
              class="ci-status"
              role="status"
            >
              {{ statusMessage }}
            </p>
          </form>
        </div>

        <!-- MAP CARD -->
        <aside class="ci-map-card">
          <iframe
            class="ci-map"
            :src="contactInquiryContent.mapUrl"
            :title="contactInquiryContent.mapTitle"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>

          <div class="ci-map-overlay">
            <h3>{{ contactInquiryContent.mapTitle }}</h3>

            <p>{{ contactInquiryContent.mapAddress }}</p>

            <a
              class="ci-directions"
              :href="contactInquiryContent.directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>