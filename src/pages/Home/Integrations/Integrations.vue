<script setup>
import './Integrations.css'
import { nodes, hubImage } from './IntegrationsData.js'

const branchPath = (i) => {
  const x = 100 + i * 200
  const y = 40
  const bend = 18
  const dir = x > 400 ? 1 : x < 400 ? -1 : 0

  if (dir === 0) {
    return `M400,0 L400,${y} L400,160`
  }

  return `M400,0
          L400,${y - bend}
          Q400,${y} ${400 + dir * bend},${y}
          L${x - dir * bend},${y}
          Q${x},${y} ${x},${y + bend}
          L${x},160`
}
</script>

<template>
  <section class="ig" id="integrations">
    <h2 class="ig-title">Connect all your tools<br />and automate workflows</h2>

    <div class="ig-diagram">
      <div class="ig-hub">
        <img v-if="hubImage" :src="hubImage" alt="" class="ig-hub-img" />
        <i v-else class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
      </div>

      <svg class="ig-lines" viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden="true">
        <template v-for="(n, i) in nodes" :key="`branch-${i}`">
          <path :d="branchPath(i)" pathLength="100" class="ig-path" />
          <path
            :d="branchPath(i)"
            pathLength="100"
            class="ig-flow"
            :style="{ animationDelay: `${i * 0.4}s` }"
          />
        </template>
      </svg>

      <div class="ig-nodes">
        <div v-for="n in nodes" :key="n.label" class="ig-node">
          <i class="fa-solid" :class="n.icon" aria-hidden="true"></i>
          <span>{{ n.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>