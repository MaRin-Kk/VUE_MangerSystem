import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)
// 引入封装好的模块
import menu from './moudles/menu'
import role from './moudles/roler'
import user from "./moudles/manger"
import goodscate from "./moudles/goodscate"
import specs from './moudles/specs'
import goods from './moudles/goods'
import banner from './moudles/banner'
import member from './moudles/member'
import seck from './moudles/seck'



export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    CHANGE_USERINFO (state, payload) {
      if (payload) {
        state.userInfo = payload
        sessionStorage.setItem('user', JSON.stringify(payload))
      }
      else {
        sessionStorage.removeItem('user')
      }

    }
  },
  actions: {
    changeUserInfoAction ({ commit }, payload) {
      commit('CHANGE_USERINFO', payload)

    }
  },
  modules: {
    menu,
    role,
    user,
    goodscate,
    specs,
    goods,
    banner,
    member,
    seck
  }
})