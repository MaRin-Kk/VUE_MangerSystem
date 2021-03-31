<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="title" :title="$route.name" left-arrow />
    <div class="bg">
      <!-- 已登录状态 -->
      <div v-if="getUserInfo" class="userInfo">
        <img src="../assets/img/cat.png" alt="">
        <!-- <van-image round width="1rem" height="1rem" src="../assets/img/cat.png" /> -->
        <van-cell class="name" id="cellTitle" :value="getUserInfo.nickname" />
        <van-button @click="logout" type="danger">退出登录</van-button>
      </div>
      <!-- 未登录 让它去登录 -->
      <div v-else class="userInfo">
        <van-image round width="1rem" height="1rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <van-button class="meidenglu" @click="$router.push('/login')" type="info">未登录，请登录</van-button>
      </div>
    </div>
    <!-- 展示性列表 -->
    <van-cell title="地址管理" icon="location-o" />
    <van-cell title="我的钱包" icon="balance-o" />
    <van-cell title="我的小伙伴" icon="contact" />
    <van-cell title="我的二维码" icon="smile-o" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data () {
    return {};
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  mounted () {
  },
  methods: {
    ...mapActions(["changeUserAction"]),
    //退出事件
    logout () {
      //触发行动
      this.changeUserAction(false);
      //跳转到首页页
      this.$router.push("/home");
    }
  }
};


</script>

<style lang="" scoped>
.userInfo {
  text-align: center;
}
.userInfo >>> .van-cell__value--alone {
  text-align: center;
}
img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-bottom: 10px;
}
.van-nav-bar {
  background-color: #0f1423;
}
.title >>> .van-nav-bar__title {
  color: white;
}
.bg,
.name {
  background: linear-gradient(to bottom, #232526, #414345);
}
.van-cell__value--alone {
  color: white;
}
.bg {
  padding: 20px;
  margin-bottom: 30px;
}
.van-button {
  width: 100px;
  margin-top: 15px;
  border-radius: 40px;
}
.meidenglu {
  margin-top: 100px;
  display: block;
  margin: 0 auto;
}
</style>
