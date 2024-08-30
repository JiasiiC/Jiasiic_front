<template>
  <div>
    <div
      v-for="(item, index) of hintData"
      v-html="highlightText(item)"
      class="py-1 pl-1 text-base hover:bg-zinc-200 rounded text-zinc-500 font-bold dark:text-zinc-400 dark:hover:bg-zinc-900 cursor-pointer"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>
<script>
const EMITS_ITEM_CILCK = 'itemClick'
</script>
<script setup>
import { ref } from 'vue'
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) {
    return
  }
  const { result } = await getHint(props.searchText)
  hintData.value = result
}
watchDebounced(
  () => props.searchText,
  () => {
    getHintData()
  },
  {
    immediate: true,
    // 搜索框防抖
    debounce: 500
  }
)
//下拉点击事件
const emits = defineEmits([EMITS_ITEM_CILCK])
const onItemClick = (val) => {
  emits(EMITS_ITEM_CILCK, val)
}
/**
 * 处理关键字高亮
 */
const highlightText = (text) => {
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, highlightStr)
}
</script>
<style lang="scss" scoped></style>
