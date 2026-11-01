<script setup>
// Section heading: a real semantic heading with a quiet fade-up (no per-word blur).
defineProps({
  text: { type: String, required: true },
  level: { type: Number, default: 2 },
  center: { type: Boolean, default: true },
  delay: { type: Number, default: 90 },
  trigger: { type: String, default: 'view' },
})
</script>

<template>
  <component :is="'h' + level" class="animated-title reveal" :class="{ centered: center }">{{ text }}</component>
</template>

<style scoped>
.animated-title { width: 100%; margin: 0; }
.centered { text-align: center; }
</style>
