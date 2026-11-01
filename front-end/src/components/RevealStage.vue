<script setup>
// Clean wrapper for bottom CTA and footer sections
</script>

<template>
  <div class="stage">
    <slot />
  </div>
</template>

<style>
.stage {
  position: relative;
  background: var(--bg);
}
.page-top {
  position: relative;
  z-index: 1;
  background: var(--bg);
}
</style>
