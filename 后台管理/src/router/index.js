import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

function hasUrl (url) {
  // console.log(store.getters.getUserInfo.menus_url);
  return store.getters.getUserInfo.menus_url.some(item => item == url)
}

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home')
        },
        {
          path: '/menu',
          component: () => import('@/views/menu/menu'),
          name: '菜单管理',
          beforeEnter (to, from, next) {
            hasUrl('/menu') ? next() : next('/home')
          }
        },
        {
          path: '/dialog',
          component: () => import('@/views/menu/dialog'),

        },
        {
          path: '/roler',
          component: () => import('@/views/roler/roler'),
          name: '角色管理'
        },
        {
          path: '/manger',
          component: () => import('@/views/manger/manger'),
          name: '管理员管理'
        },
        {
          path: '/goodscate',
          component: () => import('@/views/goodscate/goodscate'),
          name: '商品分类'
        },
        {
          path: '/goodsspecs',
          component: () => import('@/views/goodsspecs/goodsspecs'),
          name: '商品规格'
        },
        {
          path: '/goods',
          component: () => import('@/views/goods/goods'),
          name: '商品管理'
        },
        {
          path: '/list',
          component: () => import('@/views/menu/list'),
          name: '列表'
        },
        {
          path: '/banner',
          component: () => import('@/views/banner/banner'),
          name: '轮播图管理'
        },
        {
          path: '/member',
          component: () => import('@/views/member/member'),
          name: '会员管理'
        },
        {
          path: '/seck',
          component: () => import('@/views/seck/seck'),
          name: '秒杀管理'
        },
        {
          path: '',
          component: () => import('@/views/home')
        }
      ]


    },
    {
      path: '*',
      redirect: '/login'
    }

  ]
})


// 全局导航守卫之登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }
  let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
  if (userInfo) {
    next()
    return
  }
  next('/login')
})

export default router
