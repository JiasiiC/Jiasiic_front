<template>
  <m-popover v-if="store.getters.token">
    <template #reference>
      <div
        class="guide-my relative flex items-center hover:bg-zinc-100/60 cursor-pointer dark:bg-zinc-800"
      >
        <!-- 头像 -->
        <img v-lazy :src="store.getters.userInfo.avatar" class="w-3 h-3" />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5 dark:fill-zinc-300"
          fillClass="fill-zinc-600"
          name="down-arrow"
        ></m-svg-icon>
        <!-- vip -->
        <m-svg-icon
          v-if="store.getters.userInfo.vipLevel"
          name="vip"
          class="absolute right-[16px] bottom-[-6px] w-1.5 h-1.5"
        ></m-svg-icon>
      </div>
    </template>
    <div class="w-14">
      <div
        class="flex p-1 items-center cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-sm text-zinc-800 dark:text-zinc-300">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
  <div v-if="!store.getters.token">
    <m-button icon="profile" iconColor="#fff" @click="onToLogin"> </m-button>
  </div>
</template>
<script setup>
import { confirm } from '@/libs'
import { nextTick } from 'vue'
const menuArr = [
  { id: 0, title: '个人资料', icon: 'profile', path: '/profile' },
  { id: 1, title: '升级VIP', icon: 'vip-profile', path: '/member' },
  { id: 2, title: '退出登录', icon: 'logout', path: '' }
]
import { useRouter } from 'vue-router'
const router = useRouter()
const onToLogin = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
import { useStore } from 'vuex'
const store = useStore()
// 退出登录
const onItemClick = (item) => {
  if (item.id === 2) {
    confirm('您确定要退出登录吗？').then(() => {
      store.dispatch('user/logout')
      store.commit('app/changeRouterType', 'back')
      router.back()
    })
    return
  }
  if (item.id === 0) {
    store.commit('app/changeRouterType', item.path)
    router.push(item.path)
    return
  }
  if (item.id === 1) {
    store.commit('app/changeRouterType', item.path)
    router.push(item.path)
    return
  }
}
</script>
<style lang="scss" scoped></style>
