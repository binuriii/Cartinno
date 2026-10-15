
<script setup>
import {
  retailSectionHeading,
  retailChangeContent,
  retailArticles
} from './RetailChangeData.js'

import './RetailChange.css'

const featuredArticle = retailArticles[0]
const otherArticles = retailArticles.slice(1)
</script>

<template>
  <section class="rc-section">
    <div class="rc-container">

      <!-- SECTION HEADING -->
      <div class="rc-section-heading">
        <h2 class="rc-section-title">
          {{ retailSectionHeading.title }}
        </h2>

        <p class="rc-section-description">
          {{ retailSectionHeading.description }}
        </p>
      </div>

      <!-- FEATURED PANEL -->
      <div class="rc-featured">

        <!-- LEFT SIDE -->
        <div class="rc-featured-content">

          <div class="rc-featured-main">
            <h3 class="rc-title">
              {{ retailChangeContent.title }}
            </h3>

            <p class="rc-description">
              {{ retailChangeContent.description }}
            </p>
          </div>

          <div class="rc-featured-bottom">

            <p>
              Understand the change.
              Build for what's next.
            </p>
          </div>

        </div>

        <!-- RIGHT SIDE: ONE FEATURED IMAGE CARD -->
        <article class="rc-featured-image">

          <img
            :src="featuredArticle.image"
            :alt="featuredArticle.imageAlt"
            class="rc-featured-photo"
            loading="lazy"
          />

          <div
            class="rc-featured-overlay"
            aria-hidden="true"
          ></div>

          <!-- TOP LABEL -->
          <span class="rc-image-tag">
            {{ featuredArticle.label }}
          </span>

          <!-- CNN REPORTING CONTENT -->
          <div class="rc-image-news">

            <span class="rc-news-label">
              AS REPORTED BY
            </span>

            <div class="rc-publisher">
              <span class="rc-publisher-logo">
                <img
                  :src="featuredArticle.logo"
                  :alt="featuredArticle.publisher + ' logo'"
                  loading="lazy"
                />
              </span>

              <span class="rc-publisher-name">
                {{ featuredArticle.publisher }}
              </span>
            </div>

            <h3 class="rc-featured-headline">
              {{ featuredArticle.headline }}
            </h3>

          </div>
        </article>

      </div>

      <!-- OTHER PUBLICATION CARDS -->
      <div class="rc-articles">

        <article
          v-for="(article, index) in otherArticles"
          :key="article.id"
          class="rc-article"
          :class="'rc-article-' + article.theme"
        >

          <div class="rc-article-top">

            <div class="rc-article-publisher">
              <img
                :src="article.logo"
                :alt="article.publisher + ' logo'"
                loading="lazy"
              />

              <span>
                {{ article.publisher }}
              </span>
            </div>
          </div>

          <div class="rc-article-copy">
            <h3>
              {{ article.headline }}
            </h3>
          </div>

          <div class="rc-article-media">
            <img
              :src="article.image"
              :alt="article.imageAlt"
              loading="lazy"
            />

            <span class="rc-media-caption">
              RETAIL REPORT · 2017
            </span>
          </div>

        </article>

      </div>

    </div>
  </section>
</template>
