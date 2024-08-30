<template>
  <transition name="down">
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="style[type].containerClass"
    >
      <m-svg-icon
        :name="style[type].icon"
        :fillClass="style[type].fillClass"
        class="w-1.5 h-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="style[type].textClass">{{ content }}</span>
    </div>
  </transition>
  <div></div>
</template>
<script>
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'
const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script setup>
import { ref, onMounted } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'
const props = defineProps({
  // 消息类型
  type: {
    type: String,
    required: true,
    validator(val) {
      const res = typeEnum.includes(val)
      if (!res) {
        throw new Error(`你的type必须是${typeEnum.join('、')}中的一个`)
      }
      return res
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  // 展示时长
  duration: {
    type: String
  },
  //关闭时的回调
  destory: {
    type: Function
  }
})
// 样式表
const style = {
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  },
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  }
}
const isVisable = ref(false)
onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
    setTimeout(() => {
      if (props.destory) {
        props.destory()
      }
    }, parseInt(props.duration))
  }, parseInt(props.duration))
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
