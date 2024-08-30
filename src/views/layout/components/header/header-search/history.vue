<template>
  <div class="">
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      ></m-svg-icon>
    </div>

    <div
      class="mr-2 mb-1.5 flex items-center cursor-pointer py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300"
    >
      <div
        v-for="(item, index) in $store.getters.historys"
        :key="item"
        class="flex h-3 bg-zinc-100 mr-2 items-center p-1 hover:bg-zinc-200 rounded"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="onDeleteClick(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
import { confirm } from '@/libs'
const emits = defineEmits(['itemClick'])
const onItemClick = (item) => {
  emits('itemClick', item)
}
const onDeleteAllClick = () => {
  confirm('确定要删除全部记录吗？').then(() => {
    store.commit('history/deleteAllHistory')
  })
}
const onDeleteClick = (item) => {
  store.commit('history/deleteHistory', item)
}
</script>
<style lang="scss" scoped></style>
