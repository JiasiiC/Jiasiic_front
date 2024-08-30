<template>
  <div class="sticky top-0 left-0 bg-white dark:bg-zinc-900 duration-500 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-sm text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- 滑块 -->
      <li
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 pb-[0.7rem] dark:bg-zinc-800"
        :style="sliderStyle"
        ref="sliderTarget"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center leading-4 bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
        @click="isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!-- category -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100': $store.getters.currentCategoryIndex === index
        }"
        :ref="setItemRef"
        @click="moveSlider(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisable">
      <m-menu @changeIndex="moveSlider"></m-menu>
    </m-popup>
  </div>
</template>
<script setup>
import { nextTick, ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { useStore } from 'vuex'
const store = useStore()
// 滑块的动态样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '56px'
})

let itemRefs = ref([])
const setItemRef = (el) => {
  if (el) {
    itemRefs.value.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs.value = []
})
// 获取ul偏移位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    console.log(val)
    const { left, width } = itemRefs.value[val].getBoundingClientRect()
    sliderStyle.value = {
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
      width: width + 'px'
    }
    // 点击面包屑滑动滑块到指定位置
    if (isVisable.value) {
      isVisable.value = false
      ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft - 15
    }
  }
)

// 点击li后 更新index
const moveSlider = (item) => {
  store.commit('app/changeCurrentCategory', item)
}

// const moveSlider = (index) => {
//   nextTick(() => {
//     sliderStyle.value = {
//       transform: `translateX(${itemRefs.value[index].offsetLeft - 10})`,

//       width: `${itemRefs.value[index].offsetWidth}px`
//     }
//   })
// }
// 控制面包屑显示
let isVisable = ref(false)
const isOpenPopup = () => {
  isVisable.value = true
}
</script>
<style lang="scss" scoped></style>
