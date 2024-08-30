<template>
  <div
    class="flex flex-none relative flex-col items-center mr-2 border mt-5 hover:border-orange-300 w-[100px] xl:w-[150px] rounded-xl"
    @click="onItemClick"
    :class="[
      selected
        ? 'bg-orange-50 dark:bg-orange-50/10 border-orange-300 '
        : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-500'
    ]"
  >
    <p
      class="text-base pt-2 dark:text-zinc-200"
      :class="[selected ? 'text-orange-500 dark:text-orange-300' : '']"
    >
      {{ data.title }}
    </p>

    <p
      class="text-[32px] dark:text-zinc-200"
      :class="[selected ? 'text-orange-500 dark:text-orange-300' : '']"
    >
      <span class="text-base">￥</span>{{ data.price }}
    </p>
    <div class="text-sm line-through text-orange-400 pt-1 pb-2">
      ￥{{ data.oldPrice }}
    </div>
    <div
      class="bg-gradient-to-r from-orange-300 to-orange-100 text-yellow-700 rounded-tr-md rounded-bl-md text-sm py-0.5 px-1 absolute top-[-10px] right-0"
      v-if="isHot"
    >
      热销
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  // vip数据
  data: {
    type: Object,
    required: true
  },
  // 选中
  selected: {
    type: Boolean,
    default: false
  },
  //   是否热选
  isHot: {
    type: Boolean
  }
})
const emits = defineEmits(['click'])
const onItemClick = () => {
  emits('click', props.data)
}
</script>
<style lang="scss" scoped></style>
