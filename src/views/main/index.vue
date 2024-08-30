<template>
  <div
    class="scrollbar h-full bg-white dark:bg-zinc-800 duration-500 scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget"
  >
    <div>
      <navigationVue></navigationVue>

      <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
        <listVue></listVue>
      </div>
    </div>
    <m-trigger-menu
      class="fixed bottom-6 w-[220px] m-auto left-0 right-0"
      v-if="isMobileTerminal"
    >
      <m-trigger-menu-item
        icon="home"
        textClass="text-zinc-900 dark:text-zinc-200"
        >首页</m-trigger-menu-item
      >
      <m-trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        textClass="text-zinc-900 dark:text-zinc-200"
        @click="onMemberClick"
        >VIP</m-trigger-menu-item
      >
      <m-trigger-menu-item
        icon="profile"
        textClass="text-zinc-900 dark:text-zinc-200"
        @click="onMyClick"
        >{{ $store.getters.token ? '我的' : '登录' }}</m-trigger-menu-item
      >
    </m-trigger-menu>
  </div>
</template>
<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter } from 'vue-router'
import { ref, onActivated } from 'vue'
import { useScroll } from '@vueuse/core'
const router = useRouter()
const onMyClick = () => {
  if (store.getters.token) {
    store.commit('app/changeRouterType', 'push')

    router.push('/profile')
  } else {
    store.commit('app/changeRouterType', 'push')
    router.push('/login')
  }
}
const containerTarget = ref(null)
// 记录滚动位置
const { y: containerTargetY } = useScroll(containerTarget)
// 被缓存的组件再次可以  会调用onActivated
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetY.value
})
// 跳转vip
const onMemberClick = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/member')
}
</script>
<style scoped></style>
