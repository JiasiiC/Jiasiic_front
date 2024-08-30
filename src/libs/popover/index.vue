<template>
  <div
    class="relative"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    ref="referenceTarget"
  >
    <div>
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        v-if="isVisable"
        class="absolute bg-white border rounded-md p-1 z-20 dark:bg-zinc-900 dark:border-zinc-700"
        ref="contentTarget"
        :style="contentStyle"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'
// 指定位置的Emum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
// 防抖延迟时间
const DELAY_TIME = 100
</script>
<script setup>
import { ref, watch, nextTick } from 'vue'
const isVisable = ref(false)
// 防抖  防止鼠标移动太慢  弹出框消失
let timer
// 鼠标移入
const onMouseenter = () => {
  isVisable.value = true
  if (timer) {
    clearTimeout(timer)
  }
}
// 鼠标移出
const onMouseleave = () => {
  timer = setTimeout(() => {
    isVisable.value = false
    timer = null
  }, DELAY_TIME)
}
// 接收指定位置
const props = defineProps({
  placement: {
    type: String,
    default: 'bottom-left',
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(`你的输入必须是${placementEnum.join('、')}中的一个`)
      }
      return result
    }
  }
})
// 计算元素尺寸
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
// 计算弹层位置
const contentStyle = ref({
  top: 0,
  left: 0
})
// 监听展示的变化
watch(isVisable, (val) => {
  if (!val) {
    return
  }
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>
<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slider-enter-from,
.slider-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
