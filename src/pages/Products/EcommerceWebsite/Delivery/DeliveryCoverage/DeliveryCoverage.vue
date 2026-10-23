<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/land-110m.json'

import {
  coverageContent,
  deliveryLocations,
  deliveryJourney,
  coverageHighlights
} from './DeliveryCoverageData.js'

const sectionRef = ref(null)
const canvasRef = ref(null)

const isMobile = ref(false)
const isVisible = ref(false)
const reducedMotion = ref(false)
const elapsed = ref(0)

let observer = null
let mobileQuery = null
let motionQuery = null
let frameId = null
let previousTime = null

const MAP_WIDTH = 1200
const MAP_HEIGHT = 640

// Each stage takes 4 seconds:
// 3 seconds travelling, then 1 second at the destination.
const STAGE_DURATION = 4000
const TRAVEL_DURATION = 3000

const iconPaths = {
  store: [
    'M3 10h18',
    'M5 10v11h14V10',
    'M3 10l2-7h14l2 7',
    'M9 21v-7h6v7',
    'M8 3l-1 7',
    'M16 3l1 7'
  ],
  package: [
    'M12 3l9 5-9 5-9-5 9-5Z',
    'M3 8v9l9 5 9-5V8',
    'M12 13v9',
    'M7.5 5.5l9 5'
  ],
  truck: [
    'M3 5h11v12H3V5Z',
    'M14 9h4l3 4v4h-7',
    'M14 13h7',
    'M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
    'M20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0'
  ],
  home: [
    'M3 11l9-8 9 8',
    'M5 10v11h14V10',
    'M9 21v-7h6v7'
  ]
}

/* RESPONSIVE NODE POSITIONS */

const locations = computed(() =>
  deliveryLocations.map((location) => ({
    ...location,
    ...(isMobile.value ? location.mobile : location.desktop)
  }))
)

/* CONNECTION CURVES */

const routes = computed(() =>
  deliveryJourney.map((journey) => {
    const start = locations.value.find(
      (location) => location.id === journey.from
    )

    const end = locations.value.find(
      (location) => location.id === journey.to
    )

    const control = {
      x: (start.x + end.x) / 2,
      y: isMobile.value
        ? (start.y + end.y) / 2 - 65
        : Math.min(start.y, end.y) - journey.curve
    }

    return {
      ...journey,
      start,
      end,
      control,
      path:
        `M ${start.x} ${start.y} ` +
        `Q ${control.x} ${control.y} ${end.x} ${end.y}`
    }
  })
)

const stageIndex = computed(() =>
  reducedMotion.value
    ? deliveryJourney.length - 1
    : Math.floor(elapsed.value / STAGE_DURATION) %
      deliveryJourney.length
)

const stageTime = computed(() =>
  elapsed.value % STAGE_DURATION
)

const progress = computed(() =>
  reducedMotion.value
    ? 1
    : Math.min(stageTime.value / TRAVEL_DURATION, 1)
)

const hasArrived = computed(() => progress.value >= 1)

const activeRoute = computed(
  () => routes.value[stageIndex.value]
)

const activeNode = computed(() =>
  hasArrived.value
    ? activeRoute.value.to
    : activeRoute.value.from
)

const statusTitle = computed(() =>
  hasArrived.value
    ? activeRoute.value.completeTitle
    : activeRoute.value.title
)

/* PARCEL POSITION ON THE SAME CURVE AS THE ROUTE */

const parcelPosition = computed(() => {
  const { start, control, end } = activeRoute.value

  const t = progress.value
  const inverse = 1 - t

  return {
    x:
      inverse * inverse * start.x +
      2 * inverse * t * control.x +
      t * t * end.x,
    y:
      inverse * inverse * start.y +
      2 * inverse * t * control.y +
      t * t * end.y
  }
})

/* GENERATE THE DOTTED MAP ONCE */

function drawMap() {
  const canvas = canvasRef.value
  if (!canvas) return

  const land = feature(world, world.objects.land)

  const mask = document.createElement('canvas')
  mask.width = MAP_WIDTH
  mask.height = MAP_HEIGHT

  const maskContext = mask.getContext('2d', {
    willReadFrequently: true
  })

  if (!maskContext) return

  const projection = geoNaturalEarth1().fitExtent(
    [
      [20, 10],
      [MAP_WIDTH - 20, MAP_HEIGHT - 10]
    ],
    land
  )

  const drawLand = geoPath(projection, maskContext)

  maskContext.beginPath()
  drawLand(land)
  maskContext.fillStyle = '#000000'
  maskContext.fill()

  const pixels = maskContext.getImageData(
    0,
    0,
    MAP_WIDTH,
    MAP_HEIGHT
  ).data

  const ratio = Math.min(window.devicePixelRatio || 1, 2)

  canvas.width = Math.round(MAP_WIDTH * ratio)
  canvas.height = Math.round(MAP_HEIGHT * ratio)

  const context = canvas.getContext('2d')
  if (!context) return

  context.scale(ratio, ratio)
  context.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT)

  const spacing = 8
  const radius = 1.65

  context.fillStyle = '#bfc7c3'
  context.beginPath()

  let row = 0

  for (let y = 4; y < MAP_HEIGHT; y += spacing) {
    const stagger = row % 2 === 0 ? 0 : spacing / 2

    for (
      let x = 4 + stagger;
      x < MAP_WIDTH;
      x += spacing
    ) {
      const pixelIndex =
        (Math.floor(y) * MAP_WIDTH + Math.floor(x)) * 4

      if (pixels[pixelIndex + 3] < 128) continue

      context.moveTo(x + radius, y)
      context.arc(x, y, radius, 0, Math.PI * 2)
    }

    row += 1
  }

  context.fill()
}

/* ANIMATION LIFECYCLE */

function stopAnimation() {
  if (frameId !== null) {
    cancelAnimationFrame(frameId)
  }

  frameId = null
  previousTime = null
}

function tick(time) {
  if (previousTime !== null) {
    elapsed.value =
      (elapsed.value + Math.min(time - previousTime, 100)) %
      (deliveryJourney.length * STAGE_DURATION)
  }

  previousTime = time
  frameId = requestAnimationFrame(tick)
}

function syncAnimation() {
  stopAnimation()

  if (
    isVisible.value &&
    !reducedMotion.value &&
    !document.hidden
  ) {
    frameId = requestAnimationFrame(tick)
  }
}

function updateMobile(event) {
  isMobile.value = event.matches
}

function updateMotion(event) {
  reducedMotion.value = event.matches
  syncAnimation()
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 640px)')
  motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  isMobile.value = mobileQuery.matches
  reducedMotion.value = motionQuery.matches

  mobileQuery.addEventListener('change', updateMobile)
  motionQuery.addEventListener('change', updateMotion)

  document.addEventListener(
    'visibilitychange',
    syncAnimation
  )

  drawMap()

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry.isIntersecting
        syncAnimation()
      },
      { threshold: 0.1 }
    )

    if (sectionRef.value) {
      observer.observe(sectionRef.value)
    }
  } else {
    isVisible.value = true
    syncAnimation()
  }
})

onBeforeUnmount(() => {
  stopAnimation()
  observer?.disconnect()

  mobileQuery?.removeEventListener('change', updateMobile)
  motionQuery?.removeEventListener('change', updateMotion)

  document.removeEventListener(
    'visibilitychange',
    syncAnimation
  )
})
</script>

<template>
  <section
    ref="sectionRef"
    class="dc-section"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="dc-heading"
  >
    <div class="dc-container">
      <!-- HEADING -->
      <header class="dc-header">
        <h2 id="dc-heading" class="dc-heading">
          <span>{{ coverageContent.title }}</span>
          <span>{{ coverageContent.highlight }}</span>
        </h2>

        <p class="dc-description">
          {{ coverageContent.description }}
        </p>
      </header>

      <!-- DELIVERY NETWORK -->
      <div class="dc-network">
        <div class="dc-map-background" aria-hidden="true">
          <canvas
            ref="canvasRef"
            class="dc-map-canvas"
          ></canvas>
        </div>

        <svg
          class="dc-network-svg"
          :viewBox="
            isMobile
              ? '0 0 400 660'
              : '0 0 1200 640'
          "
          role="img"
          aria-label="Illustrated delivery journey: order received, preparation, delivery handover, and customer delivery"
        >
          <!-- CONNECTING ROUTES -->
          <g
            v-for="(route, index) in routes"
            :key="route.id"
          >
            <path
              :d="route.path"
              class="dc-route-underlay"
            />

            <path
              :d="route.path"
              class="dc-route"
              :class="{
                'is-active': index === stageIndex,
                'is-complete': index < stageIndex
              }"
            />
          </g>

          <!-- MOVING PARCEL (SMALLER) -->
          <g
            v-if="!hasArrived"
            class="dc-parcel"
            :transform="
              `translate(${parcelPosition.x}, ${parcelPosition.y})`
            "
            aria-hidden="true"
          >
            <rect
              x="-15"
              y="-13"
              width="30"
              height="26"
              rx="8"
              class="dc-parcel-background"
            />

            <g
              transform="translate(-8 -8) scale(.67)"
              class="dc-parcel-icon"
            >
              <path
                v-for="(path, index) in iconPaths.package"
                :key="index"
                :d="path"
              />
            </g>
          </g>

          <!-- DELIVERY STATIONS (SMALLER ICONS) -->
          <g
            v-for="location in locations"
            :key="location.id"
            class="dc-station"
            :class="{
              'is-active': activeNode === location.id
            }"
            :transform="
              `translate(${location.x}, ${location.y})`
            "
          >
            <circle
              class="dc-station-glow"
              r="38"
            />

            <circle
              class="dc-station-ring"
              r="28"
            />

            <circle
              class="dc-station-circle"
              r="22"
            />

            <g
              transform="translate(-10 -10) scale(.83)"
              class="dc-station-icon"
            >
              <path
                v-for="(path, index) in iconPaths[location.icon]"
                :key="index"
                :d="path"
              />
            </g>

            <!-- WHITE LABEL CARD -->
            <g
              class="dc-station-label"
              transform="translate(-80 -84)"
            >
              <rect
                width="160"
                height="54"
                rx="14"
              />

              <circle
                cx="17"
                cy="22"
                r="4"
                class="dc-station-label-dot"
              />

              <text
                x="29"
                y="23"
                class="dc-station-title"
              >
                {{ location.title }}
              </text>

              <text
                x="29"
                y="40"
                class="dc-station-subtitle"
              >
                {{ location.subtitle }}
              </text>
            </g>
          </g>
        </svg>

        <!-- STATUS SYNCHRONISED WITH THE PARCEL -->
        <div class="dc-status">
          <div class="dc-status-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                v-for="(path, index) in iconPaths[activeRoute.icon]"
                :key="index"
                :d="path"
              />
            </svg>
          </div>

          <div class="dc-status-copy">
            <span class="dc-status-eyebrow">
              Delivery journey preview
            </span>

            <strong>{{ statusTitle }}</strong>

            <span class="dc-status-description">
              {{ activeRoute.description }}
            </span>
          </div>

          <div
            class="dc-status-indicator"
            :class="{ 'is-complete': hasArrived }"
            aria-hidden="true"
          >
            <svg
              v-if="hasArrived"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="m6 12 4 4 8-9" />
            </svg>

            <span v-else class="dc-status-spinner"></span>
          </div>

          <div class="dc-status-progress" aria-hidden="true">
            <span
              :style="{
                transform: `scaleX(${progress})`
              }"
            ></span>
          </div>
        </div>
      </div>

      <!-- BENEFITS -->
      <div class="dc-highlights">
        <div
          v-for="item in coverageHighlights"
          :key="item.title"
          class="dc-highlight"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./DeliveryCoverage.css"></style>