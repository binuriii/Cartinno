<script setup>
import { RouterLink } from 'vue-router'
import { useGrowthSection } from './GrowthSection.js'
import './GrowthSection.css'

const {
  DUR,
  root,
  entered,
  cards,
  stories,
  icons,
  resellers,
  plans,
  features,
  limits,
  cur,
  yearly,
  price,
  billing,
  fmt
} = useGrowthSection()
</script>

<template>
  <section
    ref="root"
    class="growth"
    :style="{ '--dur': DUR + 'ms' }"
    aria-labelledby="growth-title"
  >
    <header class="growth-intro">
      <h2 id="growth-title">
        Everything you need to<br>
        scale your commerce brand
      </h2>

      <p>
        Cartinno gives you a reseller programme, clear subscription
        plans and a full set of store features, in one platform
        built for modern commerce teams.
      </p>
    </header>

    <div class="growth-stack">
      <article
        v-for="(card, index) in cards"
        :key="card.title"
        class="growth-panel"
        :class="[
          'growth-panel--' + index,
          { 'has-entered': entered[index] }
        ]"
        :style="{ '--index': index }"
      >
        <div class="gp-copy">
          <span class="gp-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <template v-if="index === 0">
                <circle cx="9" cy="8" r="3.5" />
                <path d="M2.5 20c.6-3.6 3.1-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
                <path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.7 3.1 2.3 3.5 5.2" />
              </template>

              <template v-else-if="index === 1">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="M3 10h18M7 15h3" />
              </template>

              <template v-else>
                <path d="M4 7h16M4 12h10M4 17h7" />
                <path d="m16 16 2 2 4-4" />
              </template>
            </svg>
          </span>

          <h3>{{ card.title }}</h3>

          <p>
            {{ card.text }}
          </p>

          <RouterLink
            :to="card.route"
            class="growth-button"
          >
            {{ card.cta }}
            <span aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <div
          class="gp-visual"
          :class="'gv' + (index + 1)"
        >
          <div class="gp-story gp-anim">
            <div
              v-for="(f, i) in stories[index]"
              :key="f.video"
              class="gp-frame"
              :class="{ on: i === cur(index) }"
              :aria-hidden="i !== cur(index)"
              :style="{
                '--media-position':
                  f.position || 'center center'
              }"
            >
              <img
                class="gp-media-image"
                :src="f.poster"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              >

              <video
                class="gp-vid"
                muted
                loop
                playsinline
                preload="metadata"
                :poster="f.poster"
                aria-hidden="true"
                @loadeddata="$event.target.classList.add('ready')"
                @error="$event.target.style.display = 'none'"
              >
                <source
                  :src="f.video"
                  type="video/mp4"
                >
              </video>
            </div>

            <div class="gp-shade"></div>

            <div
              class="gp-prog"
              aria-hidden="true"
            >
              <i
                v-for="(f, i) in stories[index]"
                :key="f.video"
                :class="{
                  done: i < cur(index),
                  live: i === cur(index)
                }"
              >
                <b></b>
              </i>
            </div>

            <div class="gp-shead">
              <span class="gp-logo">C</span>
              <small>Cartinno</small>
              <em>•••</em>
            </div>

            <Transition
              name="gp-txt"
              mode="out-in"
            >
              <p
                :key="cur(index)"
                class="gp-cap"
              >
                {{ stories[index][cur(index)].t1 }}
                <br>
                {{ stories[index][cur(index)].t2 }}
              </p>
            </Transition>

            <span class="gp-wm">
              cartinno
            </span>
          </div>

          <!-- RESELLER -->
          <div
            v-if="index === 0"
            class="gp-float gp-anim"
            style="--dl:.2s"
          >
            <div class="gp-tabs">
              <span
                v-for="(r, i) in resellers"
                :key="r.name"
                :class="{ on: i === cur(0) }"
              >
                {{ r.name }}
              </span>
            </div>

            <Transition
              name="gp-txt"
              mode="out-in"
            >
              <div :key="cur(0)">
                <p class="gp-head">
                  {{ resellers[cur(0)].tag }}
                </p>

                <ol class="gp-steps">
                  <li
                    v-for="(s, i) in resellers[cur(0)].steps"
                    :key="s"
                  >
                    <span>
                      {{ i + 1 }}
                    </span>

                    {{ s }}
                  </li>
                </ol>

                <p class="gp-note">
                  {{ resellers[cur(0)].note }}
                </p>
              </div>
            </Transition>
          </div>

          <!-- PLANS -->
          <div
            v-else-if="index === 1"
            class="gp-float gp-anim"
            style="--dl:.2s"
          >
            <div
              class="gp-tabs"
              aria-hidden="true"
            >
              <span :class="{ on: !yearly }">
                Monthly
              </span>

              <span :class="{ on: yearly }">
                Yearly
              </span>
            </div>

            <div class="gp-plans">
              <div
                v-for="(p, i) in plans"
                :key="p.name"
                class="gp-plan"
                :class="{ on: i === cur(1) }"
              >
                <b>
                  {{ p.name }}
                </b>

                <strong>
                  Rs {{ fmt(price(p)) }}

                  <em>
                    /{{ yearly ? 'year' : 'month' }}
                  </em>
                </strong>
              </div>
            </div>

            <Transition
              name="gp-txt"
              mode="out-in"
            >
              <div
                :key="cur(1) + '-' + yearly"
                class="gp-inc"
              >
                <ul>
                  <li
                    v-for="x in plans[cur(1)].includes"
                    :key="x"
                  >
                    {{ x }}
                  </li>
                </ul>

                <p class="gp-note">
                  {{ billing(plans[cur(1)]) }}
                </p>
              </div>
            </Transition>
          </div>

          <!-- FEATURES -->
          <div
            v-else
            class="gp-float gp-anim"
            style="--dl:.2s"
          >
            <div class="gp-feats">
              <div
                v-for="(f, i) in features"
                :key="f.title"
                class="gp-feat"
                :class="{ on: i === cur(2) }"
              >
                <span
                  class="gp-tick"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>

                <div>
                  <b>
                    {{ f.title }}
                  </b>

                  <small>
                    {{ f.text }}
                  </small>
                </div>
              </div>
            </div>

            <div class="gp-limits">
              <p class="gp-head">
                Products you can list
              </p>

              <div
                v-for="l in limits"
                :key="l.name"
                class="gp-limit"
              >
                <span>
                  {{ l.name }}
                </span>

                <i>
                  <b
                    :style="{
                      '--w': l.width + '%'
                    }"
                  ></b>
                </i>

                <em>
                  {{ l.value }}
                </em>
              </div>
            </div>
          </div>

        </div>
      </article>
    </div>
  </section>
</template>