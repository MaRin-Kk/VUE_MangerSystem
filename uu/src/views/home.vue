<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.name" left-arrow />
    <v-nav></v-nav>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="1500" indicator-color="red" loop>
      <van-swipe-item v-for="item in bannerlist" :key="item.id">
        <img class="imgUrl" :src="$img + item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <van-grid :border="true" :column-num="msg.length" center>
      <van-grid-item v-for="item in msg" :key="item.name" class="gr_nav">
        <van-image :src="item.imgUrl" />
        <p>{{ item.name }}</p>
      </van-grid-item>
    </van-grid>

    <!-- 标签栏 -->
    <van-tabs v-model="active" type="card">
      <van-tab title="热卖宝贝">
        <van-card v-for="item in hotlist" :key="item.id" num="1" :price="item.price" :desc="item.goodsname"
          :title="item.goodname" :thumb="$img+item.img" />
      </van-tab>
      <van-tab title="上新宝贝">
        <van-card v-for="item in newlist" :key="item.id" num="1" :price="item.price" :desc="item.goodsname"
          :title="item.goodname" :thumb="$img+item.img" />
      </van-tab>
      <van-tab title="全部宝贝">
        <van-card v-for="item in goodlist" :key="item.id" num="1" :price="item.price" :desc="item.goodsname"
          :title="item.goodname" :thumb="$img+item.img" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import { getbanner, getIndexGoods, kill } from '../util/axios'
import vNav from '../components/nav'
export default {
  data () {
    return {
      bannerlist: [],
      active: 0,
      hotlist: [],
      newlist: [],
      goodlist: [],
      msg: [
        {
          name: "限时秒杀",
          imgUrl: require("../assets/img/brand.png"),
        },
        {
          name: "畅销商品",
          imgUrl: require("../assets/img/top.png"),
        },
        {
          name: "品质大牌",
          imgUrl: require("../assets/img/seckill.png"),
        },
        {
          name: "小U自营",
          imgUrl: require("../assets/img/brand.png"),
        },
        {
          name: "积分商城",
          imgUrl: require("../assets/img/brand.png"),
        },
      ],
    }
  },
  components: {
    vNav
  },
  methods: {

  },
  mounted () {
    kill().then(res => {
      console.log(res);
    }),
      axios.all([getbanner(), getIndexGoods()])
        .then(axios.spread((resbanner, resindexgoods) => {
          if (resbanner.data.code == 200) {
            this.bannerlist = resbanner.data.list
          }
          if (resindexgoods.data.code == 200) {
            this.hotlist = resindexgoods.data.list[0].content
            this.newlist = resindexgoods.data.list[1].content
            this.goodlist = resindexgoods.data.list[2].content
          }
        }))
  }

};
</script>

<style lang="" scoped>
.imgUrl {
  width: 100%;
  height: 200px;
}
.ggtitle {
  font-size: 0.14rem;
}
.van-nav-bar {
  background: #ff6040;
  border-bottom: #ff6040 solid 1px;
}
.van-nav-bar__title {
  color: rgb(255, 255, 255) !important;
}
.gr_nav {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #282a35;
}
.gr_nav p {
  margin-top: 5px;
}
</style>
