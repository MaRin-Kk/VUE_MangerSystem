// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局 reset
import './assets/css/reset.css'
import './assets/css/index.css'
// 引入全局iconfont
import './assets/fonts/iconfont.css'
// 引入全局组件
import elBread from './common'
for (let i in elBread) {
  Vue.component(i, elBread[i])
}
// 引入仓库
import store from './store'
Vue.use(ElementUI)
Vue.config.productionTip = false


import jquery from 'jquery'

Vue.prototype.$ = jquery


//创建一个全局服务器变量
Vue.prototype.$imgUrl = 'http://localhost:3000'



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
