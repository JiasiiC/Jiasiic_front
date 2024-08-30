<template>
  <div>
    <transition name="fade">
      <!-- 蒙版 -->
      <div
        v-if="isVisbale"
        class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0 z-40"
        @click="close"
      ></div>
    </transition>
    <transition name="up">
      <div
        v-if="isVisbale"
        class="w-[80%] xl:w-[35%] bg-white dark:bg-zinc-800 rounded-sm cursor-pointer fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5"
      >
        <!-- 标题 -->
        <div class="text-lg text-zinc-900 font-bold dark:text-zinc-200 mr-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mr-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2 text-sm" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" class="text-sm" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
// 在方法调用的组件中，需要手动导入
import mButton from '../button/index.vue'
import { ref, onMounted } from 'vue'
// 控制开启关闭
const isVisbale = ref(false)
const show = () => {
  isVisbale.value = true
}
// 延迟时间
const duration = '0.5s'
const props = defineProps({
  //标题
  title: {
    type: String
  },
  // 描述
  content: {
    type: String,
    required: true
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: '确认'
  },
  // 取消按钮事件
  cancelHandler: {
    type: Function
  },
  // 确认按钮事件
  confirmHandler: {
    type: Function
  },
  close: {
    type: Function
  }
})
// 确认
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
// 取消
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

onMounted(() => {
  show()
})
// confirm关闭，保留动画延迟时长
const close = () => {
  isVisbale.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
}
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all v-bind(duration);
}
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active {
  transition: all v-bind(duration);
}
.up-leave-active {
  transition: all v-bind(duration);
}
.up-enter-from,
.up-leave-to {
  transform: translate3d(-50%, 150px, 0);
}
</style>
