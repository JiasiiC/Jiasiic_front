<template>
  <button
    @click.stop="onBtnClick"
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
  >
    <!-- loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字按钮 -->
    <slot v-else></slot>
  </button>
</template>
<script>
import mSvgIcon from '../svg-icon/index.vue'
// type 按钮风格
const typeEnum = {
  primary:
    'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900   dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main  dark:bg-zinc-900   dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:text-zinc-300   dark:bg-zinc-700  dark:hover:bg-zinc-600  dark:active:bg-zinc-700'
}
// size 按钮大小 区分文字和icon
const sizeEnum = {
  // 文字
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  // icon按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMITS_CLICK = 'click'
</script>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 图标名
  icon: String,
  // 图标颜色
  iconColor: String,
  // 图标类名
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    // 校验
    validator(val) {
      const keys = Object.keys(typeEnum)
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`type必须是${keys.join('、')}中的一个`)
      }
      return res
    }
  },
  //   大小风格
  size: {
    type: String,
    default: 'default',
    // 校验
    validator(val) {
      const keys = Object.keys(sizeEnum)
      const res = keys.filter((item) => !item.includes('icon'))
      if (!res) {
        throw new Error(`type必须是${keys.join('、')}中的一个`)
      }
      return res
    }
  },
  // 动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载
  loading: {
    type: Boolean,
    default: false
  }
})
// 区分文字和icon按钮
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
// 处理点击事件
const emits = defineEmits([EMITS_CLICK])
const onBtnClick = () => {
  if (props.loading) return
  emits(EMITS_CLICK)
}
</script>
<style lang="scss" scoped></style>
