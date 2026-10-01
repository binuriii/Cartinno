<script setup>
import './AppFooter.css'

const footerLinks = [
  {
    title: 'Products',
    links: [
      { label: 'Storefront', href: '#storefront' },
      { label: 'Cloud POS', href: '#pos' },
      { label: 'Food App', href: '#food' },
      { label: 'Delivery', href: '#delivery' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pricing', href: '#pricing' },
      { label: 'Clients', href: '#clients' },
      { label: 'Support', href: '#support' },
      { label: 'Contact', href: '#contact' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Corporate Solutions', href: '#corporate' },
      { label: 'Careers', href: '#careers' },
      { label: 'Partners', href: '#partners' }
    ]
  }
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">

    <div class="footer-shell">

      <!-- CTA -->
      <section class="footer-cta">

        <div
          class="footer-cta-orb footer-cta-orb--one"
          aria-hidden="true"
        ></div>

        <div
          class="footer-cta-orb footer-cta-orb--two"
          aria-hidden="true"
        ></div>

        <div class="footer-cta-content">

          <h2>
            Run your business smarter
            <br>
            with Cartinno
          </h2>

          <p>
            Connect sales, customers, payments and daily operations
            in one platform built to help your business grow.
          </p>

          <a
            href="#contact"
            class="footer-cta-button"
          >
            Get Started
          </a>

        </div>

      </section>

      <!-- MAIN FOOTER -->
      <div class="footer-main">

        <div class="footer-top">

          <!-- BRAND -->
          <div class="footer-brand">

            <RouterLink
              to="/"
              class="footer-logo"
            >
              cartinn<span>o</span>
            </RouterLink>

            <p>
              Cartinno helps modern businesses manage sales,
              customers and daily operations from one connected platform.
            </p>

            <div class="footer-socials">

              <a
                href="#"
                aria-label="Facebook"
              >
                <i
                  class="fa-brands fa-facebook-f"
                  aria-hidden="true"
                ></i>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
              >
                <i
                  class="fa-brands fa-linkedin-in"
                  aria-hidden="true"
                ></i>
              </a>

              <a
                href="#"
                aria-label="Instagram"
              >
                <i
                  class="fa-brands fa-instagram"
                  aria-hidden="true"
                ></i>
              </a>

              <a
                href="#"
                aria-label="Telegram"
              >
                <i
                  class="fa-brands fa-telegram"
                  aria-hidden="true"
                ></i>
              </a>

            </div>

          </div>

          <!-- LINKS -->
          <div class="footer-links">

            <div
              v-for="group in footerLinks"
              :key="group.title"
              class="footer-column"
            >
              <h4>
                {{ group.title }}
              </h4>

              <a
                v-for="link in group.links"
                :key="link.label"
                :href="link.href"
              >
                {{ link.label }}
              </a>
            </div>

          </div>

          <!-- NEWSLETTER -->
          <div class="footer-newsletter">

            <h4>
              Newsletter
            </h4>

            <p>
              Get product updates, business insights
              and Cartinno news in your inbox.
            </p>

            <form
              class="footer-subscribe"
              @submit.prevent
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
              >

              <button type="submit">
                Subscribe

                <span aria-hidden="true">
                  →
                </span>
              </button>
            </form>

          </div>

        </div>

        <div class="footer-divider"></div>

        <!-- BOTTOM -->
        <div class="footer-bottom">

          <p>
            © {{ year }} Cartinno. All rights reserved.
          </p>

          <div class="footer-legal">
            <a href="#privacy">
              Privacy Policy
            </a>

            <a href="#terms">
              Terms of Service
            </a>

            <a href="#security">
              Security
            </a>

            <a href="#cookies">
              Cookies
            </a>
          </div>

        </div>

      </div>

    </div>

  </footer>
</template>