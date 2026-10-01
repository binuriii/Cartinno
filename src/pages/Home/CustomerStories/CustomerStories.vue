<script setup>
import { RouterLink } from 'vue-router'
import './CustomerStories.css'
import { useCustomerStories } from './CustomerStories.js'

const base = import.meta.env.BASE_URL

const {
  root,
  grid,
  metrics,
  customers,
  customerImage,
  fmt
} = useCustomerStories()
</script>

<template>
  <section ref="root" class="cl">
    <div class="cl-wrap">

      <header
        class="cl-head"
        data-r
      >
        <h2>
          People Love Cartinno!
        </h2>

        <p>
          Store, POS, food ordering and marketplaces on one platform.
          No juggling tools, no missed orders.
        </p>
      </header>

      <div
        ref="grid"
        class="cl-grid"
      >

        <!-- 01 -->
        <article
          class="cl-card cl-quote cl-span2"
          data-r
          style="--d:0s"
        >
          <span class="cl-mark">“</span>

          <p class="cl-qtext">
            Moving our shop and website onto one platform changed everything.
            Stock, orders and reports finally match, and we handle far more
            orders with the same team.
          </p>

          <div class="cl-foot">

            <div class="cl-person">
              <span class="cl-avatar">
                <img
                  :src="customers[0].avatar"
                  :alt="customers[0].name"
                  loading="lazy"
                />
              </span>

              <div>
                <b>
                  {{ customers[0].name }}
                </b>

                <small>
                  {{ customers[0].role }}
                </small>
              </div>
            </div>

            <div class="cl-rating">

              <div class="cl-stars">
                <svg
                  v-for="n in 5"
                  :key="n"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.5l2.9 6 6.6.8-4.8 4.6 1.2 6.5L12 17.3 6.1 20.4l1.2-6.5L2.5 9.3l6.6-.8z"
                  />
                </svg>
              </div>

              <span>
                5.0
                <em>Ratings</em>
              </span>

            </div>

          </div>
        </article>

        <!-- 02 -->
        <article
          class="cl-card cl-metric"
          data-r
          style="--d:.08s"
        >
          <div
            class="cl-glow cl-glow--warm"
            aria-hidden="true"
          ></div>

          <strong class="cl-num">
            {{ fmt(metrics[0]) }}
          </strong>

          <p>
            {{ metrics[0].label }}
          </p>
        </article>

        <!-- 03 -->
        <article
          class="cl-card cl-quote"
          data-r
          style="--d:.16s"
        >
          <span class="cl-mark">“</span>

          <p class="cl-qtext">
            The dashboard shows me where sales come from, so I know which
            channel is working every single day.
          </p>

          <div class="cl-foot">

            <div class="cl-person">
              <span class="cl-avatar">
                <img
                  :src="customers[1].avatar"
                  :alt="customers[1].name"
                  loading="lazy"
                />
              </span>

              <div>
                <b>
                  {{ customers[1].name }}
                </b>

                <small>
                  {{ customers[1].role }}
                </small>
              </div>
            </div>

          </div>
        </article>

        <!-- 04 -->
        <article
          class="cl-card cl-metric"
          data-r
          style="--d:0s"
        >
          <div
            class="cl-glow cl-glow--lilac"
            aria-hidden="true"
          ></div>

          <strong class="cl-num">
            {{ fmt(metrics[1]) }}
          </strong>

          <p>
            {{ metrics[1].label }}
          </p>
        </article>

        <!-- 05 -->
        <article
          class="cl-card cl-quote cl-quote--tall"
          data-r
          style="--d:.08s"
        >
          <span class="cl-mark">“</span>

          <p class="cl-qtext">
            Launching our marketplace felt easy. Sellers, catalogues and
            payouts were set up in days, and support answers whenever we
            need them.
          </p>

          <div class="cl-foot">

            <div class="cl-person">
              <span class="cl-avatar">
                <img
                  :src="customers[2].avatar"
                  :alt="customers[2].name"
                  loading="lazy"
                />
              </span>

              <div>
                <b>
                  {{ customers[2].name }}
                </b>

                <small>
                  {{ customers[2].role }}
                </small>
              </div>
            </div>

          </div>
        </article>

        <!-- 06 -->
        <article
          class="cl-card cl-photo cl-span2"
          data-r
          style="--d:.16s"
        >
          <div class="cl-photo__img">
            <img :src="`${base}food-delivery.jpg`" alt="food delivery" />
          </div>

          <div class="cl-photo__copy">

            <div>
              <h3>
                Trusted by 1,000+ brands across retail, food and marketplaces
              </h3>

              <p>
                Cartinno keeps your store, POS and delivery in sync,
                so every order lands in the right place.
              </p>
            </div>


          </div>
        </article>

      </div>
    </div>
  </section>
</template>