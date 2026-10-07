<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'
import HeaderIcon from './HeaderIcon.vue'
import './AppHeader.css'
import { products, corporateSolutions, links, logoImage } from './HeaderData.js'
const base = import.meta.env.BASE_URL
const headerRef = ref(null)
const mobileOpen = ref(false)
const openMenu = ref(null)
const activeProduct = ref('food')
const activeCorporate = ref(corporateSolutions[0].id)
const activeCorporateData = computed(() => corporateSolutions.find(item => item.id === activeCorporate.value) || corporateSolutions[0])
let closeTimer
const cancelClose = () => window.clearTimeout(closeTimer)
const hoverMenu = (menu, event) => {
  if (event.pointerType !== 'mouse' || !window.matchMedia('(min-width: 821px)').matches) return
  cancelClose()
  openMenu.value = menu || null
}
const scheduleClose = (event) => {
  if (event.pointerType !== 'mouse' || !window.matchMedia('(min-width: 821px)').matches) return
  cancelClose()
  closeTimer = window.setTimeout(() => { openMenu.value = null }, 180)
}
/* =====================================================
   MENU
===================================================== */
const toggleMenu = (menu, event) => {
  cancelClose()
  const desktopPointer = event?.detail > 0 && window.matchMedia('(min-width: 821px) and (hover: hover)').matches
  openMenu.value = desktopPointer ? menu : (openMenu.value === menu ? null : menu)
}
const closeMenu = () => {
  cancelClose()
  openMenu.value = null
  mobileOpen.value = false
}
const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
  openMenu.value = null
}
const handleOutsideClick = (event) => {
  const header = headerRef.value
  if (header && !header.contains(event.target)) {
    closeMenu()
  }
}
const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('keydown', handleEscape)
})
onBeforeUnmount(() => {
  cancelClose()
  document.removeEventListener('click', handleOutsideClick)
  document.removeEventListener('keydown', handleEscape)
})
/* =====================================================
   PRODUCTS
===================================================== */
const activeProductData = computed(() => {
  return (
    products.find(
      (product) => product.id === activeProduct.value
    ) || products[0]
  )
})
</script>
<template>
  <header ref="headerRef" class="site-header">
    <div class="site-bar">
      <!-- LOGO -->
      <RouterLink
        to="/"
        class="site-logo"
        aria-label="Cartinno home"
        @click="closeMenu"
      >
        <img
          :src="`${base}${logoImage}`"
          alt="Cartinno"
          class="site-logo-img"
        />
      </RouterLink>
      <!-- NAVIGATION -->
      <nav
        id="header-navigation"
        class="site-nav"
        :class="{ 'is-mobile-open': mobileOpen }"
        aria-label="Main navigation"
      >
        <div
          v-for="link in links"
          :key="link.label"
          class="nav-item"
          :class="{ 'nav-products': link.menu === 'products', 'nav-corporate': link.menu === 'corporate' }"
          @pointerenter="hoverMenu(link.menu, $event)"
          @pointerleave="scheduleClose"
        >
          <!-- NORMAL LINKS -->
          <a
            v-if="!link.menu"
            :href="link.label === 'Home' ? base : link.href"
            class="nav-link"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
          <!-- DROPDOWN BUTTON -->
          <button
            v-else
            type="button"
            class="nav-link nav-button"
            :class="{ 'is-open': openMenu === link.menu }"
            :aria-expanded="openMenu === link.menu"
            :aria-controls="`header-${link.menu}`"
            @click.stop="toggleMenu(link.menu, $event)"
          >
            {{ link.label }}
            <span
              class="nav-chevron"
              :class="{ 'is-open': openMenu === link.menu }"
              aria-hidden="true"
            ></span>
          </button>

          <!-- =================================================
               PRODUCTS MEGA MENU
               [ product list ] | [ groups ] | [ image card ]
          ================================================== -->
          <Transition name="dropdown">
          <div
            v-if="link.menu === 'products' && openMenu === 'products'"
            id="header-products"
            class="products-mega"
            @pointerenter="cancelClose"
            @click.stop
          >
            <div class="products-mega-inner">
              <!-- COLUMN 1 : PRODUCT LIST -->
              <div class="product-tabs">
                <button
                  v-for="product in products"
                  :key="product.id"
                  type="button"
                  class="product-tab"
                  :class="{ active: activeProduct === product.id }"
                  :aria-pressed="activeProduct === product.id"
                  @pointerenter="($event.pointerType === 'mouse') && (activeProduct = product.id)"
                  @focus="activeProduct = product.id"
                  @click="activeProduct = product.id"
                >
                  <span>{{ product.title }}</span>
                </button>
              </div>
              <!-- COLUMN 2 : GROUPS -->
              <div
                class="mega-main"
                :key="activeProductData.id"
              >
                <div class="product-groups">
                  <section
                    v-for="group in activeProductData.groups"
                    :key="group.title"
                    class="product-group"
                  >
                    <h3 class="group-title">
                      {{ group.title }}
                    </h3>
                    <div class="group-links">
                      <a
                        v-for="item in group.items"
                        :key="item.label"
                        :href="item.href"
                        class="group-link"
                        @click="closeMenu"
                      >
                        <span class="group-icon">
                          <HeaderIcon :name="item.icon" />
                        </span>
                        <span class="group-link-name">
                          {{ item.label }}
                        </span>
                        <span
                          v-if="item.badge"
                          class="item-badge"
                          :class="`badge-${item.badge.toLowerCase()}`"
                        >
                          {{ item.badge }}
                        </span>
                      </a>
                    </div>
                  </section>
                </div>
              </div>
              <!-- COLUMN 3 : IMAGE CARD -->
              <aside class="mega-side" :key="`feature-${activeProductData.id}`">
                <a
                  :href="activeProductData.href"
                  class="mega-feature"
                  :aria-label="`Explore ${activeProductData.title}`"
                  @click="closeMenu"
                >
                  <div class="mega-feature-image">
                    <img
                      :src="`${base}${activeProductData.image}`"
                      :alt="activeProductData.title"
                    />
                  </div>
                  <div class="mega-feature-copy">
                    <div class="feature-text">
                      <span class="feature-label">
                        {{ activeProductData.label }}
                      </span>
                      <h3>
                        {{ activeProductData.imageTitle }}
                      </h3>
                    </div>
                    <span class="feature-arrow" aria-hidden="true">
                      <HeaderIcon name="fa-solid fa-arrow-right" />
                    </span>
                  </div>
                </a>
              </aside>
            </div>
          </div>
          </Transition>

          <!-- =================================================
               CORPORATE SOLUTIONS
               [ list ] | [ design card ] [ photo card ]
               Hover / focus an item: both cards change.
          ================================================== -->
          <Transition name="dropdown">
            <div
              v-if="link.menu === 'corporate' && openMenu === 'corporate'"
              id="header-corporate"
              class="corporate-mega"
              @pointerenter="cancelClose"
              @click.stop
            >
              <div class="corporate-mega-links" aria-label="Corporate solutions">
                <button
                  v-for="item in corporateSolutions"
                  :key="item.id"
                  type="button"
                  class="corporate-main-link"
                  :class="{ 'is-selected': activeCorporate === item.id }"
                  :aria-pressed="activeCorporate === item.id"
                  aria-controls="corporate-preview"
                  @pointerenter="($event.pointerType === 'mouse') && (activeCorporate = item.id)"
                  @focus="activeCorporate = item.id"
                  @click="activeCorporate = item.id"
                >
                  <span>{{ item.title }}</span>
                </button>
              </div>

              <div id="corporate-preview" class="corporate-feature-grid">

                <!-- CARD 1 : colour design card -->
                <a
                  :href="activeCorporateData.href"
                  class="corporate-feature corporate-design"
                  :style="{ '--card-top': activeCorporateData.colors[0], '--card-bottom': activeCorporateData.colors[1] }"
                  @click="closeMenu"
                >
                  <svg class="corporate-design-lines" viewBox="0 0 320 480" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      v-for="n in 9"
                      :key="n"
                      :d="`M ${80 + n * 34} -40 C ${120 + n * 30} 120, ${-170 + n * 29} 210, ${-90 + n * 29} 290 S ${210 + n * 20} 360, ${130 + n * 26} 520`"
                    />
                  </svg>
                  <div :key="`design-${activeCorporateData.id}`" class="corporate-card-copy">
                    <span class="corporate-card-kicker">{{ activeCorporateData.label }}</span>
                    <h3>{{ activeCorporateData.designTitle }}</h3>
                    <p>{{ activeCorporateData.description }}</p>
                    <span class="corporate-card-cta">
                      Explore solution
                      <HeaderIcon name="fa-solid fa-arrow-right" />
                    </span>
                  </div>
                </a>

                <!-- CARD 2 : photo card -->
                <a
                  :href="activeCorporateData.href"
                  class="corporate-feature corporate-photo"
                  @click="closeMenu"
                >
                  <img
                    :key="activeCorporateData.id"
                    :src="`${base}${activeCorporateData.image}`"
                    :alt="activeCorporateData.alt"
                    :style="{ objectPosition: activeCorporateData.imagePosition }"
                  />
                  <span
                    :key="`photo-${activeCorporateData.id}`"
                    class="corporate-feature-title"
                  >{{ activeCorporateData.photoTitle }}</span>
                </a>

              </div>
            </div>
          </Transition>
        </div>
      </nav>
      <button type="button" class="site-menu-toggle"
        :aria-expanded="mobileOpen" aria-controls="header-navigation"
        :aria-label="mobileOpen ? 'Close navigation' : 'Open navigation'"
        @click="toggleMobile">
        <span aria-hidden="true">{{ mobileOpen ? '✕' : '☰' }}</span>
      </button>
      <!-- ACTION BUTTONS -->
      <div class="site-actions">
        <a href="#demo" class="site-demo" @click="closeMenu">
          Get a Demo
        </a>
        <a href="#contact" class="site-cta" @click="closeMenu">
          Get Started
        </a>
      </div>
    </div>
    <!-- BACKDROP -->
    <Transition name="backdrop">
      <div
        v-if="openMenu || mobileOpen"
        class="mega-backdrop"
        @click="closeMenu"
      ></div>
    </Transition>
  </header>
</template>
