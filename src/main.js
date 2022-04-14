// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from'./store/index'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

Vue.prototype.$http = axios
// axios.interceptors.request.use(config=>{
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
