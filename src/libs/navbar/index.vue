<template>
  <div
    class="w-full h-5 bg-white border-b-zinc-200 flex justify-center items-center z-10 dark:bg-zinc-800 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky left-0 right-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="h-full w-5 absolute left-0 flex justify-center items-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <m-svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center mx-auto justify-center font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      class="absolute right-0 flex items-center justify-center h-full w-5"
      @click="onClickRight"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const props = defineProps({
  clickLeft: Function,
  clickRight: Function,
  sticky: Boolean
})
const onClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }
  store.commit('app/changeRouterType', 'back')
  router.back()
}
const onClickRight = () => {
  if (props.clickRight) {
    props.clickRight()
  }
}
</script>
<style lang="scss" scoped></style>
