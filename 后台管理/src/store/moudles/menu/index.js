// 引入接口
import { getMenuList } from '../../../util/axios'


const state = {
  menuList: []
}
const getters = {
  getMenuList (state) {
    return state.menuList
  }
}
const mutations = {
  REQ_MENULIST (state, payload) {
    state.menuList = payload
  }
}
const actions = {
  getMenuListAction ({ commit }) {

    getMenuList().then(res => {
      console.log(res);
      if (res.data.code == 200) {
        commit('REQ_MENULIST', res.data.list)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}