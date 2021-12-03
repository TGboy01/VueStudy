import Vue from "vue";
import VueRouter from "vue-router";
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/icons/iconfont/iconfont.css'
import './assets/css/antdCursor.css'

import helloWorld from "./components/HelloWorld";
import weChatRobotController from "./components/weChatRobotController";
import home from "./views/home";

Vue.use(antd)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home,
    children: [
      {
        path: '/weChatRobotController',
        component: weChatRobotController
      },
      {
        path: '/helloWorld',
        component: helloWorld
      }
    ]
  },
  {
    path: '/test',
    component: weChatRobotController
  }
]

const router = new VueRouter({
  routes
})

export default router
