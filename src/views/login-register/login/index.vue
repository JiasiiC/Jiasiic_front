<template>
  <div
    class="w-full h-full bg-white xl:bg-zinc-300 overflow-auto dark:bg-zinc-800"
  >
    <m-navbar v-if="isMobileTerminal">登录</m-navbar>
    <div
      class="shadow-3xl mt-6 xl:mx-auto p-3 xl:w-[388px] xl:mt-12 bg-white dark:bg-zinc-800 xl:dark:bg-zinc-900 rounded"
    >
      <sliderCaptchaVue
        v-if="isSliderCaptchaVisable"
        @close="isSliderCaptchaVisable = false"
        @success="onCaptchaSuccess"
      ></sliderCaptchaVue>
      <div>
        <h3
          class="text-base flex items-center justify-center text-main dark:text-zinc-300 font-semibold"
        >
          账号登录
        </h3>
      </div>
      <!-- 表单 -->
      <VeeForm @submit="onLoginHandler">
        <VeeField
          type="text"
          placeholder="用户名"
          class="w-full text-base bg-transparent border-b-zinc-400 border-b-[1px] outline-0 p-1 focus:border-b-main dark:boder-b-zinc-200 xl:dark:bg-zinc-900 dark:text-zinc-400 dark:bg-zinc-800"
          autocomplete="on"
          name="username"
          :rules="validateUsername"
          v-model="userInfo.username"
        />
        <VeeErrorMessage
          class="text-sm text-red-600 mt-0.5 block text-left"
          name="username"
        ></VeeErrorMessage>
        <VeeField
          type="password"
          placeholder="密码"
          class="w-full text-base bg-transparent border-b-zinc-400 border-b-[1px] outline-0 p-1 focus:border-b-main dark:boder-b-zinc-200 xl:dark:bg-zinc-900 dark:text-zinc-400 dark:bg-zinc-800"
          autocomplete="on"
          name="password"
          :rules="validatePassword"
          v-model="userInfo.password"
        />
        <VeeErrorMessage
          class="text-sm text-red-600 mt-0.5 block text-left"
          name="password"
        ></VeeErrorMessage>
        <div class="text-right">
          <a
            class="inline-block p-1 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToRegister"
            >去注册</a
          >
        </div>
        <!-- 登录 -->
        <m-button
          type="main"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800 mt-3"
          :loading="loading"
          >登录</m-button
        >
      </VeeForm>

      <!-- 快捷登陆
      <div class="flex justify-around my-4">
        <div>1</div>
        <div>2</div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { validateUsername, validatePassword } from '../validate'
import sliderCaptchaVue from './slider-captcha.vue'
import { ref } from 'vue'
const isSliderCaptchaVisable = ref(false)
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible'
const loading = ref(false)
const router = useRouter()
const store = useStore()
const userInfo = ref({
  username: '',
  password: ''
})
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
// 登录回调
const onLoginHandler = () => {
  isSliderCaptchaVisable.value = true
}
// 通过验证
const onCaptchaSuccess = () => {
  isSliderCaptchaVisable.value = false
  onLogin()
}
// 登录行为
const onLogin = async () => {
  loading.value = true
  // 执行登录操作
  try {
    await store.dispatch('user/loginUser', {
      ...userInfo.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
// 跳转注册页面
const onToRegister = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/register')
}
</script>
<style lang="scss" scoped></style>
