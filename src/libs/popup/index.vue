<template>
  <div>
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          v-if="modelValue"
          @click="emits('update:modelValue', false)"
        ></div>
      </transition>
      <transition name="popup-up-down">
        <div
          class="w-screen bg-white z-50 fixed bottom-0 dark:bg-zinc-800"
          :class="class"
          v-if="modelValue"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { useScrollLock } from '@vueuse/core'
import { watchEffect } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  class: {
    type: String
  }
})

const emits = defineEmits(['update:modelValue'])
// 滑动锁定
const isLocked = useScrollLock(document.body)
watchEffect(() => {
  isLocked.value = props.modelValue
})
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
//popup动画
.popup-up-down-enter-active {
  transition: all 0.3s;
}
.popup-up-down-leave-active {
  transition: all 0.3s;
}

.popup-up-down-enter-from,
.popup-up-down-leave-to {
  transform: translateY(100%);
}
</style>
