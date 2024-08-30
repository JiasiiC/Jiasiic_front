<script setup>
import { ref } from 'vue'
const text = ref(true)
</script>

<template>
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view
      mainComponentName="home"
      :routerType="$store.getters.routerType"
    >
    </m-transition-router-view>
  </div>
</template>

<style></style>
