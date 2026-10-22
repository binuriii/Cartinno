<script setup>
import { content } from './ConnectedPOSData.js'
import './ConnectedPOS.css'
</script>
<template><section class="pi-section pi-connected" aria-label="Connected POS integrations"><div class="pi-container"><header class="pi-heading"><h2>{{ content.title1 }}<br>{{ content.title2 }}</h2><p>{{ content.description }}</p></header>
<div class="cp-stack"><article v-for="(feature, i) in content.features" :key="feature.number" class="cp-card" :class="'cp-card-'+i">
<div class="cp-copy"><span class="cp-icon" aria-hidden="true">{{ ['↔','◉','▦'][i] }}</span><small>{{ feature.number }} / CONNECTED COMMERCE</small><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p></div>
<div class="cp-stage" aria-label="Illustrative interface"><div class="cp-window"><div class="cp-toolbar"><span>● ● ●</span><small>cartinno / {{ ['orders','payments','inventory'][i] }}</small></div>
<template v-if="i === 0"><div class="cp-window-head"><b>Every order. One place.</b><span class="cp-live">Live</span></div><div class="cp-metrics"><div><small>Online store</small><strong>24</strong></div><div><small>In-store</small><strong>38</strong></div></div><div v-for="(item,j) in ['Online order #1042','Counter order #1043','Online order #1044']" :key="item" class="cp-row"><span class="cp-order-icon">{{ j === 1 ? '▣' : '↗' }}</span><span>{{ item }}<small>{{ ['Ready to prepare','Payment received','New order'][j] }}</small></span><i class="cp-check">✓</i></div></template>
<template v-else-if="i === 1"><div class="cp-payment"><small>ORDER #1043</small><h4>Simple checkout.</h4><strong>Rs. 4,850.00</strong><div class="cp-methods"><span>Cash</span><span>Card</span><span>Wallet</span><span>QR</span></div><div class="cp-paid">✓ Payment received</div></div></template>
<template v-else><div class="cp-window-head"><b>Stock overview</b><span class="cp-live">In sync</span></div><div v-for="(item,j) in ['House blend coffee','Fresh pastries','Bottled drinks']" :key="item" class="cp-stock"><div><b>{{ item }}</b><small>{{ [82,12,64][j] }} available</small></div><div class="cp-track"><span :style="{width: [82,12,64][j]+'%', background: j===1 ? '#d7454e' : '#57ad91'}"></span></div></div><div class="cp-alert">↗ Low-stock alert: Fresh pastries</div></template>
<small class="cp-demo">Illustrative demo data</small></div><div class="cp-float"><span>✓</span><div><b>{{ ['Order synced','Checkout complete','Stock updated'][i] }}</b><small>{{ ['Online + in-store','One connected record','Across your channels'][i] }}</small></div></div></div>
</article></div></div></section></template>
