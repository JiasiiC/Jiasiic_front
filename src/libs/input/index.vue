<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      type="text"
      v-model="text"
      v-if="type === TYPE_TEXT"
      :maxlength="max"
      class="w-full outline-0 border border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400"
    />
    <!-- 多行 -->
    <textarea
      rows="5"
      v-if="type === TYPE_TEXTAREA"
      :maxlength="max"
      v-model="text"
      class="w-full outline-0 border border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }} / {{ max }}
    </span>
  </div>
</template>
<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>
<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
const props = defineProps({
  // 文本内容
  modelValue: {
    type: String,
    required: true,
    default: ''
  },
  // 类型
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(val) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const res = arr.includes(val)
      if (!res) {
        throw new Error(`type的值必须在可选范围内${arr.join('、')}`)
      }
      return res
    }
  },
  // 最大文本长度
  max: {
    type: [String, Number]
  }
})
const emits = defineEmits(['update:modelValue'])
const text = useVModel(props)
const currentNumber = computed(() => {
  return text.value?.length || 0
})
</script>
<style lang="scss" scoped></style>
