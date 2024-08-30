<template>
  <div class="h-screen">
    <headerVue class="h-header flex"> </headerVue>
    <div class="h-main"><mainVue></mainVue></div>

    <floatingVue class="fixed bottom-10 right-2"></floatingVue>
  </div>
</template>
<script setup>
import headerVue from './components/header/index.vue'
import floatingVue from './components/floating/index.vue'
import mainVue from './components/main.vue'
</script>
<style lang="scss" scoped></style>
