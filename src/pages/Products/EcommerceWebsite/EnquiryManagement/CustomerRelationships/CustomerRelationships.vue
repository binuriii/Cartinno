<script setup>
import { customerRelationshipsHeading as heading, customerRelationshipScenes as scenes, customerRelationshipsPreview as preview } from './CustomerRelationshipsData.js'
import { usePreview } from '../usePreview.js'
import './CustomerRelationships.css'
const { active, paused, target } = usePreview(scenes.length, preview.interval)
function select(index) { active.value = index; paused.value = true }
</script>
<template>
<section ref="target" class="em-section rel-section" :class="{'rel-paused':paused}" aria-labelledby="rel-title"><div class="em-container">
 <header class="em-heading em-centered"><h2 id="rel-title">{{ heading.first }}<br>{{ heading.second }}</h2><p>{{ heading.description }}</p></header>
 <div class="rel-experience" :class="'rel-'+scenes[active].theme">
  <div class="rel-toolbar"><b>{{ preview.brand }}<span>{{ preview.title }}</span></b><button class="em-control" type="button" :aria-pressed="paused" @click="paused=!paused">{{ paused ? 'Play animation' : 'Pause animation' }}</button></div>
  <Transition name="rel-scene" mode="out-in"><div :key="active" class="rel-workspace">
   <aside class="rel-profile rel-arrive"><span class="rel-eyebrow">{{ scenes[active].profileLabel }}</span><div class="rel-avatar">{{ scenes[active].initials }}<i></i></div><h3>{{ scenes[active].customer }}</h3><p>{{ scenes[active].profileDetail }}</p><div class="rel-profile-line"></div><span class="rel-detail-label">A connected customer view</span><div class="rel-context"><span>✓</span> Relevant details together</div><div class="rel-context"><span>✓</span> A clearer next conversation</div><div class="rel-profile-tag">{{ scenes[active].badge }}</div></aside>
   <div class="rel-conversation"><div class="rel-conversation-header"><span class="rel-status-dot"></span><span>{{ scenes[active].label }}</span><small>Demo</small></div><h3>{{ scenes[active].tag }}</h3><div class="rel-bubble rel-incoming"><span>{{ scenes[active].customer.split(' ')[0] }}</span><p>{{ scenes[active].request }}</p></div><div class="rel-typing" aria-hidden="true"><i></i><i></i><i></i></div><div class="rel-bubble rel-outgoing"><span>Your team</span><p>{{ scenes[active].reply }}</p><small>Response recorded ✓</small></div><div class="rel-compose" aria-hidden="true"><span>One connected conversation</span><b>↗</b></div></div>
   <aside class="rel-insight rel-arrive"><span class="rel-eyebrow">THE BIGGER PICTURE</span><div class="rel-orb" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M8 28V18m12 10V10m12 18V4"/></svg></div><h3>{{ scenes[active].insightTitle }}</h3><p>{{ scenes[active].insightText }}</p><ul><li v-for="(activity,i) in scenes[active].activity" :key="activity" :style="{'--delay':(i*.18+.3)+'s'}"><span>✓</span>{{ activity }}</li></ul></aside>
  </div></Transition>
  <div class="rel-switcher" aria-label="Choose customer preview"><button v-for="(scene,i) in scenes" :key="scene.id" type="button" :class="{active:active===i}" :aria-pressed="active===i" @click="select(i)"><span>{{ '0'+(i+1) }}</span>{{ scene.label }}</button></div>
 </div>
 <p class="rel-demo">{{ preview.note }}</p>
</div></section>
</template>
