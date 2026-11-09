<script setup>
import Hero from '../../../components/InnerPages/Hero/Hero.vue'
import FAQ from '../../../components/InnerPages/FAQ/FAQ.vue'
import Testimonials from '../../../components/InnerPages/Testimonials/Testimonials.vue'
import YourOwnMarketplace from './YourOwnMarketplace/YourOwnMarketplace.vue'
import NoNeedToFindVendors from './NoNeedToFindVendors/NoNeedToFindVendors.vue'
import ZappymartVendors from './ZappymartVendors/ZappymartVendors.vue'
import SetYourOwnPrice from './SetYourOwnPrice/SetYourOwnPrice.vue'
import MaximumProfitMargin from './MaximumProfitMargin/MaximumProfitMargin.vue'
import ResellerGuides from './ResellerGuides/ResellerGuides.vue'
import { resellerWebsiteHero, resellerWebsiteFAQs } from './ResellerWebsiteData.js'
import './ResellerWebsitePage.css'
</script>

<template>
  <main class="reseller-website-page">
    <Hero v-bind="resellerWebsiteHero" />

    <!-- Five detailed sections alternate between the two supplied visual styles. -->
    <YourOwnMarketplace />
    <NoNeedToFindVendors />
    <ZappymartVendors />
    <SetYourOwnPrice />
    <MaximumProfitMargin />

    <!-- Final visual guide section based on the latest supplied reference -->
    <ResellerGuides />

    <FAQ
      title="Frequently Asked Questions"
      description="Find answers about the Zappymarts Product Reseller Program."
      :items="resellerWebsiteFAQs"
    />
    <Testimonials />
  </main>
</template>
