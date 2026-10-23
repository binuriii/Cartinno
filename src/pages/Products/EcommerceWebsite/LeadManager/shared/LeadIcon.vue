<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'user'"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></template>
    <template v-else-if="name === 'users'"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></template>
    <template v-else-if="name === 'check'"><path d="m20 6-11 11-5-5"/></template>
    <template v-else-if="name === 'check-circle'"><circle cx="12" cy="12" r="9"/><path d="m8.2 12 2.5 2.5 5.1-5.1"/></template>
    <template v-else-if="name === 'mail'"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></template>
    <template v-else-if="name === 'phone'"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.7 19.7 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.4 2.8a2 2 0 0 1-.6 1.7L8.2 10a16 16 0 0 0 5.8 5.8l.8-1.7a2 2 0 0 1 1.7-.6l2.8.4a2 2 0 0 1 1.7 2Z"/></template>
    <template v-else-if="name === 'clock'"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></template>
    <template v-else-if="name === 'message'"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.5 9 9 0 0 1-4.2-1l-4.8 1.2 1.2-4.8a9 9 0 0 1-1-4.2 8.5 8.5 0 0 1 8.5-8.5h.5a8.5 8.5 0 0 1 8.7 8.8Z"/></template>
    <template v-else-if="name === 'arrow-right'"><path d="M4 12h16m-7-7 7 7-7 7"/></template>
    <template v-else-if="name === 'arrow-down'"><path d="M12 4v16m-7-7 7 7 7-7"/></template>
    <template v-else-if="name === 'trending'"><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></template>
    <template v-else-if="name === 'target'"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></template>
    <template v-else-if="name === 'sparkles'"><path d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3Zm7 13 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></template>
    <template v-else-if="name === 'calendar'"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></template>
    <template v-else-if="name === 'layers'"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></template>
    <template v-else-if="name === 'bell'"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></template>
    <template v-else-if="name === 'search'"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></template>
    <template v-else-if="name === 'heart'"><path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 6l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.3a5.5 5.5 0 0 0 0-7.8Z"/></template>
    <template v-else><circle cx="12" cy="12" r="9"/></template>
  </svg>
</template>
