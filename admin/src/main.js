import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

// 全局样式
import './style.css'

Vue.config.productionTip = false

// axios
import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
