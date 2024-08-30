<template>
  <div>
    <div class="text-sm mr-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themesData.list.length">
      <!-- 大图 -->
      <div class="h-full relative w-[260px] mr-1.5 rounded cursor-pointer">
        <img
          v-lazy
          :src="themesData.big.photo"
          class="w-full h-full object-cover rounded"
          :style="{ backgroundColor: randomRGB() }"
        />
        <p
          class="rounded text-zinc-100 absolute bottom-0 left-0 backdrop-blur w-full h-[45%] text-xs hover:backdrop-blur-0 duration-300 flex items-center"
        >
          #{{ themesData.big.title }}
        </p>
      </div>
      <!-- 小图 -->
      <div class="max-w-[860px] flex flex-wrap flex-1 rounded">
        <div
          class="h-[45%] w-[260px] flex relative mr-1.5 mb-1.5 rounded cursor-pointer"
          v-for="item in themesData.list"
        >
          <img
            v-lazy
            :src="item.photo"
            class="w-full h-full object-cover rounded"
            :style="{ backgroundColor: randomRGB() }"
          />
          <p
            class="text-zinc-100 flex items-center rounded duration-300 absolute bottom-0 left-0 backdrop-blur h-full w-full text-xs hover:backdrop-blur-0"
          >
            #{{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getThemes } from '@/api/pexels'
import { ref } from 'vue'
import { randomRGB } from '@/utils/color'
const themesData = ref({
  big: {},
  list: []
})

const getThemesData = async () => {
  const { themes } = await getThemes()
  themesData.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
}
getThemesData()
</script>
<style lang="scss" scoped></style>
