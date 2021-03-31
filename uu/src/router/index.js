import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home'),
          name: '首页'
        },
        {
          path: '/sort',
          component: () => import('@/views/sort'),
          name: '分类'
        },
        {
          path: '/cart',
          component: () => import('@/views/cart'),
          name: '购物车'
        },
        {
          path: '/mine',
          component: () => import('@/views/mine'),
          name: '个人中心'
        },
        {
          path: '',
          redirect: '/home'
        }
      ],
    },
    {
      path: '/goodslist',
      component: () => import('@/pages/goodslist'),
      name: '商品列表'
    },
    {
      path: '/goodsdetail',
      component: () => import('@/pages/goodsdetail'),
      name: '商品详情'
    },
    {
      path: '/register',
      component: () => import('@/pages/register'),
      name: '注册'
    },
    {
      path: '/login',
      component: () => import('@/pages/login'),
      name: '登录'
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
