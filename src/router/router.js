import Vue from 'vue'
import Router from 'vue-router'
// import Message from '@/views/exercise/index'
import ElFade from '@/views/element/fade'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ElFade
    }
  ]
})
