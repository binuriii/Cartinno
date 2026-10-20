<script setup>
import './ReasonsSection.css'
import { reasonsContent } from './ReasonsSectionData.js'
</script>

<template>
  <section class="rs-section">
    <div class="rs-container">
      <div class="rs-grid">
        
        <!-- Left Column: Title top, Profile bottom -->
        <div class="rs-left">
          <h2 class="rs-title">{{ reasonsContent.title }}</h2>
          
          <div class="rs-profile-card">
            <div class="rs-profile-image-wrapper">
              <img :src="reasonsContent.profile.image" alt="Profile" class="rs-profile-img" loading="lazy" />
              <div class="rs-signature">{{ reasonsContent.profile.signature }}</div>
            </div>
            <div class="rs-profile-info">
              <p class="rs-name">{{ reasonsContent.profile.name }}</p>
              <p class="rs-role">{{ reasonsContent.profile.role }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column: List -->
        <div class="rs-right">
          <div v-for="reason in reasonsContent.reasons" :key="reason.id" class="rs-item">
            <div class="rs-item-title-col">
              <h4>{{ reason.title }}</h4>
            </div>
            <div class="rs-item-desc-col">
              <!-- Paragraphs dekak thiyena nisa loop ekak damma -->
              <p v-for="(paragraph, index) in reason.description" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>