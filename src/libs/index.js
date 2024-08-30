import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm'
export { message } from './message'
export default {
  install(app) {
    // 获取当前任意文件下的index.vue文件，返回一个对象
    const components = import.meta.glob('./*/index.vue')
    // Object.entries把一个对象转换为数组,解构出key val,key是路径，val是动态引入
    for (let [key, val] of Object.entries(components)) {
      // 把组件名拼接为m-形式
      let componentName = 'm-' + key.replace('./', '').split('/')[0]
      // 通过defineAsyncComponent创建一个异步加载的组件
      app.component(componentName, defineAsyncComponent(val))
    }
  }
}
