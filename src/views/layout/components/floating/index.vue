<template>
  <div>
    <!-- 引导页 -->
    <div
      class="guide-start group duration-300 dark:bg-zinc-900 bg-white hover:shadow-lg border dark:border-0 border-zinc-200 w-4 h-4 rounded-full mb-1 cursor-pointer flex items-center justify-center"
      @click="onGuideClick"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="dark:fill-zinc-200 fill-zinc-900 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover
      class="flex items-center duration-300 guide-feedback"
      placement="top-left"
    >
      <template #reference>
        <div
          class="group duration-300 dark:bg-zinc-900 bg-white hover:shadow-lg border dark:border-0 border-zinc-200 w-4 h-4 rounded-full cursor-pointer flex items-center justify-center"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="dark:fill-zinc-200 group-hover:fill-main "
          ></m-svg-icon>
        </div>
      </template>
      <div class="w-[140px] overflow-hidden cursor-pointer">
        <div
          class="flex items-center p-1 hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span
            class="text-zinc-800 dark:text-zinc-300 text-sm"
            @click="toFeedBack"
            >立即吐槽</span
          >
        </div>
      </div>
    </m-popover>
  </div>
</template>
<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import steps from './steps'
import { FEEDBACK_URL } from '@/constants'
// 引导页处理
let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一个',
    prevBtnText: '上一个'
  })
})
// 指引
const onGuideClick = () => {
  driver.defineSteps(steps)
  driver.start()
}
// 反馈回调
const toFeedBack = () => {
  window.open(FEEDBACK_URL, '__blank')
}
</script>
<style lang="scss" scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
