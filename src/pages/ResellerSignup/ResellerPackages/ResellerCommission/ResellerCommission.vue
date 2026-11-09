<script setup>
import { resellerCommissionData as data } from './ResellerCommissionData.js'
import './ResellerCommission.css'
</script>

<template>
  <section :id="data.id" class="rc-commission-section">
    <div class="rc-commission-inner">
      <header class="rc-commission-heading">
        <span>{{ data.eyebrow }}</span>
        <h2>{{ data.title }}</h2>
        <p>{{ data.lead }}</p>
      </header>

      <div class="rc-commission-grid">
        <article class="rc-commission-panel rc-commission-panel-light">
          <h3>Earn more from every sale.</h3>
          <p>
            Connect businesses with ready-to-use eCommerce and POS solutions and earn commission on every sale.
          </p>

          <div class="rc-earnings-widget">
            <span class="rc-widget-label">YOUR RESELLER OPPORTUNITY</span>
            <div class="rc-widget-row">
              <span class="rc-widget-icon">↗</span>
              <span>
                <strong>Commission on sales</strong>
                <small>Earn as you grow your customer base</small>
              </span>
            </div>
            <div class="rc-widget-highlight">
              <strong>Up to 45%</strong>
              <span>Commission opportunity</span>
            </div>
            <div class="rc-widget-foot">Ask the Zappymarts team to confirm the rate for each package.</div>
          </div>
        </article>

        <article class="rc-commission-image" :style="{ backgroundImage: `linear-gradient(180deg, rgba(24,25,31,.08) 25%, rgba(24,25,31,.76) 100%), url('${data.image}')` }">
          <span class="rc-image-kicker">GROW WITH EVERY SALE</span>
          <div>
            <h3>Build a business that rewards your effort.</h3>
            <p>Bring useful digital solutions to more businesses and create room to grow.</p>
          </div>
        </article>

        <article class="rc-commission-panel rc-commission-panel-light">
          <h3>More value. More ways to grow.</h3>
          <p>
           Offer businesses eCommerce websites and POS systems to sell smarter, manage orders, and serve better.
          </p>

          <div class="rc-growth-widget">
            <span class="rc-widget-label">A RESELLER ADVANTAGE</span>
            <div class="rc-growth-brand">
              <span class="rc-growth-mark">C</span>
              <span>
                <strong>Cartinno solutions</strong>
                <small>Ecommerce websites & POS systems</small>
              </span>
            </div>
            <div class="rc-growth-points">
              <div><span>✓</span> Ready-to-sell solutions</div>
              <div><span>✓</span> No upfront investment stated</div>
              <div><span>✓</span> No monthly or annual rental fees stated</div>
            </div>
            <div class="rc-growth-bottom">Create a stronger offer for every customer.</div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
