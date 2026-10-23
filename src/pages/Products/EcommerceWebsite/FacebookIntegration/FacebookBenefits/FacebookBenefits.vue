
<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import {
  facebookBenefitsContent as content,
  facebookBenefits as benefits,
  facebookDemoProducts as products,
  facebookSocialPreview as social,
  facebookConnectionSteps as steps
} from './FacebookBenefitsData.js'

import './FacebookBenefits.css'

const sectionRef = ref(null)
const visible = ref(false)
const failedImages = ref(new Set())

let observer = null

const logo = `${
  import.meta.env.BASE_URL
}cartinno-logo.webp`

const logoFailed = ref(false)

function imageAvailable(id) {
  return !failedImages.value.has(id)
}

function imageFailed(id) {
  failedImages.value = new Set([
    ...failedImages.value,
    id
  ])
}

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return

      visible.value = true
      observer?.disconnect()
      observer = null
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -5% 0px'
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    id="facebook-benefits"
    class="fbb-section"
    :class="{ 'fbb-visible': visible }"
  >
    <div class="fbb-container">

      <!-- SECTION HEADER -->
      <header class="fbb-header">

        <h2 class="fbb-heading">
          {{ content.title1 }}
          <span>{{ content.title2 }}</span>
        </h2>

      </header>

      <!-- ===================================
           CARD 01: REACH MORE CUSTOMERS
      ==================================== -->
      <article class="fbb-main-card">

        <!-- FACEBOOK SOCIAL POST -->
        <div class="fbb-main-visual">

          <div class="fbb-social-window">

            <div class="fbb-social-topbar">

              <span class="fbb-facebook-logo">
                <i class="fa-brands fa-facebook-f"></i>
              </span>

              <div class="fbb-social-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>Search Facebook</span>
              </div>

              <span class="fbb-social-menu">
                <i class="fa-solid fa-bars"></i>
              </span>

            </div>

            <div class="fbb-social-body">

              <div class="fbb-post-header">

                <div class="fbb-post-avatar">
                  C
                </div>

                <div class="fbb-post-author">
                  <strong>{{ social.pageName }}</strong>
                  <span>
                    Sponsored ·
                    <i class="fa-solid fa-earth-americas"></i>
                  </span>
                </div>

                <i class="fa-solid fa-ellipsis fbb-post-more"></i>

              </div>

              <p class="fbb-post-caption">
                {{ social.caption }}
              </p>

              <div class="fbb-post-image">

                <img
                  v-if="imageAvailable(products[0].id)"
                  :src="products[0].image"
                  :alt="products[0].name"
                  loading="lazy"
                  @error="imageFailed(products[0].id)"
                />

                <div
                  v-else
                  class="fbb-image-placeholder"
                >
                  <i class="fa-solid fa-bag-shopping"></i>
                </div>

                <div class="fbb-post-image-label">
                  <span>NEW COLLECTION</span>
                  <strong>Find your next favorite.</strong>
                </div>

              </div>

              <div class="fbb-post-link-preview">

                <div>
                  <small>CARTINNO STORE</small>
                  <strong>Explore the collection</strong>
                </div>

                <span>Shop Now</span>

              </div>

              <div class="fbb-post-engagement">

                <span>
                  <i class="fa-solid fa-thumbs-up"></i>
                  <i class="fa-solid fa-heart"></i>
                  {{ social.reactions }}
                </span>

                <span>
                  {{ social.comments }}
                </span>

              </div>

              <div class="fbb-post-actions">

                <span>
                  <i class="fa-regular fa-thumbs-up"></i>
                  Like
                </span>

                <span>
                  <i class="fa-regular fa-comment"></i>
                  Comment
                </span>

                <span>
                  <i class="fa-solid fa-share"></i>
                  Share
                </span>

              </div>

            </div>

          </div>

          <!-- ANIMATED FLOATING SIGNALS -->

          <div class="fbb-floating-reaction fbb-reaction-one">
            <i class="fa-solid fa-thumbs-up"></i>
          </div>

          <div class="fbb-floating-reaction fbb-reaction-two">
            <i class="fa-solid fa-heart"></i>
          </div>

          <div class="fbb-floating-notice">
            <span class="fbb-notice-icon">
              <i class="fa-solid fa-eye"></i>
            </span>

            <div>
              <strong>New product views</strong>
              <small>People are discovering your products</small>
            </div>
          </div>

        </div>

        <!-- TEXT -->
        <div class="fbb-main-content">

          <span class="fbb-card-label">
            {{ benefits[0].number }}
            / {{ benefits[0].label }}
          </span>

          <h3>{{ benefits[0].title }}</h3>

          <p>{{ benefits[0].description }}</p>

        </div>

      </article>

      <!-- ===================================
           TWO BOTTOM CARDS
      ==================================== -->
      <div class="fbb-bottom-grid">

        <!-- CARD 02: SOCIAL TO STORE -->
        <article class="fbb-commerce-card">

          <div class="fbb-card-copy">

            <span class="fbb-card-label">
              {{ benefits[1].number }}
              / {{ benefits[1].label }}
            </span>

            <h3>{{ benefits[1].title }}</h3>

            <p>{{ benefits[1].description }}</p>

          </div>

          <div class="fbb-commerce-scene">

            <!-- FACEBOOK PRODUCT DISCOVERY -->
            <div class="fbb-commerce-social">

              <div class="fbb-mini-topbar">

                <span class="fbb-mini-facebook">
                  <i class="fa-brands fa-facebook-f"></i>
                </span>

                <strong>Facebook</strong>

                <i class="fa-solid fa-ellipsis"></i>

              </div>

              <div class="fbb-mini-image">

                <img
                  v-if="imageAvailable(products[1].id)"
                  :src="products[1].image"
                  :alt="products[1].name"
                  loading="lazy"
                  @error="imageFailed(products[1].id)"
                />

                <div
                  v-else
                  class="fbb-image-placeholder"
                >
                  <i class="fa-solid fa-box"></i>
                </div>

              </div>

              <div class="fbb-mini-product-copy">
                <small>Featured product</small>
                <strong>{{ products[1].name }}</strong>
                <span>{{ products[1].price }}</span>
              </div>

              <div class="fbb-mini-shop-button">
                View Product
              </div>

            </div>

            <!-- ANIMATED CONNECTION -->
            <div class="fbb-commerce-connection">
              <span>
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </div>

            <!-- CARTINNO STORE -->
            <div class="fbb-commerce-store">

              <div class="fbb-store-topbar">
                <span class="fbb-store-dots">
                  <i></i><i></i><i></i>
                </span>

                <span>Online Store</span>
              </div>

              <div class="fbb-store-brand">

                <img
                  v-if="!logoFailed"
                  :src="logo"
                  alt="Cartinno"
                  @error="logoFailed = true"
                />

                <strong v-else>Cartinno</strong>

              </div>

              <div class="fbb-store-success">
                <i class="fa-solid fa-circle-check"></i>
                <span>Ready to shop</span>
              </div>

              <strong class="fbb-store-heading">
                Your next favorite is here.
              </strong>

              <div class="fbb-store-cta">
                Shop Collection
              </div>

            </div>

          </div>

        </article>

        <!-- CARD 03: CONNECTED PRESENCE -->
        <article class="fbb-connect-card">

          <div class="fbb-card-copy">

            <span class="fbb-card-label">
              {{ benefits[2].number }}
              / {{ benefits[2].label }}
            </span>

            <h3>{{ benefits[2].title }}</h3>

            <p>{{ benefits[2].description }}</p>

          </div>

          <div class="fbb-connect-scene">

            <div class="fbb-network-lines" aria-hidden="true">
              <span class="fbb-line-one"></span>
              <span class="fbb-line-two"></span>
            </div>

            <div class="fbb-network">

              <div
                v-for="(step, index) in steps"
                :key="step.id"
                class="fbb-network-node"
                :class="`fbb-node-${index + 1}`"
                :style="{ '--node-index': index }"
              >

                <div class="fbb-network-icon">
                  <i :class="step.icon"></i>
                </div>

                <strong>{{ step.name }}</strong>
                <small>{{ step.description }}</small>

              </div>

            </div>

            <div class="fbb-network-status">
              <span class="fbb-status-dot"></span>
              Your business, connected
            </div>

          </div>

        </article>

      </div>

    </div>
  </section>
</template>
