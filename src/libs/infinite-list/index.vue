<template>
  <div>
    <!-- 内容 -->
    <slot> </slot>
    <!-- 加载状态 -->
    <div ref="loadingTarget" class="h-6 py-4">
      <m-svg-icon
        name="infinite-load"
        class="animate-spin w-4 h-4 mx-auto"
        v-show="loading"
      ></m-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        没有更多数据了
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
// 是否在底部（是否交叉）
const targetIsIntersecting = ref(false)
const props = defineProps({
  // 是否在加载中
  modelValue: {
    type: Boolean,
    required: true
  },
  // 是否加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue', 'on-Load'])
// 处理loading状态
const loading = useVModel(props)
/**
 * 判断是否到底部
 */
const loadingTarget = ref(null)
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], observerElement) => {
    // 加载更多视图可见时， 不在加载状态中，数据未加载完
    targetIsIntersecting.value = isIntersecting
    emitOnload()
  }
)
const emitOnload = () => {
  if (!loading.value && targetIsIntersecting.value && !props.isFinished) {
    //   数据加载中
    loading.value = true
    //   触发加载更多
    emits('on-Load')
  }
}
// 解决首次加载未铺满全屏无法滑动到底部的bug
watch(loading, () => {
  setTimeout(() => {
    emitOnload()
  }, 100)
})
</script>
<style lang="scss" scoped></style>
