<template>
  <div
    class="w-full h-full bg-white xl:bg-zinc-300 overflow-auto dark:bg-zinc-800"
  >
    <div
      class="shadow-3xl mt-6 xl:mx-auto p-3 xl:w-[388px] xl:mt-12 bg-white dark:bg-zinc-800 xl:dark:bg-zinc-900 rounded"
    >
      <div>
        <h3
          class="text-base flex items-center justify-center text-main dark:text-zinc-300 font-semibold"
        >
          账号注册
        </h3>
      </div>
      <!-- 表单 -->
      <VeeForm @submit="onRegister">
        <VeeField
          type="text"
          placeholder="用户名"
          class="w-full text-base bg-transparent border-b-zinc-400 border-b-[1px] outline-0 p-1 focus:border-b-main dark:boder-b-zinc-200 xl:dark:bg-zinc-900 dark:text-zinc-400 dark:bg-zinc-800"
          autocomplete="on"
          name="username"
          :rules="validateUsername"
          v-model="regInfo.username"
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
          v-model="regInfo.password"
        />
        <VeeErrorMessage
          class="text-sm text-red-600 mt-0.5 block text-left"
          name="password"
        ></VeeErrorMessage>
        <!-- 确认密码 -->
        <VeeField
          type="password"
          placeholder="确认密码"
          class="w-full text-base bg-transparent border-b-zinc-400 border-b-[1px] outline-0 p-1 focus:border-b-main dark:boder-b-zinc-200 xl:dark:bg-zinc-900 dark:text-zinc-400 dark:bg-zinc-800"
          autocomplete="on"
          name="confirmPassword"
          rules="validateConfirmPassword:@password"
          v-model="regInfo.confirmPassword"
        />
        <VeeErrorMessage
          class="text-sm text-red-600 mt-0.5 block text-left"
          name="confirmPassword"
        ></VeeErrorMessage>
        <div class="text-right">
          <a
            class="inline-block text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToLogin"
            >去登录</a
          >
        </div>
        <!-- 注册 -->
        <m-button
          type="main"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800 mt-3"
          :loading="loading"
          >注册</m-button
        >
      </VeeForm>
    </div>
  </div>
</template>
<script setup>
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate'
import { ref } from 'vue'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const loading = ref(false)
const router = useRouter()
const store = useStore()
const regInfo = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'

// 登录行为
const onRegister = async () => {
  loading.value = true
  // 执行登录操作
  try {
    const payload = {
      username: regInfo.value.username,
      password: regInfo.value.password
    }
    //注册
    await store.dispatch('user/registerUser', {
      ...payload
    })
    // 登录
    await store.dispatch('user/loginUser', {
      ...payload,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }

  router.push('/')
}
// 跳转登录页面
const onToLogin = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
// 插入重复密码校验规则
defineRule('validateConfirmPassword', validateConfirmPassword)
</script>
<style lang="scss" scoped></style>
