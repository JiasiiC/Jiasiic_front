<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 z-20 text-xl backdrop-blur-4xl bg-white dark:bg-zinc-800 pb-2 overflow-y-auto xl:p-2 xl:bg-transparent"
  >
    <!-- 移动端下navbar -->
    <m-navbar
      v-if="isMobileTerminal"
      sticky
      @clickLeft="onPop"
      @clickRight="onPop"
    >
      <div>{{ pexelsData.title }}</div>
      <template #right>
        <div>
          <m-svg-icon
            name="share"
            class="h-3 w-3"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-svg-icon>
        </div>
      </template>
    </m-navbar>
    <!-- pc端下展示关闭图标 -->
    <m-svg-icon
      name="close"
      class="absolute top-2 right-2 w-4 h-4 p-1 cursor-pointer hover:bg-zinc-300 duration-200"
      fillClass="fill-zinc-400"
      @click="onPop"
      v-if="!isMobileTerminal"
    ></m-svg-icon>

    <div v-if="pexelsData.title" class="xl:w-[80%] xl:mx-auto xl:flex xl:h-full xl:rounded-lg ">
        <img class="w-screen xl:w-3/5 xl:h-full mb-2 xl:rounded-tl-lg xl:rounded-bl-lg" :src="pexelsData.photo" ></img>     
        <div  class="xl:relative xl:w-2/5 xl:h-full xl:rounded-tr-lg xl:rounded-br-lg xl:p-3 xl:bg-white xl:dark:bg-zinc-900 ">
        <div class="flex justify-between" v-if="!isMobileTerminal">
            <m-svg-icon  name="share" class="w-4 h-4 duration-300 rounded hover:bg-zinc-200 p-1 dark:hover:bg-zinc-800" fillClass="fill-zinc-900 dark:fill-zinc-200"></m-svg-icon>
            <m-button   icon="heart" type="info" iconClass="fill-zinc-900 darl:fill-zinc-200"></m-button>
       
        </div>
       
        <!-- 标题 -->
           <div class="p-1 font-bold mb-2 text-zinc-900 dark:text-zinc-200">{{ pexelsData.title }}</div>
           <!-- 作者 -->
           <div class="flex items-center">
            <img v-lazy  :src="pexelsData.avatar"class="rounded-full w-5 h-5 p-1 mr-1 ">
            <span class="dark:text-zinc-200" >{{ pexelsData.author }}</span>
           </div>
     </div>
 
    </div>
    <div v-else>
        <m-svg-icon name="infinite-load" class="animate-spin w-4 h-4 mx-auto"></m-svg-icon>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getPexelsFromId } from '@/api/pexels'
import { useRouter } from 'vue-router'
const router = useRouter()
const pexelsData = ref({})
import {useStore } from 'vuex'
const store = useStore()
const getPexelsData = async () => {
  const data = await getPexelsFromId(props.id)
  pexelsData.value = data
}
getPexelsData()
// 关闭按钮
const onPop = () => {
    store.commit('app/changeRouterType','back')
  router.back()
}
</script>
<style lang="scss" scoped></style>
