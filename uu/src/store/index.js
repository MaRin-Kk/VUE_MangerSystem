import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null

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
        //把数据存储到会话存储中
        sessionStorage.setItem('userInfo', JSON.stringify(payload))
      } else {
        sessionStorage.removeItem('userInfo')
        state.userInfo = null
      }

    }
  },
  actions: {
    //修改用户信息行动
    changeUserAction ({ commit }, payload) {
      commit('CHANGE_USERINFO', payload)
    }
  },
})