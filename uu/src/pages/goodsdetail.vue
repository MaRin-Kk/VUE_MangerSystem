<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.name" left-text="返回" left-arrow @click-left='$router.go(-1)' />
    <img :src="$img+goodinfo.img" alt="">

    <!-- 购买数量 -->
    <div class="ppp">
      <p>商品的名称:{{ goodinfo.goodsname }}</p>

      <p>商品的价格:￥{{ goodinfo.price }}</p>
      <p> <i>购买数量</i>
        <van-stepper v-model="value" min="1" max="5" />
      </p>
    </div>
    <p>
      商品属性：
      <van-button class="attr" v-for="item in goodinfo.specsattr" :key="item" type="warning">{{ item }}</van-button>
    </p>
    <!-- 商品详情： -->
    <!-- <div v-html="goodinfo.description"></div> -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="goCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="goBuy" />
    </van-goods-action>
  </div>

</template>

<script>
import { getGoodsInfo, addCart } from '../util/axios'
import { Dialog } from "vant";

export default {
  data () {
    return {
      goodinfo: [],
      value: 1
    };
  },
  components: {

  },
  methods: {
    goCart () {
      if (this.$store.getters.getUserInfo) {
        addCart({
          uid: this.$store.getters.getUserInfo.uid,
          goodsid: this.goodinfo.id,
          num: this.value
        }).then(res => {
          if (res.data.code == 200) {
            //跳转到购物车列表
            this.$router.push('/cart')
          }
        })
      } else {
        Dialog.confirm({
          title: "未登录，不能加入购物车",
          message: "请您登录"
        }).then(() => {
          this.$router.push('/login')
        })
      }
    },
    goBuy () {

    }
  },
  mounted () {
    getGoodsInfo({ id: this.$route.query.id })
      .then(res => {
        // console.log(res);
        this.goodinfo = res.data.list[0]
        this.goodinfo.specsattr = this.goodinfo.specsattr.split(",")
      })
  }
};
</script>

<style lang="" scoped>
.van-nav-bar {
  background: #ff6040;
  color: white;
}
.ppp {
  margin-top: 10px;
}
p {
  margin-top: 10px;
  padding: 10px 20px;
  line-height: 50px;
  height: 50px;
  font-size: 16px;
  border: orangered solid 1px;
}
.van-stepper {
  display: inline-block;
  margin-left: 140px;
}
img {
  width: 100%;
  height: 2rem;
}
.attr {
  height: 40px;
}
</style>
