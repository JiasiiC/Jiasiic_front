import store from '../store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { watch } from 'vue'
// 监听系统主题变更
let matchMedia
const watchSystemThemeChange = () => {
  // 只需初始化一次
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
  // 监听主题变更
  matchMedia.onchange = function () {
    changeThemeType(THEME_SYSTEM)
  }
}
const changeThemeType = (theme) => {
  // html的类名
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}
export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      changeThemeType(val)
    },
    {
      immediate: true
    }
  )
}
