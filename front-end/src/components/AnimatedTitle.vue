<script setup>
// Animated heading: ReactBits BlurText inside the Vue tree, exposed to AT as a real heading.
import ReactIsland from '../react/ReactIsland.vue'
import BlurText from '../react/bits/BlurText'

defineProps({
  text: { type: String, required: true },
  level: { type: Number, default: 2 },
  center: { type: Boolean, default: true },
  delay: { type: Number, default: 90 },
  trigger: { type: String, default: 'view' },
})
</script>

<template>
  <ReactIsland
    :component="BlurText"
    :props="{ text, delay, trigger, stepDuration: 0.28, animateBy: 'words', direction: 'bottom', distance: 18, blur: 6, className: center ? 'bt-center' : '' }"
    role="heading"
    :aria-level="level"
    class="animated-title"
  />
</template>

<style scoped>
.animated-title { width: 100%; }
</style>
