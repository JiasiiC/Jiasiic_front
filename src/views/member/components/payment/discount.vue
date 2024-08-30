<template>
  <div
    class="flex bg-orange-200 justify-center items-center py-0.5 border-orange-400 border rounded"
  >
    <m-svg-icon
      name="countdown"
      class="w-1.5 h-1.5"
      fillClass="fill-red-600"
    ></m-svg-icon>
    <div class="text-sm text-red-600 font-bold pl-1">
      限时特惠 | 距离优惠结束仅剩
    </div>
    <m-count-down
      :time="1000 * 60 * 60"
      class="text-red-600 px-1 font-bold"
    ></m-count-down>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
