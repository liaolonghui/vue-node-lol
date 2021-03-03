import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import '@/assets/iconfont/iconfont.css'
import '@/assets/scss/style.scss'
import router from './router'

// vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// Card
import Card from './components/Card.vue'
Vue.component('m-card', Card)
// ListCard
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)


// Axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
