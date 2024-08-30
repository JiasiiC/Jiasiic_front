<template>
  <div
    class="group flex-1 relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
    ref="containerTarget"
  >
    <!-- 搜索图标 -->
    <m-svg-icon
      name="search"
      class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      color="#707070"
    ></m-svg-icon>
    <!-- 输入框 -->
    <input
      type="text"
      placeholder="搜索"
      class="block w-full dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700 h-[44px] pl-4 text-sm outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
      v-model="inputValue"
      @keyup.enter="onSearchHandler"
      @focus="onFocusHandler"
      @blur="onBlurHandler"
    />
    <!-- 删除按钮 -->
    <m-svg-icon
      v-show="inputValue"
      name="input-delete"
      @click="clearInputValue"
      class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer"
    ></m-svg-icon>
    <!-- 分割线 -->
    <div
      class="opacity-0 w-[1px] h-1.5 absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
    ></div>
    <!-- 搜索按钮 -->
    <m-button
      icon="search"
      class="opacity-0 absolute translate-y-[-50%] duration-500 top-[50%] right-1 rounded-full group-hover:opacity-100"
      iconColor="#ffffff"
      @click="onSearchHandler"
    ></m-button>
    <!-- 下拉区 -->
    <transition name="slider">
      <div
        class="dark:text-zinc-400 dark:bg-zinc-800 dark:border-zinc-600 w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent p-2 rounded border border-zinc-200 duration-200 hover:shadow-3xl"
        v-if="$slots.dropdown"
        v-show="isFocus"
      >
        <slot name="dropdown"> </slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVModel, onClickOutside } from '@vueuse/core'
import { watch, computed, ref } from 'vue'
// 搜索提示

const containerTarget = ref(null)
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emits = defineEmits([
  'update:modelValue',
  'search',
  'blur',
  'clear',
  'focus',
  'input'
])
const inputValue = useVModel(props)
// 清空文本
const clearInputValue = () => {
  inputValue.value = ''
  emits('clear', '')
}
// 点击搜索
const onSearchHandler = () => {
  emits('search', inputValue.value)
}
// 焦点
let isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits('focus')
}
// 点击外部
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
// 失去焦点
const onBlurHandler = () => {
  emits('blur')
}
// 监听输入
watch(inputValue, (val) => {
  emits('input', val)
})
</script>

<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}
.slider-enter-from,
.slider-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
