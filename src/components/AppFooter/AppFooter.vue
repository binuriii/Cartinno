<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  products,
  corporateSolutions,
  links,
  logoImage
} from '../AppHeader/HeaderData.js'
import './AppFooter.css'

const base = import.meta.env.BASE_URL
const year = new Date().getFullYear()

const foodGroups = computed(
  () => products.find(product => product.id === 'food')?.groups ?? []
)

const companyLinks = computed(() =>
  links.filter(link => !link.menu)
)

const contactLinks = [
  { label: 'Get a Demo', href: '#demo' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'View Pricing', href: '#pricing' }
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Cookies', href: '#cookies' }
]

const resolveHref = (href) => {
  if (href === '/') return base
  if (href.startsWith('#')) return `${base}${href}`
  return href
}
</script>

<template>
  <footer class="site-footer">
    <section
      class="footer-banner"
      aria-labelledby="footer-banner-title"
    >
      <svg
        class="footer-banner-lines"
        viewBox="0 0 1600 520"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          v-for="n in 12"
          :key="`left-${n}`"
          :d="`
            M ${-160 + n * 65} -80
            C ${-80 + n * 65} 120,
              ${180 + n * 42} 240,
              ${-120 + n * 62} 620
          `"
        />

        <path
          v-for="n in 12"
          :key="`right-${n}`"
          :d="`
            M ${1760 - n * 65} -80
            C ${1680 - n * 65} 120,
              ${1420 - n * 42} 240,
              ${1720 - n * 62} 620
          `"
        />
      </svg>

      <div class="footer-banner-content">
        <h2 id="footer-banner-title">
          A smarter way to grow your business online.
        </h2>

        <div class="footer-banner-actions">
          <a
            :href="resolveHref('#demo')"
            class="footer-button footer-button-white"
          >
            Get a Demo
          </a>

          <a
            :href="resolveHref('#contact')"
            class="footer-button footer-button-dark"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>

    <div class="footer-panel">
      <div class="footer-inner">
        <div class="footer-heading-row">
          <RouterLink
            to="/"
            class="footer-logo"
            aria-label="Cartinno home"
          >
            <img
              :src="`${base}${logoImage}`"
              alt="Cartinno"
              loading="lazy"
            />
          </RouterLink>
        </div>

        <nav
          class="footer-feature-grid"
          aria-label="Restaurant features"
        >
          <section
            v-for="group in foodGroups"
            :key="group.title"
            class="footer-column"
          >
            <h3>{{ group.title }}</h3>

            <ul>
              <li
                v-for="item in group.items"
                :key="item.label"
              >
                <a
                  :href="resolveHref(item.href)"
                  class="footer-text-link"
                >
                  <span>{{ item.label }}</span>

                  <span
                    v-if="item.badge"
                    class="footer-badge"
                  >
                    {{ item.badge }}
                  </span>
                </a>
              </li>
            </ul>
          </section>
        </nav>

        <nav
          class="footer-secondary-grid"
          aria-label="Company and product links"
        >
          <section class="footer-column">
            <h3>Products</h3>

            <ul>
              <li
                v-for="product in products"
                :key="product.id"
              >
                <a
                  :href="resolveHref(product.href)"
                  class="footer-text-link"
                >
                  {{ product.title }}
                </a>
              </li>
            </ul>
          </section>

          <section class="footer-column">
            <h3>Corporate Solutions</h3>

            <ul>
              <li
                v-for="solution in corporateSolutions"
                :key="solution.id"
              >
                <a
                  :href="resolveHref(solution.href)"
                  class="footer-text-link"
                >
                  {{ solution.title }}
                </a>
              </li>
            </ul>
          </section>

          <section class="footer-column">
            <h3>Company</h3>

            <ul>
              <li
                v-for="link in companyLinks"
                :key="link.label"
              >
                <a
                  :href="resolveHref(link.href)"
                  class="footer-text-link"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>

          <section class="footer-column">
            <h3>Let’s talk</h3>

            <ul>
              <li
                v-for="link in contactLinks"
                :key="link.label"
              >
                <a
                  :href="resolveHref(link.href)"
                  class="footer-text-link"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>

            <p class="footer-contact-description">
              Find the right solution for your next stage of growth.
            </p>
          </section>
        </nav>

        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>© {{ year }} Cartinno. All rights reserved.</p>

            <p class="footer-credit">
  <span>Designed and developed by</span>

  <RouterLink
    to="/"
    class="footer-credit-logo"
    aria-label="Cartinno home"
  >
    <img
      :src="`${base}${logoImage}`"
      alt="Cartinno"
      loading="lazy"
    />
  </RouterLink>
</p>
          </div>

          <nav
            class="footer-legal"
            aria-label="Legal information"
          >
            <a
              v-for="link in legalLinks"
              :key="link.label"
              :href="resolveHref(link.href)"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>