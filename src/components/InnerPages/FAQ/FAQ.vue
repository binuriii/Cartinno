
<script setup>
import { ref, watch } from 'vue'
import './FAQ.css'

const props = defineProps({
  title: {
    type: String,
    default: 'Frequently Ask Questions'
  },
  items: {
    type: Array,
    default: () => []
  }
})

const openItems = ref([0])

const isOpen = (index) => openItems.value.includes(index)

const toggleFAQ = (index) => {
  if (isOpen(index)) {
    openItems.value = openItems.value.filter(
      (item) => item !== index
    )
  } else {
    openItems.value = [...openItems.value, index]
  }
}

watch(
  () => props.items,
  () => {
    openItems.value = props.items.length ? [0] : []
  }
)
</script>

<template>
  <section class="faq-section">
    <div class="faq-container">
      <h2 class="faq-heading">
        {{ title }}
      </h2>

      <div class="faq-grid">
        <div
          v-for="(item, index) in items"
          :key="item.id ?? index"
          class="faq-card"
          :class="{ 'faq-card-open': isOpen(index) }"
        >
          <button
            class="faq-question"
            type="button"
            :aria-expanded="isOpen(index)"
            :aria-controls="`faq-answer-${index}`"
            @click="toggleFAQ(index)"
          >
            <span
              class="faq-icon"
              :class="{ 'faq-icon-open': isOpen(index) }"
              aria-hidden="true"
            >
              {{ isOpen(index) ? '−' : '+' }}
            </span>

            <span class="faq-question-text">
              {{ item.question }}
            </span>
          </button>

          <div
            :id="`faq-answer-${index}`"
            class="faq-answer-wrapper"
            :class="{ 'is-open': isOpen(index) }"
          >
            <div class="faq-answer-inner">
              <p class="faq-answer">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
