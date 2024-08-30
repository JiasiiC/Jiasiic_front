<template>
  <div
    class="flex flex-col justify-center items-center mx-0.5 w-5"
    @click="toPage"
  >
    <m-svg-icon
      class="w-2 h-2"
      :fillClass="iconClass"
      :name="icon"
    ></m-svg-icon>
    <p :class="textClass" class="mt-0.5 text-sm">
      <slot></slot>
    </p>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  iconClass: {
    type: String
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  },
  to: {
    type: String
  }
})
const toPage = () => {
  if (!props.to) {
    return
  }
  router.push(to)
}
</script>
<style lang="scss" scoped></style>
