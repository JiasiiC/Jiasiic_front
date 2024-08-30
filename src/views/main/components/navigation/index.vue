<template>
  <mobileNavigationVue v-if="isMobileTerminal"></mobileNavigationVue>
  <pcNavigationVue v-else></pcNavigationVue>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'

import { useStore } from 'vuex'
const store = useStore()

store.dispatch('category/useCategoryData')
</script>
<style lang="scss" scoped></style>
