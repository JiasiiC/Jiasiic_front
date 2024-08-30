<template>
  <!-- pc端支付 -->
  <pcPaymentVue v-if="!isMobileTerminal" :payData="payData"></pcPaymentVue>
  <!-- 移动端支付 -->
  <mobilePaymentVue v-else :payData="payData"></mobilePaymentVue>
</template>
<script setup>
import pcPaymentVue from './pc-payment/index.vue'
import mobilePaymentVue from './mobile-payment/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
const props = defineProps({
  payData: {
    type: Object
  }
})
console.log(props.payData)
</script>
<style lang="scss" scoped></style>
