<template>
  <div>
    <m-infinite-list
      v-model="loading"
      :isFinished="isFinished"
      @on-Load="getPexelsData"
    >
      <m-water-fall
        :data="pexelsList"
        class="w-full"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :columuSpacing="5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <itemVue :width="width" :data="item" @pins="onToPins"></itemVue>
        </template>
      </m-water-fall>
    </m-infinite-list>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pinsVue v-if="isVisablePins" :id="currentPins.id"> </pinsVue>
    </transition>
  </div>
</template>
<script setup>
import itemVue from './item.vue'
import { getPexelsList } from '@/api/pexels'
import { ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'
import pinsVue from '../../../pins/components/pins.vue'
const store = useStore()
const pexelsList = ref([])
let query = {
  page: 1,
  size: 20,
  categoryId: ''
}
// 是否在加载中
const loading = ref(false)
// 是否全部加载完毕
const isFinished = ref(false)
const getPexelsData = async () => {
  // 无数据，return
  if (isFinished.value) return
  // 每次请求，页码+1
  if (pexelsList.value.length > 0) {
    query.page += 1
  }
  const res = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  // 判断是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}
getPexelsData()
// 重置query状态，重新发起请求
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
}
// 监听currentCatrgory变化
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)
// 监听搜索框文字变化
watch(
  () => store.getters.searchText,
  (searchText) => {
    resetQuery({
      page: 1,
      searchText: searchText
    })
  }
)
/**
 * 进入详情
 */
// 控制详情开关
const isVisablePins = ref(false)
// 当前选中的item
const currentPins = ref({})
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  isVisablePins.value = true
  currentPins.value = item
}
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.3,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    duration: 0.3,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
// 监听后退事件
useEventListener(window, 'popstate', () => {
  isVisablePins.value = false
})
</script>
<style lang="scss" scoped></style>
