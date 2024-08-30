import { computed, ref } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

// 判断是否是移动端
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

// 通过宽度设置rem基准值
export const useREM = () => {
  // 最大fontsize
  const MAX_FONT_SIZE = 40
  // html文档被解析后调用
  document.addEventListener('DOMContentLoaded', () => {
    // 获取html
    const html = document.querySelector('html')
    // 获取fontsize   不超过MAX
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
