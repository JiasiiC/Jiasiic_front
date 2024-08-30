<template>
  <div class="absolute bottom-0 left-0 bg-white dark:bg-zinc-800">
    <discountVue class="w-screen rounded-none"></discountVue>
    <div class="flex justify-between items-center py-1">
      <div class="px-1">
        <div class="text-lg text-red-600">
          <span class="text-xs text-zinc-900 dark:text-zinc-200">券后合计:</span
          >￥9
        </div>
        <p class="text-xs text-red-600">优惠券:限时立减￥10</p>
      </div>
      <m-button
        type="main"
        class="px-2 mr-1 w-[130px] dark:bg-zinc-900 dark:text-zinc-200"
        @click="onItemClick"
        >立即开通</m-button
      >
    </div>
    <!-- popup -->
    <m-popup v-model="isOpenPopup">
      <mobilePaySelectVue :payData="payData"></mobilePaySelectVue
    ></m-popup>
  </div>
</template>
<script setup>
import discountVue from '../discount.vue'
import mobilePaySelectVue from './mobile-pay-select.vue'
import { ref } from 'vue'
const isOpenPopup = ref(false)
const onItemClick = () => {
  isOpenPopup.value = !isOpenPopup.value
}
const props = defineProps({
  payData: {
    type: Object
  }
})
</script>
<style lang="scss" scoped></style>
