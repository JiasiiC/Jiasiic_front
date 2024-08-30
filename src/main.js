import { createApp } from 'vue'
import App from './App.vue'
import '../src/styles/index.scss'
import router from './router'
import { useREM } from './utils/flexible'
import store from './store'
import mLibs from './libs'
import theme from './utils/theme'
import mDirectives from './directives'
import './permission.js'
theme()
import 'virtual:svg-icons-register'
useREM()
createApp(App).use(router).use(mLibs).use(store).use(mDirectives).mount('#app')
