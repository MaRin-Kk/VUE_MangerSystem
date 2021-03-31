import { getRoleList } from '../../../util/axios'

const state = {
  rolelist: []
}

const getters = {
  getRoleList (state) {
    return state.rolelist
  }
}

const mutations = {
  REQ_ROLELIST (state, payload) {
    state.rolelist = payload
  }
}

const actions = {
  getRoleListAction ({ commit }) {
    getRoleList()
      .then(res => {
        if (res.data.code == 200) {
          commit('REQ_ROLELIST', res.data.list)
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