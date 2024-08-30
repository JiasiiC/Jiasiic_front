<template>
  <div
    class="flex bg-white px-2 py-1 border-b border-b-zinc-200 dark:bg-zinc-800 dark:boder-b-zinc-900 duration-500"
  >
    <div class="flex w-full items-center">
      <m-svg-icon
        class="guide-home h-4 cursor-pointer w-3 mr-2"
        name="home"
        @click="goHome"
      ></m-svg-icon>
      <headerSearchVue v-model="inputValue" class="flex-1 guide-search">
      </headerSearchVue>
      <headerThemeVue></headerThemeVue>
      <headerMyVue></headerMyVue>
    </div>
  </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue'
import headerMyVue from './header-my.vue'
import headerThemeVue from './header-theme.vue'
import hintVue from './header-search/hint.vue'
import historyVue from './header-search/history.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
const inputValue = ref('')
</script>

<style lang="scss" scoped></style>
