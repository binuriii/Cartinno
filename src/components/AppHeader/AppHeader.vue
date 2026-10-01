<script setup>
import './AppHeader.css'

const links = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Products',
    href: '#products',
    children: [
      { label: 'Storefront', href: '#storefront' },
      { label: 'Cloud POS', href: '#pos' },
      { label: 'Food App', href: '#food' },
      { label: 'Delivery', href: '#delivery' }
    ]
  },
  {
    label: 'Corporate Solutions',
    href: '#corporate',
    children: [
      { label: 'Enterprise', href: '#enterprise' },
      { label: 'Franchise', href: '#franchise' }
    ]
  },
  {
    label: 'Clients',
    href: '#clients'
  },
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Pricing',
    href: '#pricing'
  },
  {
    label: 'Contact',
    href: '#pricing'
  }
]
</script>

<template>
  <header class="site-header">
    <div class="site-bar">

      <RouterLink
        to="/"
        class="site-logo"
      >
        cartinn<span>o</span>
      </RouterLink>


      <nav
        class="site-nav"
        aria-label="Main"
      >

        <div
          v-for="link in links"
          :key="link.label"
          class="nav-item"
        >

          <a
            :href="link.href"
            class="nav-link"
          >
            {{ link.label }}

            <i
              v-if="link.children"
              class="fa-solid fa-chevron-down nav-chevron"
              aria-hidden="true"
            ></i>
          </a>


          <div
            v-if="link.children"
            class="dropdown"
          >

            <div class="dropdown-inner">

              <a
                v-for="child in link.children"
                :key="child.label"
                :href="child.href"
              >
                {{ child.label }}
              </a>

            </div>

          </div>

        </div>

      </nav>


      <div class="site-actions">

        <a
          href="#demo"
          class="site-demo"
        >
          Get a Demo
        </a>

        <a
          href="#contact"
          class="site-cta"
        >
          Get Started
        </a>

      </div>

    </div>
  </header>
</template>