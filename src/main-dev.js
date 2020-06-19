import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 導入全局樣式
import './assets/css/index.css'

// 導入 ICONS 全局組件
import '@/icons'
// 導入 ELEMENT-UI
import './plugins/element.js'
// 導入 路由守衛
import './router/permission'

// 導入 v-permission指令
import vPermission from '@/directive/permission'
Vue.directive('permission', vPermission)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
