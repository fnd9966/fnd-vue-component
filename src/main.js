import Vue from 'vue'
// 清除浏览器默认的样式
import 'normalize.css'
import VuePlugin from '../index'
import router from './router/router'
import App from './App.vue'
import axios from 'axios'
import Ztree from 'cll-vue-components/plugins/ztree'
import store from './store/store.js'

Vue.use(VuePlugin)// 或者传入参数对象 Vue.use(VuePlugin,{})
Vue.use(Ztree)
// axios是一个基于promise的HTTP库，
// baseurl 将自动加在URL前面，除非URL是一个绝对URL
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.118.226:50053' : ''
axios.defaults.baseURL = ''
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
