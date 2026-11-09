<script setup>
import Hero from '../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../components/InnerPages/Testimonials/Testimonials.vue'
import ResellPackages from './ResellPackages/ResellPackages.vue'
import ResellerCommission from './ResellerCommission/ResellerCommission.vue'
import { resellerPackagesHero, resellerPackagesFAQs, resellerPackageGuides } from './ResellerPackagesData.js'
import './ResellerPackagesPage.css'
</script>

<template>
  <main class="reseller-packages-page">
    <Hero v-bind="resellerPackagesHero" />

    <ResellPackages />
    <ResellerCommission />

    <!-- Grow Your Reseller Business: editorial guide cards -->
    <section class="rpg-guides" aria-labelledby="rpg-guides-title">
      <div class="rpg-guides-inner">
        <header class="rpg-guides-heading">
            <h2 id="rpg-guides-title">Guides Growing<br> Your Reseller Business</h2>
        </header>

        <div class="rpg-guides-grid">
          <a
            class="rpg-guide-card rpg-guide-featured"
            :href="resellerPackageGuides[0].link"
            :style="{ backgroundImage: `linear-gradient(0deg, rgba(18,18,22,.78), transparent 66%), url('${resellerPackageGuides[0].image}')` }"
          >
            <div class="rpg-guide-copy">
              <h3>{{ resellerPackageGuides[0].title }}</h3>
              <p>{{ resellerPackageGuides[0].description }}</p>
            </div>
          </a>

          <div class="rpg-guides-side">
            <a
              v-for="(guide, index) in resellerPackageGuides.slice(1, 3)"
              :key="guide.title"
              class="rpg-guide-card rpg-guide-small"
              :href="guide.link"
              :style="{ backgroundImage: `linear-gradient(0deg, rgba(18,18,22,.78), transparent 72%), url('${guide.image}')` }"
            >
              <div class="rpg-guide-copy">
          
                <h3>{{ guide.title }}</h3>
                <p>{{ guide.description }}</p>
              </div>
            </a>

            <a class="rpg-guides-cta" href="/contact">
              <span>
                <strong>Grow with Cartinno</strong>
                <small>Talk to our team about becoming a product reseller.</small>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <FAQ
      title="Frequently Asked Questions"
      description="Learn more about the Zappymarts Product Reseller Program."
      :items="resellerPackagesFAQs"
    />
    <Testimonials />
  </main>
</template>
