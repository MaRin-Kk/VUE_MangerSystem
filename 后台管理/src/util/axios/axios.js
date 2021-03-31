import axios from 'axios'

let http = axios.create({
  baseURL: '/api'
})


//axios的拦截器
//请求拦截
http.interceptors.request.use((req) => {
  let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
  //一般在请求拦截器中我们会操作请求头，比如添加token
  //设置token请求头
  req.headers.authorization = token
  return req
})


// 响应拦截
http.interceptors.response.use(res => {
  //一般会全局拦截错误，或者针对于返回值进行封装
  // 针对于返回值进行封装改变 return res.data
  //针对于token过期或者失效 ，进行全局拦截
  if (res.data.code == 403) {
    //全局拦截错误 重新登录
    router.push('/login')
  }
  return res
})






//导出封装好的http
export default http