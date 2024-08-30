<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition
      :name="transitionName"
      @before-enter="befoerEnter"
      @after-leave="afterLeave"
    >
      <!-- 缓存组件 -->
      <keep-alive :includes="virtualTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed top-0 left-0 w-screen': isAnimation }"
          :key="$route.fullPath"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script>
// 无需监听路由的各种状态(PC)
const NONE = 'none'
// 路由进入 push
const PUSH = 'push'
// 路由退出
const BACK = 'back'
// 路由跳转的enum
const ROUTER_TYPE_ENUM = [NONE, PUSH, BACK]
</script>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  // 路由跳转的类型
  routerType: {
    default: NONE,
    validator(val) {
      const res = ROUTER_TYPE_ENUM.includes(val)
      if (!res) {
        throw new Error(
          `你的routerType必须是${ROUTER_TYPE_ENUM.join('、')}中的一个`
        )
      }
      return true
    }
  },
  // 首页的组件名称
  mainComponentName: {
    type: String,
    required: true
  }
})
// 动画名称
const transitionName = ref()
// 监听路由变化
// 任务栈
const virtualTaskStack = ref([props.mainComponentName])
router.beforeEach((to, from) => {
  transitionName.value = props.routerType
  // 入栈
  if (props.routerType === PUSH) {
    virtualTaskStack.value.push(to.name)
  }
  // 出栈
  else if (props.routerType === BACK) {
    virtualTaskStack.value.pop()
  }
  //   进入首页  清空栈
  if (to.name === props.mainComponentName) {
    clearTask()
  }
})
// 组件动画
const isAnimation = ref(false)
const befoerEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value
}
// 清空栈
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}
</script>
<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
