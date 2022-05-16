/*
 * @Author: jwt 1974890451@qq.com
 * @Date: 2022-05-15 02:49:55
 * @LastEditors: jwt 1974890451@qq.com
 * @LastEditTime: 2022-05-16 18:46:00
 * @FilePath: \test\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Wechat from '../views/wechat.vue'
import WechatMiao from '../views/wechat-miao.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Wechat',
    name: 'Wechat',
    component: Wechat
  },
  {
    path: '/WechatMiao',
    name: 'WechatMiao',
    component: WechatMiao
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
