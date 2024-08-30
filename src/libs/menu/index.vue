<template>
  <div class="py-2 flex flex-col h-[80vh]">
    <h2 class="text-xl text-zinc-900 font-bold mx-1 pb-2 dark:text-zinc-200">
      所有分类
    </h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="text-lg text-zinc-900 py-1 mx-1 last:pb-0 duration-100 active:text-zinc-100 dark:text-zinc-300 active:dark:bg-zinc-900"
        @click="emits('changeIndex', item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
// 改变nav位置
const emits = defineEmits('changeIndex')
</script>
<style lang="scss" scoped></style>
