// 引入接口
import { getUserList, getUserCount } from '../../../util/axios'


const state = {
  userList: [],
  size: 6,
  page: 1,
  count: 0
}
const getters = {
  getUserList (state) {
    return state.userList
  },
  // 返回总数
  getCount (state) {
    return state.count
  },
  // 返回当前显示条数
  getSize (state) {
    return state.size
  }
}


const mutations = {
  REQ_USERLIST (state, payload) {
    state.userList = payload
  },
  REQ_COUNT (state, payload) {
    state.count = payload
  },
  CHANGE_PAGE (state, payload) {
    state.page = payload
  }
}



const actions = {
  // 封装获取菜单列表的行动
  getUserListAction (context) {
    getUserList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
      if (res.data.code == 200) {
        context.commit('REQ_USERLIST', res.data.list)
        let list = res.data.list ? res.data.list : []
        if (context.state.page != 1 && list.length == 0) {
          context.dispatch('changePageAction', context.state.page - 1)
        }
      }
    })
  },

  getUserCountAction ({ commit }) {
    getUserCount().then(res => {
      if (res.data.code == 200) {
        commit('REQ_COUNT', res.data.list[0].total)
      }
    })
  },
  //封装切换页码的行动
  changePageAction (context, payload) {
    context.commit('CHANGE_PAGE', payload)
    context.dispatch('getUserListAction')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}