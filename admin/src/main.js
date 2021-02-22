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

// 使用混入，此处用于给<el-upload>提供headers（Authorization）
// 混入的是一个方法，这样可以取到实时的Authorization
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
  computed: {
    uploadUrl() {
      return http.defaults.baseURL + 'upload'
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
