<script setup>
import { scalablePOSFeaturesContent, scalablePOSFeatureCards } from './ScalablePOSFeatures.js'
import './ScalablePOSFeatures.css'
</script>
<template>
<!-- SECTION 01: four scalable POS feature cards -->
    <section
      class="grf-section grf-visible"
      aria-labelledby="pos-features-title"
    >
      <div class="grf-shell">
        <header class="grf-heading">
          <h2 id="pos-features-title">
            {{ scalablePOSFeaturesContent.headingFirst }}
            <span>{{ scalablePOSFeaturesContent.headingSecond }}</span>
          </h2>
          <p>{{ scalablePOSFeaturesContent.description }}</p>
        </header>

        <div class="grf-cards">
          <article
            v-for="(card, index) in scalablePOSFeatureCards"
            :key="card.id"
            class="grf-card"
            :class="`grf-card--${card.variant}`"
            :style="{ '--grf-order': index }"
          >
            <div class="grf-card-copy">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>

            <div class="grf-window-wrap" aria-hidden="true">
              <div class="grf-browser" :class="`grf-browser--${card.id}`">
                <div class="grf-browser-bar">
                  <span class="grf-dots"><i></i><i></i><i></i></span>
                  <small>cartinno / {{ card.id === 'choose' ? 'modules' : card.id === 'track' ? 'dashboard' : card.id === 'share' ? 'locations' : 'pos setup' }}</small>
                  <span class="grf-browser-lock">◇</span>
                </div>

                <div v-if="card.id === 'create'" class="grf-ui grf-ui--create">
                  <div class="grf-profile">
                    <span class="grf-avatar">⌘</span>
                    <div>
                      <small>YOUR BUSINESS WORKSPACE</small>
                      <strong>Everything starts here.</strong>
                    </div>
                  </div>
                  <div class="grf-field">
                    <small>BUSINESS NAME</small>
                    <strong>Your Store<span class="grf-caret"></span></strong>
                  </div>
                  <div class="grf-field">
                    <small>POS SETUP</small>
                    <strong>Sales &amp; payments <span>⌄</span></strong>
                  </div>
                  <div class="grf-ui-button">Set up your POS <span>↗</span></div>
                  <div class="grf-ui-note"><span>✓</span> Your business, ready to move.</div>
                </div>

                <div v-else-if="card.id === 'choose'" class="grf-ui grf-ui--choose">
                  <div class="grf-mini-header"><small>AVAILABLE MODULES</small><span>+ Add module</span></div>
                  <div class="grf-gifts">
                    <div class="grf-gift">
                      <div class="grf-product-art"><span class="grf-module-icon">▦</span></div>
                      <small>Inventory</small><b>✓</b>
                    </div>
                    <div class="grf-gift">
                      <div class="grf-product-art"><span class="grf-module-icon">◎</span></div>
                      <small>Customers</small><b>✓</b>
                    </div>
                  </div>
                  <div class="grf-added"><span>✓</span> Modules connected to your POS</div>
                  <div class="grf-ui-note">Add capabilities as you grow.</div>
                </div>

                <div v-else-if="card.id === 'share'" class="grf-ui grf-ui--share">
                  <span class="grf-heart">⌂</span>
                  <strong>Every branch, together.</strong>
                  <p>Keep your locations connected in one place.</p>
                  <div class="grf-share-url"><span>Cartinno / All locations</span><b>↗</b></div>
                  <div class="grf-sharing"><span>01</span><span>02</span><span>03</span></div>
                  <div class="grf-ui-note">One view across your business.</div>
                </div>

                <div v-else class="grf-ui grf-ui--track">
                  <div class="grf-mini-header"><small>BUSINESS OVERVIEW</small><span>View reports ↗</span></div>
                  <strong class="grf-track-count">08 <small>active modules</small></strong>
                  <div class="grf-progress"><span></span></div>
                  <div class="grf-tags"><span>Sales</span><span>Stock</span><span>Reports</span></div>
                  <div class="grf-track-row">
                    <span class="grf-present">↗</span>
                    <div><b>Business performance</b><small>All key activity in one view</small></div>
                    <i>✓</i>
                  </div>
                  <div class="grf-ui-note">Stay informed as you scale.</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
</template>
