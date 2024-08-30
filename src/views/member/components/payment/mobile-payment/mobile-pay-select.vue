<template>
  <div class="h-[70vh] w-screen px-1">
    <div class="dark:text-zinc-200 text-xl font-bold py-1">选择支付方式</div>
    <div
      class="flex items-center px-1.5 pt-2 border-b pb-2 dark:border-zinc-600"
    >
      <img src="@/assets/images/alipay.png" class="w-4 h-4" />
      <div class="text-lg dark:text-zinc-200 pl-1 pr-3" @click="AliPayClick">
        支付宝
      </div>
    </div>
  </div>
</template>
<script setup>
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
