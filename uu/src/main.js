// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//引入重置全局和rem.js
import './assets/css/reset.css'
import './assets/js/rem'
//引入fonts
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
// 引入axios 核心库
import axios from 'axios'
Vue.prototype.$http = axios

// 引入vant
import vantUI from 'vant'
import 'vant/lib/index.css'
Vue.use(vantUI)

// 创建图片服务器
Vue.prototype.$img = 'http://localhost:3000'

//引入你封装好的过滤器
import comFilter from './filter'
for (let i in comFilter) {
  Vue.filter(i, comFilter[i])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
