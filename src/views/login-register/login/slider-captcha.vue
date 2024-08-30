<template>
  <div
    class="fixed top-[10%] text-sm rounded left-[50%] translate-x-[-50%] w-[340px] h-[270px] bg-white dark:bg-zinc-800 border border-zinc-200 shadow-3xl"
  >
    <!-- 头部 -->
    <div class="flex h-5 items-center p-1 justify-between">
      <h3 class="text-base shrink-0 dark:text-zinc-200">请完成安全验证</h3>
      <div class="flex">
        <m-svg-icon
          name="refresh"
          class="w-3 h-3 p-0.5 rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-900 cursor-pointer duration-300"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onReset"
        ></m-svg-icon>
        <m-svg-icon
          name="close"
          class="w-3 h-3 p-0.5 ml-1 rounded-sm hover:bg-zinc-200 dark:hover:bg-zinc-900 cursor-pointer duration-300"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onClose"
        ></m-svg-icon>
      </div>
    </div>
    <!-- captcha -->
    <div id="captcha"></div>
  </div>
</template>
<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>
<script setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { getCaptcha } from '@/api/sys'
import { onMounted, ref } from 'vue'
const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])
let captcha = null

onMounted(() => {
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    // 成功回调
    async onSuccess(arr) {
      const res = await getCaptcha({
        behavior: arr
      })
      if (res) {
        emits(EMITS_SUCCESS)
      }
    },
    // 失败回调
    onFail() {
      console.log('fail')
    },
    // 默认验证方法,选择在用户拼图成功进行验证，此处永远返回return
    verify() {
      return true
    }
  })
})
const onReset = () => {
  captcha.reset()
}
const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>
<style lang="scss" scoped></style>
