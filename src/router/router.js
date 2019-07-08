import Vue from 'vue'
import Router from 'vue-router'
import Message from '@/views/message/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Message
    }
  ]
})
