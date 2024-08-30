<template>
  <!-- 特惠 -->
  <discountVue></discountVue>
  <!-- 支付宝支付 -->
  <div
    class="flex flex-col items-center w-full border border-zinc-300 mt-1 rounded mb-2"
  >
    <div class="flex pt-4 pb-2">
      <div class="text-base dark:text-zinc-200 flex items-end">支付金额</div>
      <div class="text-xl text-orange-600 pl-1 font-bold">
        <span class="text-base">￥</span>19
      </div>
    </div>
    <div
      class="py-1 px-2 border border-zinc-300 flex items-center cursor-pointer mb-3 hover:bg-zinc-200 rounded dark:hover:bg-zinc-700"
      @click="AliPayClick"
    >
      <img src="@/assets/images/alipay.png" class="w-4 h-4" />
      <div class="text-xl font-bold dark:text-zinc-200 pl-1 pr-3">支付宝</div>
    </div>
  </div>
</template>
<script setup>
import discountVue from '../discount.vue'
const props = defineProps({
  payData: {
    type: Object
  }
})
import { aliPay } from '@/utils/pay'
const AliPayClick = async () => {
  await aliPay(props.payData.title, props.payData.desc)
}
</script>
<style lang="scss" scoped></style>
