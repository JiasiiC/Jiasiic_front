<template>
  <div class="w-full">
    <m-search
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hintVue
            :searchText="inputValue"
            v-show="inputValue"
            @itemClick="onSearchHandler"
          ></hintVue>
          <!-- 搜索记录 -->
          <historyVue
            v-show="!inputValue"
            @itemClick="onSearchHandler"
          ></historyVue>
          <themeVue v-show="!inputValue"></themeVue>
        </div>
      </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'
const store = useStore()
const inputValue = ref('')
const isShow = ref(false)
const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    store.commit('history/addHistory', val)
    store.commit('app/changeSearchText', val)
  }
}
</script>
<style lang="scss" scoped></style>
