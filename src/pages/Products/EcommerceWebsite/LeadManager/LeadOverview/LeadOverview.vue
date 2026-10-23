<script setup>
import LeadIcon from '../shared/LeadIcon.vue'
import { leadOverviewContent, leadOverviewCards } from './LeadOverviewData.js'
import './LeadOverview.css'
</script>

<template>
  <section id="lead-overview" class="lmo-section" aria-labelledby="lmo-heading">
    <div class="lm-container lmo-container">
      <header class="lmo-heading" data-lead-reveal>
        <h2 id="lmo-heading">{{ leadOverviewContent.title1 }}<br />{{ leadOverviewContent.title2 }}</h2>
        <p>{{ leadOverviewContent.description }}</p>
      </header>

      <div class="lmo-grid">
        <!-- Card 1: lead profile UI -->
        <article class="lmo-card lmo-card-soft" data-lead-reveal>
          <div class="lmo-copy">
            <h3>{{ leadOverviewCards[0].title }}</h3>
            <p>{{ leadOverviewCards[0].description }}</p>
          </div>
          <div class="lmo-profile-preview" aria-label="Illustrative lead profile – sample data">
            <div class="lmo-preview-title"><span>New lead</span><span class="lmo-live"><i></i> New enquiry</span></div>
            <div class="lmo-profile-row">
              <span class="lmo-avatar">JA</span>
              <span class="lmo-name"><strong>Jordan Adams</strong><small>Interested in your services</small></span>
              <LeadIcon name="arrow-right" class="lmo-muted-icon" />
            </div>
            <div class="lmo-profile-divider"></div>
            <div class="lmo-detail"><LeadIcon name="mail" /><span>jordan@example.com</span></div>
            <div class="lmo-detail"><LeadIcon name="phone" /><span>Contact number saved</span></div>
            <div class="lmo-lead-tags"><span>Website enquiry</span><span>New prospect</span></div>
            <div class="lmo-view-action">Lead details <LeadIcon name="arrow-right" /></div>
          </div>
        </article>

        <!-- Card 2: photographic feature -->
        <article class="lmo-card lmo-photo-card" data-lead-reveal>
          <img :src="leadOverviewCards[1].image" :alt="leadOverviewCards[1].alt" loading="lazy" />
          <div class="lmo-photo-scrim" aria-hidden="true"></div>
          <div class="lmo-photo-text">
            <h3>{{ leadOverviewCards[1].title }}</h3>
            <p>{{ leadOverviewCards[1].description }}</p>
          </div>
          <div class="lmo-photo-bottom">
            <strong>{{ leadOverviewCards[1].overlayText }}</strong>
            <span class="lmo-heart"><LeadIcon name="heart" /></span>
          </div>
        </article>

        <!-- Card 3: timeline UI -->
        <article class="lmo-card lmo-card-soft" data-lead-reveal>
          <div class="lmo-copy">
            <h3>{{ leadOverviewCards[2].title }}</h3>
            <p>{{ leadOverviewCards[2].description }}</p>
          </div>
          <div class="lmo-progress-preview" aria-label="Illustrative lead activity timeline – sample data">
            <div class="lmo-preview-title"><span>Lead activity</span><LeadIcon name="trending" /></div>
            <div class="lmo-timeline">
              <div class="lmo-event complete"><span class="lmo-dot"><LeadIcon name="check" /></span><span><strong>Enquiry received</strong><small>Details saved</small></span></div>
              <div class="lmo-event complete"><span class="lmo-dot"><LeadIcon name="check" /></span><span><strong>Initial contact</strong><small>Conversation started</small></span></div>
              <div class="lmo-event upcoming"><span class="lmo-dot"><LeadIcon name="clock" /></span><span><strong>Next follow-up</strong><small>Ready for your team</small></span></div>
            </div>
            <div class="lmo-progress-footer"><LeadIcon name="bell" /> Stay ready for the next step <LeadIcon name="arrow-right" /></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
