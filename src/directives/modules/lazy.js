import { useIntersectionObserver } from '@vueuse/core'
export default {
  mounted(el) {
    // 拿到当前img的src
    const imgSrc = el.src
    // src 变为空
    el.src = ''
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 可见时加载图片
        el.src = imgSrc
        stop()
      }
      // 停止监听
    })
  }
}
