<script setup>
// Generic bridge: mounts a React component inside a Vue component.
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'

const props = defineProps({
  component: { type: [Function, Object], required: true },
  props: { type: Object, default: () => ({}) },
  as: { type: String, default: 'div' },
})

const host = ref(null)
let root = null

onMounted(() => {
  root = createRoot(host.value)
  watchEffect(() => root.render(createElement(props.component, props.props)))
})
onBeforeUnmount(() => root?.unmount())
</script>

<template>
  <component :is="as" ref="host" />
</template>
