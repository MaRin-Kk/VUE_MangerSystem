<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>

    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to='/home' icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/sort' icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to='/cart' icon="logistics">购物车</van-tabbar-item>
      <van-tabbar-item to='/mine' icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  components: {

  },
  methods: {

  }
};
</script>

<style lang="" scoped>
</style>
