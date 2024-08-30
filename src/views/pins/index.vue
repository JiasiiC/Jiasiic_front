<template>
  <div class="w-full h-full bg-zinc-200 dark:8g-zinc-900">
    <pinsVue :id="$route.params.id"></pinsVue>
  </div>
</template>
<script setup>
import pinsVue from './components/pins.vue'
</script>
<style lang="scss" scoped></style>
