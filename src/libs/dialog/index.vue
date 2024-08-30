<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade" v-if="isVisable" @click="close">
      <div
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        class="max-w-[80%] xl:max-h-[80%] fixed top-[10%] left-[50%] translate-x-[-50%] bg-white dark:bg-zinc-800 z-50 xl:min-w-[35%] border dark:border-zinc-600 rounded-sm px-2 py-1.5 cursor-pointer"
        v-if="isVisable"
      >
        <!-- 标题 -->
        <div
          v-if="title"
          class="text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-200"
        >
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base mb-2 text-zinc-900 dark:text-zinc-200">
          <slot></slot>
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
const props = defineProps({
  // 控制开关
  modelValue: {
    type: Boolean,
    required: true
  },
  // 标题
  title: {
    type: String
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消按钮点击事件
  cancelHandler: Function,
  // 确定按钮点击事件
  confirmHandler: Function,
  // 关闭的回调
  close: Function
})
import { useVModel } from '@vueuse/core'
defineEmits(['update:modelValue'])
const isVisable = useVModel(props)
/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}

const close = () => {
  isVisable.value = false
  if (props.close) {
    props.close()
  }
}
</script>
<style lang="scss" scoped>
// fade动画
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
