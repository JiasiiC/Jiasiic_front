<template>
  <div
    class="h-full xl:bg-zinc-200 dark:bg-zinc-800 overflow-auto xl:pt-1 duration-500 relative"
  >
    <div
      class="relative max-w-screen-lg mx-auto p-1 bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- 移动端nav -->
      <m-navbar v-if="isMobileTerminal">个人资料</m-navbar>
      <!-- pc端nav -->
      <div
        v-else
        class="w-full text-lg font-bold dark:text-zinc-300 mb-4 text-center"
      >
        个人资料
      </div>
      <div class="w-full h-full xl:w-2/3">
        <!-- 头像 -->
        <div class="xl:absolute right-[14%]">
          <h3 class="font-bold text-base mb-2 dark:text-zinc-300">我的头像</h3>
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer"
            @click="onAvatarClick"
          >
            <img :src="$store.getters.userInfo.avatar" class="rounded-full" />
            <div
              class="hidden xl:group-hover:block bg-zinc-900/40 absolute top-0 left-0 rounded-full w-full h-full"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-1 text-center"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            type="file"
            v-show="false"
            ref="inputFileTarget"
            accept=".png .jpeg .jpg .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 mb-2 text-xs text-zinc-600 dark:text-zinc-200 xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="xl:flex xl:items-center py-1 xl:my-1">
          <div class="text-base font-bold text-zinc-800 dark:text-zinc-200 w-8">
            用户名
          </div>
          <m-input
            max="20"
            class="w-full"
            type="text"
            v-model="userInfo.nickname"
          >
          </m-input>
        </div>
        <!-- 职位 -->
        <div class="xl:flex xl:items-center py-1 xl:my-1">
          <div class="text-base font-bold text-zinc-800 dark:text-zinc-200 w-8">
            职位
          </div>
          <m-input class="w-full" type="text" v-model="userInfo.title">
          </m-input>
        </div>
        <!--公司 -->
        <div class="xl:flex xl:items-center py-1 xl:my-1">
          <div class="text-base font-bold text-zinc-800 dark:text-zinc-200 w-8">
            公司
          </div>
          <m-input class="w-full" type="text" v-model="userInfo.company">
          </m-input>
        </div>
        <!-- 个人主页 -->
        <div class="xl:flex xl:items-center py-1 xl:my-1">
          <div class="text-base font-bold text-zinc-800 dark:text-zinc-200 w-8">
            个人主页
          </div>
          <m-input class="w-full" type="text" v-model="userInfo.homePage">
          </m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="xl:flex xl:items-center py-1 xl:my-1">
          <div class="text-base font-bold text-zinc-800 dark:text-zinc-200 w-8">
            个人介绍
          </div>
          <m-input
            max="50"
            class="w-full"
            type="textarea"
            v-model="userInfo.introduction"
          >
          </m-input>
        </div>
        <!-- 保存修改 -->
        <m-button
          type="main"
          class="w-full mx-auto mt-4 xl:ml-[50%] xl:translate-x-[-50%] xl:w-[160px] dark:bg-zinc-800 dark:text-zinc-300 mb-4"
          @click="onChangeProfile"
          @loading="loading"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          type="main"
          class="w-full mx-auto mt-4 xl:ml-[50%] xl:translate-x-[-50%] xl:w-[160px] dark:bg-zinc-800 dark:text-zinc-300 mb-4"
          @click="onLogout"
          >退出登录</m-button
        >
      </div>
    </div>
    <!-- pc端 -->
    <m-dialog v-model="dialogVisable" v-if="!isMobileTerminal">
      <changeAvatarVue
        :blob="currentBlob"
        @close="dialogVisable = false"
      ></changeAvatarVue>
    </m-dialog>
    <!-- 移动端 -->
    <m-popup v-model="dialogVisable" v-else :class="'h-screen'">
      <changeAvatarVue
        :blob="currentBlob"
        @close="dialogVisable = false"
      ></changeAvatarVue>
    </m-popup>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
const store = useStore()
import { ref, watch } from 'vue'
import { confirm } from '@/libs'
import { useRouter } from 'vue-router'
import { changeProfile } from '@/api/sys'
const loading = ref(false)
const router = useRouter()
import { message } from '@/libs'
import changeAvatarVue from './components/change-avatar.vue'
// 退出登录
const onLogout = () => {
  confirm('确定要退出登录吗').then(() => {
    store.dispatch('user/logout')
    store.commit('app/changeRouterType', 'back')
    router.back()
  })
}
const inputFileTarget = ref(null)
// 点击头像触发隐藏域里的点击事件
const onAvatarClick = () => {
  inputFileTarget.value.click()
}
/* 数据本地的双向同步 */
const userInfo = ref(store.getters.userInfo)
// 保存用户信息修改
const onChangeProfile = async () => {
  loading.value = true
  await changeProfile(userInfo.value)
  message('success', '用户信息修改成功')
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
// 选中的图片
const currentBlob = ref()
const dialogVisable = ref(false)
// 图片选中后
const onSelectImgHandler = () => {
  // 获取选中文件
  const imgFile = inputFileTarget.value.files[0]
  //   生成blob对象
  const blob = URL.createObjectURL(imgFile)
  currentBlob.value = blob
  dialogVisable.value = true
}
// 监听dialog关闭,当关闭时清楚change,防止change重复调用不触发
watch(dialogVisable, (val) => {
  if (!val) {
    inputFileTarget.value.value = null
  }
})
</script>
<style lang="scss" scoped></style>
