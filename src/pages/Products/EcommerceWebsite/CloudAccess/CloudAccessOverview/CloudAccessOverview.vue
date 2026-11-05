<script setup>
import LeadIcon from '../shared/LeadIcon.vue'
import { cloudAccessOverviewContent, cloudAccessOverviewCards } from './CloudAccessOverviewData.js'
import './CloudAccessOverview.css'
</script>

<template>
  <section id="cloud-access-overview" class="cao-section" aria-labelledby="cao-heading">
    <div class="lm-container cao-container">
      <header class="cao-heading" data-cloud-reveal>
        <h2 id="cao-heading">{{ cloudAccessOverviewContent.title1 }}<br />{{ cloudAccessOverviewContent.title2 }}</h2>
        <p>{{ cloudAccessOverviewContent.description }}</p>
      </header>

      <div class="cao-grid">
        <article class="cao-card cao-card-soft" data-cloud-reveal>
          <div class="cao-copy">
            <h3>{{ cloudAccessOverviewCards[0].title }}</h3>
            <p>{{ cloudAccessOverviewCards[0].description }}</p>
          </div>
          <div class="cao-profile-preview" aria-label="Illustrative cloud business overview">
            <div class="cao-preview-title"><span>Business overview</span><span class="cao-live"><i></i> Connected</span></div>
            <div class="cao-profile-row">
              <span class="cao-avatar">CA</span>
              <span class="cao-name"><strong>Cloud workspace</strong><small>Your business at a glance</small></span>
              <LeadIcon name="arrow-right" class="cao-muted-icon" />
            </div>
            <div class="cao-profile-divider"></div>
            <div class="cao-detail"><LeadIcon name="layers" /><span>Sales and activity overview</span></div>
            <div class="cao-detail"><LeadIcon name="check-circle" /><span>Business information available</span></div>
            <div class="cao-lead-tags"><span>Remote access</span><span>Connected team</span></div>
            <div class="cao-view-action">Open business overview <LeadIcon name="arrow-right" /></div>
          </div>
        </article>

        <article class="cao-card cao-photo-card" data-cloud-reveal>
          <img :src="cloudAccessOverviewCards[1].image" :alt="cloudAccessOverviewCards[1].alt" loading="lazy" decoding="async" />
          <div class="cao-photo-scrim" aria-hidden="true"></div>
          <div class="cao-photo-text">
            <h3>{{ cloudAccessOverviewCards[1].title }}</h3>
            <p>{{ cloudAccessOverviewCards[1].description }}</p>
          </div>
          <div class="cao-photo-bottom">
            <strong>{{ cloudAccessOverviewCards[1].overlayText }}</strong>
            <span class="cao-heart"><LeadIcon name="heart" /></span>
          </div>
        </article>

        <article class="cao-card cao-card-soft" data-cloud-reveal>
          <div class="cao-copy">
            <h3>{{ cloudAccessOverviewCards[2].title }}</h3>
            <p>{{ cloudAccessOverviewCards[2].description }}</p>
          </div>
          <div class="cao-progress-preview" aria-label="Illustrative cloud access activity timeline">
            <div class="cao-preview-title"><span>Access activity</span><LeadIcon name="trending" /></div>
            <div class="cao-timeline">
              <div class="cao-event complete"><span class="cao-dot"><LeadIcon name="check" /></span><span><strong>Workspace connected</strong><small>Access available</small></span></div>
              <div class="cao-event complete"><span class="cao-dot"><LeadIcon name="check" /></span><span><strong>Business information</strong><small>Ready to view</small></span></div>
              <div class="cao-event upcoming"><span class="cao-dot"><LeadIcon name="clock" /></span><span><strong>Next business update</strong><small>Stay connected</small></span></div>
            </div>
            <div class="cao-progress-footer"><LeadIcon name="bell" /> Keep your business within reach <LeadIcon name="arrow-right" /></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
