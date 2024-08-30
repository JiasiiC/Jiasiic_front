<template>
  <div
    class="bg-white sticky top-0 left-0 w-full z-10 dark:bg-zinc-800 duration-500"
  >
    <ul
      class="w-[800px] relative flex flex-wrap mx-auto justify-center overflow-x-hidden px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden"
      :class="isOpenCategorys ? 'h-[206px]' : 'h-[56px]'"
    >
      <!-- 箭头 -->
      <div
        class="absolute bottom-1 right-1 cursor-pointer rounded duration-200 hover:bg-zinc-200 p-1 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svg-icon
          :name="isOpenCategorys ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="text-base dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-900 shrink-0 px-1 py-0 z-10 duration-200 text-zinc-900 h-4 leading-4 cursor-pointer rounded mr-1 mb-1 font-bold hover:bg-zinc-200"
        @click="onItemClick(item)"
        :class="{
          'text-zinc-900 bg-zinc-200  dark:bg-zinc-900':
            $store.getters.currentCategoryIndex === index
        }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const isOpenCategorys = ref(false)

// 控制nav 展开关闭
const triggerState = () => {
  isOpenCategorys.value = !isOpenCategorys.value
}
// 选中某个分类
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
}
</script>
<style lang="scss" scoped></style>
