import http from './axios'

// 封装轮播图接口

export function getbanner () {
  return http.get('/api/getbanner')
}
// 商品展示展示
export function getIndexGoods () {
  return http.get('/api/getindexgoods')
}

// 商品侧边栏
export function getCateTree () {
  return http.get('/api/getcatetree')
}

// 商品列表
export function getGoods (params) {
  return http.get('/api/getgoods', {
    params
  })
}

// 商品详情
export function getGoodsInfo (params) {
  return http.get('/api/getgoodsinfo', {
    params
  })
}

//封装一个注册接口
export function register (data) {
  return http.post('/api/register', data)
}

//封装一个登录接口
export function login (data) {
  return http.post('/api/login', data)
}

//封装一个购物车列表
export function getCartList (params) {
  return http.get('/api/cartlist', {
    params
  })
}
//封装一个购物车添加
export function addCart (data) {
  return http.post('/api/cartadd', data)
}
//封装一个购物车删除
export function delCart (data) {
  return http.post('/api/cartdelete', data)
}
//封装一个秒杀
export function kill (data) {
  return http.get('/api/getindexgoods', data)
}


