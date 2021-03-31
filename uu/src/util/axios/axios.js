import axios from 'axios'
import store from '../../store'

let http = axios.create({
  baseURL: '/api'
})


//axios的拦截器
//请求拦截
http.interceptors.request.use((req) => {
  if (store.getters.getUserInfo) {
    req.headers.authorization = store.getters.getUserInfo.token
  }
  return req
})


// 响应拦截
http.interceptors.response.use(res => {
  // console.log(res, '响应');
  return res
})






//导出封装好的http
export default http