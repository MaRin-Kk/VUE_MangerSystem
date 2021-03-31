<template>
  <div>
    <van-nav-bar :title="$route.name" left-text="返回" left-arrow @click-left='$router.go(-1)' />
    <van-card @click="godetail(item.id)" v-for="item in goodlist " :key="item.id" num="2" :price="item.price"
      desc="描述信息" title="商品标题" :thumb="$img+item.img" />
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to='/home' icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/sort' icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to='/cart' icon="logistics">购物车</van-tabbar-item>
      <van-tabbar-item to='/mine' icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getGoods } from '../util/axios'
export default {
  data () {
    return {
      goodlist: []
    };
  },
  components: {

  },
  methods: {
    godetail (id) {
      this.$router.push({
        path: '/goodsdetail',
        query: {
          id
        }
      })
    }
  },
  mounted () {
    getGoods({ fid: this.$route.query.id })
      .then(res => {
        this.goodlist = res.data.list
      })
  }


};
</script>

<style lang="" scoped>
.van-nav-bar {
  background: #ff6040;
  color: white !important;
}
</style>
