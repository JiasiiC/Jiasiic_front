<template>
  <div class="w-screen h-screen bg-zinc-200 dark:bg-zinc-800 overflow-auto">
    <m-navbar v-if="isMobileTerminal">精选会员</m-navbar>
    <div
      class="px-2 xl:w-[55%] overflow-auto bg-white duration-400 shadow rounded dark:bg-zinc-900 w-full mx-auto xl:mt-1"
    >
      <h1 class="text-xl font-bold pt-2 text-yellow-600 text-center">
        精选VIP
      </h1>
      <h2 class="text-lg pt-1 text-yellow-500 text-center">
        升级精选VIP,畅享所有内容
      </h2>
      <!-- vip数据 -->
      <div
        class="flex overflow-auto pb-2 shrink-0 px-2 cursor-pointer scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
      >
        <payMenuItem
          v-for="item in payDatas"
          :key="item.id"
          :data="item"
          :isHot="item.isHot"
          @click="onChangeCurrentPayData"
          :selected="item.id === currentPayData.id"
        ></payMenuItem>
      </div>
      <div class="text-sm text-zinc-500 py-1 px-1">
        {{ currentPayData.desc }}
      </div>
      <!-- 支付 -->
      <paymentVue class="mt-4" :payData="currentPayData"></paymentVue>
      <!-- 支付宝支付 -->
    </div>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { getVipPayList } from '@/api/sys'
import { ref } from 'vue'
import payMenuItem from './components/pay-menu-item.vue'
import paymentVue from './components/payment/index.vue'
// vip支付数据
const payDatas = ref([])
// 当前选中
const currentPayData = ref({})
const getPayDatas = async () => {
  const res = await getVipPayList()
  payDatas.value = res
}
getPayDatas()
const onChangeCurrentPayData = (item) => {
  currentPayData.value = item
}
</script>
<style lang="scss" scoped></style>
