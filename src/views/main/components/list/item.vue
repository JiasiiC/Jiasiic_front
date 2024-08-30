<template>
  <div class="bg-white rounded dark:bg-zinc-900 xl:dark:bg-zinc-800 pb-1 px-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{ backgroundColor: randomRGB() }"
      @click="onToPinsClick"
    >
      <!-- 图片 -->
      <img
        v-lazy
        :src="data.photo"
        class="rounded bg-transparent"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
        ref="imgTarget"
      />
      <!-- 遮罩层  移动端不会显示 pc端显示-->
      <div
        class="w-full h-full hidden opacity-0 bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute left-1.5 top-1.5" @click="onShareClick()"
          >分享</m-button
        >
        <!-- 收藏 -->
        <m-button
          class="absolute right-1.5 top-1.5"
          type="info"
          iconClass="full-zinc-900 dark:full-zinc-200 "
          icon="heart"
        >
        </m-button>
        <!-- 下载 -->
        <m-button
          class="absolute left-1.5 bottom-1.5 bg-zinc-100/70"
          icon="download"
          type="info"
          iconClass="full-zinc-900 dark:full-zinc-200"
          @click="onDownload"
        ></m-button>
        <!-- 全屏 -->
        <m-button
          type="info"
          iconClass="full-zinc-900 dark:full-zinc-200"
          class="absolute right-1.5 bottom-1.5 bg-zinc-100/70"
          icon="full"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-base font-bold mt-1 text-zinc-900 dark:text-zinc-300 px-1">
      {{ data.title }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy :src="data.avatar" class="w-1.5 h-1.5 rounded-full mr-1" />
      <span class="text-sm dark:text-zinc-500">{{ data.author }}</span>
    </div>
  </div>
</template>
<script setup>
import { randomRGB } from '@/utils/color.js'
// 下载图片
import { saveAs } from 'file-saver'
import { message } from '@/libs'
// 全屏
import { useFullscreen } from '@vueuse/core'
// item在视图中的位置
import { useElementBounding } from '@vueuse/core'
import { ref, computed } from 'vue'
import { weiboShare } from '@/utils/share'
const props = defineProps({
  data: {
    type: Object
  },
  width: {
    type: Number
  }
})
// 下载
const onDownload = () => {
  message('success', '图片开始下载')
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 100)
}
// 全屏
const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)
const emits = defineEmits(['pins'])
// 进入详情点击事件
const onToPinsClick = () => {
  emits('pins', {
    id: props.data.id,
    location: imgContainerCenter.value
  })
}
/**
 * pins跳转处理，记录图片的中心点（X|Y + 一半宽|高）
 */
const {
  x: imgContainerX,
  y: imgContainerY,
  height: imgContainerHeight,
  width: imgContainerWidth
} = useElementBounding(imgTarget)
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2)
  }
})
/**
 * 分享按钮点击处理
 */
const onShareClick = () => {
  weiboShare(
    props.data.photo,
    `https://imooc-front.lgdsunday.club/pins/${props.data.id}`
  )
}
</script>
<style lang="scss" scoped></style>
