<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "./ReportingSection.css";
import { reportingContent as c } from "./ReportingSectionData.js";

const chartBars = [
  [30, "light"],
  [20, "blue"],
  [45, "light"],
  [60, "blue"],
  [40, "light"],
  [55, "blue"],
  [35, "light"],
  [45, "blue"],
  [65, "light"],
  [80, "blue"],
  [45, "light"],
  [40, "blue"],
  [50, "light"],
  [55, "blue"],
  [75, "light"],
  [92, "blue"],
  [45, "blue"],
  [35, "light"],
  [50, "blue"],
  [40, "light"],
  [30, "blue"],
  [25, "light"],
  [25, "light"],
  [15, "light"],
].map(([h, type], i) => ({ id: i, height: h + "%", type }));

const sectionRef = ref(null);
const visible = ref(false);
const sales = ref(0);
const orders = ref(0);
const phoneSales = ref(0);
let observer = null;

const fmt = (n) => n.toLocaleString("en-US");

function countUp(target, to, duration, delay) {
  setTimeout(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      target.value = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

function play() {
  visible.value = true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sales.value = c.cards.top.widget.sales;
    orders.value = c.cards.top.widget.orders;
    phoneSales.value = c.cards.bottomRight.phone.sales;
    return;
  }
  countUp(sales, c.cards.top.widget.sales, 1400, 400);
  countUp(orders, c.cards.top.widget.orders, 1200, 700);
  countUp(phoneSales, c.cards.bottomRight.phone.sales, 1600, 1100);
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        play();
        observer.disconnect();
      }
    },
    { threshold: 0.2 },
  );
  observer.observe(sectionRef.value);
});

onBeforeUnmount(() => observer && observer.disconnect());
</script>

<template>
  <section
    ref="sectionRef"
    class="rs-section"
    :class="{ 'is-visible': visible }"
  >
    <div class="rs-container">
      <div class="rs-header">
        <h2 class="rs-title">
          <span class="rs-title-line"
            ><span>{{ c.headingPart1 }}</span></span
          >
          <span class="rs-title-line rs-title-muted"
            ><span>{{ c.headingPart2 }}</span></span
          >
        </h2>
      </div>

      <div class="rs-grid">
        <!-- TOP CARD -->
        <div class="rs-card rs-card-top" style="--d: 0s">
          <div class="rs-top-visual">
            <div class="rs-chart-widget-wrapper">
              <div class="rs-chart-widget">
                <div class="rs-cw-title">
                  <i class="fa-solid fa-chart-pie"></i>
                  <span>{{ c.cards.top.widget.salesLabel }}</span>
                </div>
                <div class="rs-cw-metrics">
                  <span class="rs-cw-value">${{ fmt(sales) }}</span>
                  <span class="rs-cw-badge"
                    ><i class="fa-solid fa-arrow-up"></i>
                    {{ c.cards.top.widget.salesChange }}</span
                  >
                </div>

                <div class="rs-cw-chart-container">
                  <div class="rs-cw-bars">
                    <div
                      v-for="bar in chartBars"
                      :key="bar.id"
                      class="rs-cw-bar"
                      :class="
                        bar.type === 'blue'
                          ? 'rs-cw-bar-blue'
                          : 'rs-cw-bar-light'
                      "
                      :style="{ '--h': bar.height, '--i': bar.id }"
                    ></div>
                  </div>
                  <div class="rs-cw-x-axis">
                    <span>{{ c.cards.top.widget.axisStart }}</span>
                    <span>{{ c.cards.top.widget.axisEnd }}</span>
                  </div>
                </div>

                <div class="rs-cw-divider"></div>

                <div class="rs-cw-footer-top">
                  <div class="rs-cw-title">
                    <i class="fa-solid fa-bell-concierge"></i>
                    <span>{{ c.cards.top.widget.ordersLabel }}</span>
                  </div>
                  <i class="fa-solid fa-chevron-right rs-cw-chevron"></i>
                </div>
                <div class="rs-cw-metrics">
                  <span class="rs-cw-value">{{ orders }}</span>
                  <span class="rs-cw-badge"
                    ><i class="fa-solid fa-arrow-up"></i>
                    {{ c.cards.top.widget.ordersChange }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="rs-top-content">
            <span class="rs-label">{{ c.cards.top.label }}</span>
            <h3>{{ c.cards.top.title }}</h3>
          </div>
        </div>

        <!-- GREEN CARD -->
        <div class="rs-card rs-card-green" style="--d: 0.15s">
          <div class="rs-card-content">
            <span class="rs-label">{{ c.cards.bottomLeft.label }}</span>
            <h3>{{ c.cards.bottomLeft.title }}</h3>
          </div>
          <div class="rs-notify-stage">
            <div class="rs-notify-float">
              <div class="rs-notify rs-notify-back"></div>
              <div class="rs-notify rs-notify-front">
                <div class="rs-notify-logo">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
                    <circle cx="12" cy="12" r="2.6" />
                  </svg>
                </div>
                <div class="rs-notify-body">
                  <div class="rs-notify-top">
                    <strong>{{ c.cards.bottomLeft.notification.app }}</strong>
                    <span>{{ c.cards.bottomLeft.notification.time }}</span>
                  </div>
                  <p>{{ c.cards.bottomLeft.notification.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BLUE CARD -->
        <div class="rs-card rs-card-blue" style="--d: 0.3s">
          <div class="rs-card-content">
            <span class="rs-label">{{ c.cards.bottomRight.label }}</span>
            <h3>{{ c.cards.bottomRight.title }}</h3>
          </div>
          <div class="rs-phone-stage">
            <div class="rs-phone">
              <div class="rs-phone-screen">
                <div class="rs-phone-status">
                  <span>{{ c.cards.bottomRight.phone.time }}</span>
                  <span class="rs-island"></span>
                  <span class="rs-phone-icons">
                    <i class="fa-solid fa-signal"></i
                    ><i class="fa-solid fa-wifi"></i
                    ><i class="fa-solid fa-battery-full"></i>
                  </span>
                </div>
                <div class="rs-phone-bar">
                  <span class="rs-pill"
                    >{{ c.cards.bottomRight.phone.store }}
                    <i class="fa-solid fa-angle-down"></i
                  ></span>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <p class="rs-phone-msg">
                  {{ c.cards.bottomRight.phone.before }}
                  <span class="rs-money"
                    ><b class="rs-coin"></b>${{ fmt(phoneSales) }}</span
                  >
                  {{ c.cards.bottomRight.phone.middle }}
                  <span class="rs-warn"
                    ><i class="fa-solid fa-triangle-exclamation"></i>
                    {{ c.cards.bottomRight.phone.warn }}</span
                  >
                  {{ c.cards.bottomRight.phone.after }}
                </p>
                <ul class="rs-phone-list">
                  <li
                    v-for="(a, i) in c.cards.bottomRight.phone.alerts"
                    :key="a.text"
                    :style="{ '--i': i }"
                  >
                    <i class="fa-solid" :class="a.icon"></i>
                    <span>{{ a.text }}</span>
                    <i class="fa-solid fa-chevron-right"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
