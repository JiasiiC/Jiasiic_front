import messageComponent from './index.vue'
import { h, render } from 'vue'
/**
 *
 * @param {*} type 类型：success,warn,error
 * @param {*} content 描述文本
 * @param {*} duration 展示时间 默认3000
 */
export const message = (type, content, duration = '3000') => {
  const onDestory = () => {
    // 删除render
    render(null, document.body)
  }
  // 生成vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destory: onDestory
  })
  // render渲染vnode
  render(vnode, document.body)
}
