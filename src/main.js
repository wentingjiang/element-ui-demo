/*
 * @Author: jwt 1974890451@qq.com
 * @Date: 2022-05-15 02:49:55
 * @LastEditors: jwt 1974890451@qq.com
 * @LastEditTime: 2022-05-15 03:08:07
 * @FilePath: \test\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
