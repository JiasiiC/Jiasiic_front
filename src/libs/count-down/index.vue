<template>
  <div>
    <slot>
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>
<script>
// 倒计时改变事件
const EMITS_CHANGE = 'change'
// 倒计时结束事件
const EMITS_FINISH = 'finish'
// 间隔时间
const INTERVAL_COUNT = 1000
</script>
<script setup>
import { ref, watch, onUnmounted, computed } from 'vue'
import dayjs from './utils'
const props = defineProps({
  // 时长（毫秒）
  time: {
    type: Number,
    required: true
  },
  // 格式
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits([EMITS_CHANGE, EMITS_FINISH])
// 倒计时时间
const duration = ref(0)

// 清除倒计时
let interval
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}
// 倒计时开始
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}
// 倒计时行为
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  // 监听结束行为
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  { immediate: true }
)
// 组件销毁，关闭倒计时
onUnmounted(() => {
  close()
})
// 处理显示时间
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>
<style lang="scss" scoped></style>
