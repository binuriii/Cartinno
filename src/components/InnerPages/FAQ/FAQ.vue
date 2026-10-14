
<script setup>
import { ref, watch, computed } from 'vue'
import './FAQ.css'

const props = defineProps({
  title: {
    type: String,
    default: 'Frequently asked questions'
  },
  description: {
    type: String,
    default: 'Everything you need to know about our services.'
  },
  items: {
    type: Array,
    default: () => []
  },
  openFirst: {
    type: Boolean,
    default: true
  }
})

const activeIndex = ref(
  props.openFirst && props.items.length ? 0 : null
)

const splitIndex = computed(() =>
  Math.ceil(props.items.length / 2)
)

const leftItems = computed(() =>
  props.items.slice(0, splitIndex.value)
    .map((item, index) => ({ ...item, index }))
)

const rightItems = computed(() =>
  props.items.slice(splitIndex.value)
    .map((item, index) => ({
      ...item,
      index: index + splitIndex.value
    }))
)

const isOpen = (index) => activeIndex.value === index

const toggleFAQ = (index) => {
  activeIndex.value = isOpen(index) ? null : index
}

watch(
  [() => props.items, () => props.openFirst],
  () => {
    activeIndex.value =
      props.openFirst && props.items.length ? 0 : null
  }
)
</script>

<template>
  <section class="faq-section">
    <div class="faq-container">

      <div class="faq-header">
        <h2 class="faq-heading">
          {{ title }}
        </h2>

        <p class="faq-description">
          {{ description }}
        </p>
      </div>

      <div class="faq-grid">

        <div
          v-for="(column, columnIndex) in [leftItems, rightItems]"
          :key="columnIndex"
          class="faq-column"
        >
          <article
            v-for="item in column"
            :key="item.id ?? item.index"
            class="faq-card"
            :class="{ 'faq-card-open': isOpen(item.index) }"
          >
            <button
              type="button"
              class="faq-question"
              :aria-expanded="isOpen(item.index)"
              :aria-controls="`faq-answer-${item.index}`"
              @click="toggleFAQ(item.index)"
            >
              <span class="faq-question-text">
                {{ item.question }}
              </span>

              <span
                class="faq-icon"
                :class="{ 'faq-icon-open': isOpen(item.index) }"
                aria-hidden="true"
              >
                {{ isOpen(item.index) ? '×' : '+' }}
              </span>
            </button>

            <div
              :id="`faq-answer-${item.index}`"
              class="faq-answer-wrapper"
              :class="{ 'is-open': isOpen(item.index) }"
            >
              <div class="faq-answer-inner">
                <p class="faq-answer">
                  {{ item.answer }}
                </p>
              </div>
            </div>
          </article>
        </div>

      </div>
    </div>
  </section>
</template>
