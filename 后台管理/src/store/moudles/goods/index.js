//引入封装好的接口
import { getGoodsList, getGoodsCount } from '../../../util/axios'
const state = {
  goodsList: [],
  size: 6,//页面显示的条数
  page: 1, //页码初始值
  count: 0  //总数
}
const getters = {
  //返回管理员列表
  getGoodsList (state) {
    return state.goodsList
  },
  //返回总数
  getCount (state) {
    return state.count
  },
  //返回当前显示条数
  getSize (state) {
    return state.size
  }
}
const mutations = {
  REQ_GOODSLIST (state, payload) {
    state.goodsList = payload
  },
  REQ_GETCOUNT (state, payload) {
    state.count = payload
  },
  //修改页码
  CHANGE_PAGE (state, payload) {
    state.page = payload
  }
}
const actions = {
  //封装一个获取规格列表的行动
  getGoodsListAction (context) {
    getGoodsList({
      size: context.state.size,
      page: context.state.page
    })
      .then(res => {
        if (res.data.code == 200) {
          context.commit('REQ_GOODSLIST', res.data.list)
          let list = res.data.list ? res.data.list : []
          if (context.state.page != 1 && list.length == 0) {
            context.dispatch('changePageAction', context.state.page - 1)
          }
        }
      })
  },
  //封装一个获取总数的行动
  getCountAction ({ commit }) {
    getGoodsCount()
      .then(res => {
        if (res.data.code == 200) {
          commit('REQ_GETCOUNT', res.data.list[0].total)
        }
      })
  },
  //封装一个切换页码的行动
  changePageAction (context, payload) {
    //第一、当用户切换页码，我们要修改page
    context.commit('CHANGE_PAGE', payload)
    //第二、重新调用列表
    context.dispatch('getGoodsListAction')
  }
}


export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}