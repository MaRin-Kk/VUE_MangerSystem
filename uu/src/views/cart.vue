<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.name" left-text="返回" left-arrow @click-left='$router.go(-1)' />
    <van-swipe-cell v-for="item in cartList" :key="item.id">
      <template #left>
        <van-button square type="primary" text="选择" class="select-button" />
      </template>
      <van-card :num="item.num" :price="item.price | toPrice" :title="item.goodsname" class="goods-card"
        :thumb="$img+item.img">
        <template #footer>
          <van-stepper v-model="item.num" theme="round" button-size="22" disable-input />
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="delcart(item.id)" />
      </template>
    </van-swipe-cell>
    <!-- 
    <template slot-scope='item'> -->
    <van-submit-bar class="footer" :price="3050" button-text="提交订单">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <!-- // </template> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Dialog, Notify } from 'vant'
import { getCartList, delCart } from '../util/axios'
export default {
  data () {
    return {
      cartList: [],
      checked: false
    };
  },
  mounted () {
    getCartList({
      uid: this.getUserInfo.uid
    }).then(res => {
      if (res.data.code == 200) {
        console.log(res);
        this.cartList = res.data.list
      }
    })
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  beforeRouteEnter (to, from, next) {
    if (sessionStorage.getItem("userInfo")) {
      //如果登录了就跳转到购物车
      next();
    } else {
      Dialog.confirm({
        title: '未登录',
        message: '我大意了啊,没有闪',
      })
        .then(() => {
          next('/login')
        })
        .catch(() => {

        });
    }
  },
  methods: {
    delcart (id) {
      Dialog.confirm({
        title: '再次确认',
        message: '您确定要删除吗',
      })
        .then(() => {
          delCart({ id })
            .then(res => {
              getCartList()
              location.reload();
              Notify({ type: 'success', message: '通知内容' });
            })
        })
    }
  }
};
</script>

<style  lang="" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button,
.select-button {
  height: 100%;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0.53rem;
}
.van-nav-bar {
  background: #ff6040;
}
</style>
 